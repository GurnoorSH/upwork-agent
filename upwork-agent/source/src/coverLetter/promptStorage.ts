import { storage } from "@wxt-dev/storage";
import type { CoverLetterPrompt } from "./coverLetterTypes";
import { DEFAULT_COVER_LETTER_PROMPT, migrateCoverLetterPrompt } from "../storage/migrations";
import { storageKeys } from "../storage/keys";

export const coverLetterPromptStorage = storage.defineItem<CoverLetterPrompt>(
  storageKeys.COVER_LETTER_PROMPT,
  {
    version: 1,
    fallback: DEFAULT_COVER_LETTER_PROMPT,
    migrations: {
      1: migrateCoverLetterPrompt
    }
  }
);

export async function getCoverLetterPrompt() {
  return migrateCoverLetterPrompt(await coverLetterPromptStorage.getValue());
}

export async function setCoverLetterPrompt(prompt: CoverLetterPrompt) {
  await coverLetterPromptStorage.setValue(migrateCoverLetterPrompt(prompt));
}
