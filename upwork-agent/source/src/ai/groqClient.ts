import { fetchWithRequestLog } from "../logs/fetchWithLog";
import { toArray, toRecord } from "../shared/utils";
import type { AiFilterSettings, JobRankingInput, JobRankingResult } from "./jobRankingTypes";
import { parseRankingJsonObject, parseRankingResults } from "./rankingResultParser";

const GROQ_CHAT_COMPLETIONS_URL = "https://api.groq.com/openai/v1/chat/completions";
const DEFAULT_GROQ_MODEL = "llama-3.1-8b-instant";
const MAX_GROQ_DESCRIPTION_CHARS = 1200;

export class GroqRankingError extends Error {
  constructor(
    message: string,
    readonly status?: number
  ) {
    super(message);
    this.name = "GroqRankingError";
  }
}

export async function rankJobsWithGroq(
  settings: AiFilterSettings,
  input: JobRankingInput
): Promise<JobRankingResult[]> {
  const apiKey = settings.groqApiKey.trim();
  if (!apiKey) {
    throw new GroqRankingError("Groq API key is empty.");
  }

  let response: Response;
  try {
    response = await fetchWithRequestLog(GROQ_CHAT_COMPLETIONS_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: settings.model.trim() || DEFAULT_GROQ_MODEL,
        temperature: 0.2,
        max_tokens: 1800,
        response_format: { type: "json_object" },
        messages: [
          {
            role: "system",
            content:
              "You rank Upwork jobs for fit and lead quality. Return only a valid JSON object that matches the requested schema."
          },
          {
            role: "user",
            content: buildGroqRankingPrompt(input)
          }
        ]
      })
    });
  } catch {
    throw new GroqRankingError("Groq ranking request failed.");
  }

  const json = await readJsonResponse(response);

  if (!response.ok) {
    const message = getGroqErrorMessage(json) ?? `Groq ranking failed: HTTP ${response.status}`;
    throw new GroqRankingError(message, response.status);
  }

  const content = getFirstMessageContent(json);
  if (!content) {
    throw new GroqRankingError("Groq ranking response did not include message content.", response.status);
  }

  return parseRankingResults(parseRankingJsonObject(content));
}

function buildGroqRankingPrompt(input: JobRankingInput) {
  return [
    "Rank these Upwork jobs for the user's niche/profile.",
    "",
    "Profile:",
    input.profilePrompt,
    "",
    "Ranking instructions:",
    input.rankingPrompt,
    "",
    "Return JSON only in this exact shape:",
    `{
  "results": [
    {
      "jobId": "string",
      "selected": true,
      "score": 1,
      "title": "string",
      "budget": "string",
      "clientSummary": "string",
      "reasons": ["string", "string", "string"],
      "rejectionReason": null
    }
  ]
}`,
    "",
    "Rules:",
    "- Include exactly one result for each input job.",
    "- Use score 1-10 where 10 is the strongest fit.",
    "- Set selected to false for weak, risky, vague, underpaid, or poor-fit jobs.",
    "- Keep reasons short and specific. Use rejectionReason when selected is false.",
    "",
    "Jobs:",
    JSON.stringify(input.jobs.map(toGroqJobInput))
  ].join("\n");
}

function toGroqJobInput(job: JobRankingInput["jobs"][number]) {
  return {
    ...job,
    description: truncateText(job.description, MAX_GROQ_DESCRIPTION_CHARS)
  };
}

function truncateText(value: string, maxChars: number) {
  const trimmed = value.trim();
  if (trimmed.length <= maxChars) return trimmed;
  return `${trimmed.slice(0, maxChars)}...`;
}

function getGroqErrorMessage(value: unknown) {
  const error = toRecord(toRecord(value).error);
  const message = error.message;
  return typeof message === "string" && message.trim() ? message : null;
}

async function readJsonResponse(response: Response) {
  try {
    return (await response.json()) as unknown;
  } catch {
    if (!response.ok) {
      return {};
    }

    throw new GroqRankingError("Groq ranking response was not valid JSON.", response.status);
  }
}

function getFirstMessageContent(value: unknown) {
  const choice = toRecord(toArray(toRecord(value).choices)[0]);
  const message = toRecord(choice.message);
  return typeof message.content === "string" ? message.content : null;
}
