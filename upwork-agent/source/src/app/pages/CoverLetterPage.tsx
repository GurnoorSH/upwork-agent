import { Alert, Button, Snackbar, Stack, TextField } from "@mui/material";
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
  const [notice, setNotice] = useState<string | null>(null);

  useEffect(() => {
    setPromptDraft(coverLetterPrompt);
  }, [coverLetterPrompt]);

  useEffect(() => {
    setLetterDraft(coverLetter);
  }, [coverLetter]);

  const savePrompt = async (message = "Prompt saved.") => {
    await saveCoverLetterPrompt(promptDraft);
    setNotice(message);
  };

  const resetPrompt = async () => {
    setPromptDraft(DEFAULT_COVER_LETTER_PROMPT);
    await saveCoverLetterPrompt(DEFAULT_COVER_LETTER_PROMPT);
    setNotice("Prompt reset.");
  };

  const saveLetter = async () => {
    await saveCoverLetter(letterDraft);
    setNotice("Cover letter saved.");
  };

  return (
    <PlaceholderPage title="Cover letter" compiledSymbol="TV">
      <>
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
            <Button variant="contained" onClick={() => void savePrompt()}>
              Save prompt
            </Button>
            <Button variant="outlined" onClick={() => void resetPrompt()}>
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
          <Button sx={{ alignSelf: "flex-start" }} variant="contained" onClick={() => void saveLetter()}>
            Save cover letter
          </Button>
        </Stack>
        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          autoHideDuration={3500}
          open={Boolean(notice)}
          onClose={(_, reason) => {
            if (reason === "clickaway") return;
            setNotice(null);
          }}
        >
          <Alert severity="success" variant="filled" onClose={() => setNotice(null)}>
            {notice}
          </Alert>
        </Snackbar>
      </>
    </PlaceholderPage>
  );
}
