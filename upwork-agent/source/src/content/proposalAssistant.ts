import { getCoverLetter, setCoverLetter } from "../coverLetter/coverLetterStorage";
import { getCoverLetterPrompt } from "../coverLetter/promptStorage";
import { MESSAGE_TYPES } from "../shared/constants";
import { toRecord, wait } from "../shared/utils";

const ROOT_ID = "upwork-toolkit-proposal-assistant";
const BUTTON_ID = "upwork-toolkit-proposal-button";
const COVER_LETTER_SELECTOR = 'textarea[aria-labelledby="cover_letter_label"]';
const COVER_LETTER_AREA_SELECTOR = ".cover-letter-area";

type JobDetails = {
  title: string;
  description: string;
};

type AssistantState = {
  draft: string;
  details: JobDetails | null;
  error: string | null;
  loading: boolean;
  open: boolean;
  prompt: string;
  savedCoverLetter: string;
  textarea: HTMLTextAreaElement;
};

let mounted = false;
let state: AssistantState | null = null;

export function mountProposalAssistant() {
  if (mounted) return;
  mounted = true;

  void initializeAssistant().catch((error) => {
    mounted = false;
    const message = error instanceof Error ? error.message : "Unable to initialize proposal assistant.";
    console.info(`[Upwork Toolkit] Proposal assistant not mounted: ${message}`);
  });
}

async function initializeAssistant() {
  const textarea = await waitForCoverLetterTextarea();
  const [savedCoverLetter, prompt] = await Promise.all([getCoverLetter(), getCoverLetterPrompt()]);

  if (savedCoverLetter.trim()) {
    setTextareaValue(textarea, savedCoverLetter);
  }

  injectStyles();
  const buttonRoot = mountButtonRoot(textarea);
  const dialogRoot = mountDialogRoot();

  state = {
    draft: savedCoverLetter,
    details: null,
    error: null,
    loading: true,
    open: false,
    prompt,
    savedCoverLetter,
    textarea
  };

  renderButton(buttonRoot);
  renderDialog(dialogRoot);

  try {
    const details = await fetchJobDetails();
    state.details = details;
    state.draft = buildDraft(prompt, details, savedCoverLetter);
  } catch (error) {
    state.error = error instanceof Error ? error.message : "Unable to load job details.";
    state.draft = savedCoverLetter || prompt;
  } finally {
    state.loading = false;
    renderButton(buttonRoot);
    renderDialog(dialogRoot);
  }

  window.addEventListener("keydown", (event) => {
    if ((event.ctrlKey || event.metaKey) && event.key === "Enter") {
      event.preventDefault();
      openDialog(buttonRoot, dialogRoot);
    }

    if (event.key === "Escape" && state?.open) {
      closeDialog(dialogRoot);
    }
  });
}

async function waitForCoverLetterTextarea() {
  for (let attempt = 0; attempt < 20; attempt += 1) {
    const textarea = document.querySelector<HTMLTextAreaElement>(COVER_LETTER_SELECTOR);
    if (textarea) return textarea;
    await wait(500);
  }

  throw new Error("Could not find cover letter textarea element");
}

function mountButtonRoot(textarea: HTMLTextAreaElement) {
  const existing = document.getElementById(BUTTON_ID);
  if (existing) return existing;

  const root = document.createElement("div");
  root.id = BUTTON_ID;
  const anchor = document.querySelector(COVER_LETTER_AREA_SELECTOR) ?? textarea.parentElement;
  anchor?.appendChild(root);
  return root;
}

function mountDialogRoot() {
  const existing = document.getElementById(ROOT_ID);
  if (existing) return existing;

  const root = document.createElement("div");
  root.id = ROOT_ID;
  document.body.appendChild(root);
  return root;
}

function renderButton(root: HTMLElement) {
  if (!state) return;

  root.innerHTML = "";
  const button = document.createElement("button");
  button.className = "utk-proposal-button";
  button.type = "button";
  button.textContent = state.loading ? "Loading job details..." : "Draft cover letter";
  button.disabled = state.loading && !state.savedCoverLetter;
  button.addEventListener("click", () => openDialog(root, document.getElementById(ROOT_ID)));
  root.appendChild(button);
}

function renderDialog(root: HTMLElement | null) {
  if (!root || !state) return;

  root.innerHTML = "";
  if (!state.open) return;

  const backdrop = document.createElement("div");
  backdrop.className = "utk-proposal-backdrop";

  const dialog = document.createElement("section");
  dialog.className = "utk-proposal-dialog";
  dialog.setAttribute("role", "dialog");
  dialog.setAttribute("aria-modal", "true");
  dialog.setAttribute("aria-label", "Cover letter draft");

  const title = document.createElement("h2");
  title.textContent = "Cover letter draft";

  const helper = document.createElement("p");
  helper.className = "utk-proposal-helper";
  helper.textContent = state.details
    ? `Using job details for: ${state.details.title}`
    : "Job details are unavailable, so the saved prompt/template is shown.";

  const textarea = document.createElement("textarea");
  textarea.className = "utk-proposal-draft";
  textarea.value = state.draft;
  textarea.rows = 14;
  textarea.addEventListener("input", () => {
    if (state) state.draft = textarea.value;
  });

  const error = state.error ? document.createElement("p") : null;
  if (error) {
    error.className = "utk-proposal-error";
    error.textContent = state.error;
  }

  const actions = document.createElement("div");
  actions.className = "utk-proposal-actions";

  const cancel = document.createElement("button");
  cancel.type = "button";
  cancel.textContent = "Cancel";
  cancel.className = "utk-proposal-secondary";
  cancel.addEventListener("click", () => closeDialog(root));

  const save = document.createElement("button");
  save.type = "button";
  save.textContent = "Save draft";
  save.className = "utk-proposal-secondary";
  save.addEventListener("click", () => {
    if (!state) return;
    void setCoverLetter(state.draft);
    state.savedCoverLetter = state.draft;
  });

  const insert = document.createElement("button");
  insert.type = "button";
  insert.textContent = "Insert";
  insert.className = "utk-proposal-primary";
  insert.addEventListener("click", () => {
    if (!state) return;
    setTextareaValue(state.textarea, state.draft);
    void setCoverLetter(state.draft);
    closeDialog(root);
  });

  actions.append(cancel, save, insert);
  dialog.append(title, helper);
  if (error) dialog.append(error);
  dialog.append(textarea, actions);
  backdrop.appendChild(dialog);
  backdrop.addEventListener("click", (event) => {
    if (event.target === backdrop) closeDialog(root);
  });
  root.appendChild(backdrop);
  textarea.focus();
}

function openDialog(buttonRoot: HTMLElement | null, dialogRoot: HTMLElement | null) {
  if (!state || !dialogRoot) return;
  state.open = true;
  if (buttonRoot) renderButton(buttonRoot);
  renderDialog(dialogRoot);
}

function closeDialog(dialogRoot: HTMLElement | null) {
  if (!state) return;
  state.open = false;
  renderDialog(dialogRoot);
}

async function fetchJobDetails(): Promise<JobDetails> {
  const jobId = getJobIdFromPath();
  if (!jobId) throw new Error("Could not determine Upwork job id from the current URL.");

  const response = await browser.runtime.sendMessage({
    type: MESSAGE_TYPES.GET_JOB_DETAILS,
    jobId
  });
  const details = normalizeJobDetailsResponse(response);

  if (!details) {
    throw new Error("Job details response did not include title and description.");
  }

  return details;
}

function getJobIdFromPath() {
  const segments = window.location.pathname.split("/").filter(Boolean);
  const jobIndex = segments.indexOf("job");
  if (jobIndex >= 0) return segments[jobIndex + 1] ?? null;
  return segments.at(-2) ?? null;
}

function normalizeJobDetailsResponse(response: unknown): JobDetails | null {
  const maybeTuple = Array.isArray(response) ? response[1] : response;
  const opening = toRecord(toRecord(toRecord(toRecord(maybeTuple).payload).opening).opening);
  const title = typeof opening.title === "string" ? opening.title : "";
  const description = typeof opening.description === "string" ? opening.description : "";

  if (!title || !description) return null;
  return { title, description };
}

function buildDraft(prompt: string, details: JobDetails, fallback: string) {
  const draft = prompt
    .replaceAll("#{title}", details.title)
    .replaceAll("#{job_description}", details.description)
    .replaceAll("<title>#{title}</title>", details.title)
    .replaceAll("<job_description>#{job_description}</job_description>", details.description);

  return fallback.trim() ? fallback : draft;
}

function setTextareaValue(textarea: HTMLTextAreaElement, value: string) {
  const setter = Object.getOwnPropertyDescriptor(HTMLTextAreaElement.prototype, "value")?.set;
  setter?.call(textarea, value);
  textarea.dispatchEvent(new InputEvent("input", { bubbles: true, inputType: "insertText", data: value }));
}

function injectStyles() {
  if (document.getElementById("upwork-toolkit-proposal-style")) return;

  const style = document.createElement("style");
  style.id = "upwork-toolkit-proposal-style";
  style.textContent = `
    .utk-proposal-button {
      background: #14a800;
      border: 0;
      border-radius: 8px;
      color: #fff;
      cursor: pointer;
      font: 700 14px/1.2 Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      margin: 8px 0;
      padding: 10px 16px;
      transition: background-color 150ms ease, box-shadow 150ms ease, transform 150ms ease;
    }
    .utk-proposal-button:hover:not(:disabled) {
      background: #0f8f00;
      box-shadow: 0 8px 22px rgba(20, 168, 0, 0.24);
      transform: translateY(-1px);
    }
    .utk-proposal-button:disabled {
      cursor: wait;
      opacity: 0.7;
    }
    .utk-proposal-backdrop {
      align-items: center;
      background: rgba(5, 8, 7, 0.58);
      bottom: 0;
      display: flex;
      justify-content: center;
      left: 0;
      padding: 20px;
      position: fixed;
      right: 0;
      top: 0;
      z-index: 2147483647;
    }
    .utk-proposal-dialog {
      background: #fff;
      border: 1px solid rgba(17, 24, 39, 0.1);
      border-radius: 8px;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
      color: #111827;
      max-height: 90vh;
      max-width: 760px;
      overflow: auto;
      padding: 20px;
      width: min(760px, 100%);
    }
    .utk-proposal-dialog h2 {
      font: 700 20px/1.3 Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      margin: 0 0 8px;
    }
    .utk-proposal-helper,
    .utk-proposal-error {
      font: 14px/1.45 Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      margin: 0 0 12px;
    }
    .utk-proposal-helper {
      color: #4b5563;
    }
    .utk-proposal-error {
      color: #b91c1c;
    }
    .utk-proposal-draft {
      border: 1px solid #d1d5db;
      border-radius: 6px;
      box-sizing: border-box;
      color: #111827;
      font: 14px/1.5 Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      min-height: 260px;
      padding: 12px;
      resize: vertical;
      width: 100%;
    }
    .utk-proposal-draft:focus {
      border-color: #14a800;
      box-shadow: 0 0 0 3px rgba(20, 168, 0, 0.16);
      outline: 0;
    }
    .utk-proposal-actions {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      justify-content: flex-end;
      margin-top: 14px;
    }
    .utk-proposal-primary,
    .utk-proposal-secondary {
      border-radius: 8px;
      cursor: pointer;
      font: 700 14px/1.2 Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      padding: 9px 16px;
      transition: background-color 150ms ease, border-color 150ms ease, color 150ms ease;
    }
    .utk-proposal-primary {
      background: #14a800;
      border: 1px solid #14a800;
      color: #fff;
    }
    .utk-proposal-secondary {
      background: #fff;
      border: 1px solid #9ca3af;
      color: #111827;
    }
    .utk-proposal-primary:hover {
      background: #0f8f00;
      border-color: #0f8f00;
    }
    .utk-proposal-secondary:hover {
      background: #f6f8f6;
      border-color: #6b7280;
    }
    @media (prefers-color-scheme: dark) {
      .utk-proposal-button {
        background: #32d583;
        color: #06120b;
      }
      .utk-proposal-button:hover:not(:disabled) {
        background: #7ee7ad;
        box-shadow: 0 10px 24px rgba(50, 213, 131, 0.18);
      }
      .utk-proposal-backdrop {
        background: rgba(3, 5, 4, 0.72);
      }
      .utk-proposal-dialog {
        background: #17191d;
        border-color: rgba(239, 244, 235, 0.1);
        box-shadow: 0 24px 70px rgba(0, 0, 0, 0.5);
        color: #f4f7f2;
      }
      .utk-proposal-helper {
        color: #aab4ad;
      }
      .utk-proposal-error {
        color: #ff7373;
      }
      .utk-proposal-draft {
        background: rgba(255, 255, 255, 0.025);
        border-color: rgba(239, 244, 235, 0.14);
        color: #f4f7f2;
      }
      .utk-proposal-draft:focus {
        border-color: #32d583;
        box-shadow: 0 0 0 3px rgba(50, 213, 131, 0.18);
      }
      .utk-proposal-primary {
        background: #32d583;
        border-color: #32d583;
        color: #06120b;
      }
      .utk-proposal-primary:hover {
        background: #7ee7ad;
        border-color: #7ee7ad;
      }
      .utk-proposal-secondary {
        background: rgba(239, 244, 235, 0.04);
        border-color: rgba(239, 244, 235, 0.18);
        color: #f4f7f2;
      }
      .utk-proposal-secondary:hover {
        background: rgba(50, 213, 131, 0.08);
        border-color: rgba(126, 231, 173, 0.44);
      }
    }
  `;
  document.head.appendChild(style);
}
