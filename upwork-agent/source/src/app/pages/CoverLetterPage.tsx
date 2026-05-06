import { Button, Stack, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useAppState } from "../AppStateContext";
import { DEFAULT_COVER_LETTER_PROMPT } from "../../storage/migrations";
import { PlaceholderPage } from "./PlaceholderPage";

export function CoverLetterPage() {
  const {
    coverLetter,
    coverLetterPrompt,
    saveCoverLetter,
    saveCoverLetterPrompt
  } = useAppState();
  const [promptDraft, setPromptDraft] = useState(coverLetterPrompt);
  const [letterDraft, setLetterDraft] = useState(coverLetter);

  useEffect(() => {
    setPromptDraft(coverLetterPrompt);
  }, [coverLetterPrompt]);

  useEffect(() => {
    setLetterDraft(coverLetter);
  }, [coverLetter]);

  return (
    <PlaceholderPage title="Cover letter" compiledSymbol="TV">
      <Stack spacing={2}>
        <TextField
          label="Prompt template"
          minRows={8}
          multiline
          value={promptDraft}
          onBlur={() => void saveCoverLetterPrompt(promptDraft)}
          onChange={(event) => setPromptDraft(event.target.value)}
        />
        <Stack direction="row" spacing={1}>
          <Button variant="contained" onClick={() => void saveCoverLetterPrompt(promptDraft)}>
            Save prompt
          </Button>
          <Button
            variant="outlined"
            onClick={() => {
              setPromptDraft(DEFAULT_COVER_LETTER_PROMPT);
              void saveCoverLetterPrompt(DEFAULT_COVER_LETTER_PROMPT);
            }}
          >
            Reset prompt
          </Button>
        </Stack>
        <TextField
          label="Saved cover letter"
          minRows={8}
          multiline
          value={letterDraft}
          onBlur={() => void saveCoverLetter(letterDraft)}
          onChange={(event) => setLetterDraft(event.target.value)}
        />
        <Button
          sx={{ alignSelf: "flex-start" }}
          variant="contained"
          onClick={() => void saveCoverLetter(letterDraft)}
        >
          Save cover letter
        </Button>
      </Stack>
    </PlaceholderPage>
  );
}
