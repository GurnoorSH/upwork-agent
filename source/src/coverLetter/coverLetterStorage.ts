import { storage } from "@wxt-dev/storage";
import type { CoverLetterText } from "./coverLetterTypes";
import { migrateCoverLetter } from "../storage/migrations";
import { storageKeys } from "../storage/keys";

export const coverLetterStorage = storage.defineItem<CoverLetterText>(storageKeys.COVER_LETTER, {
  version: 1,
  fallback: "",
  migrations: {
    1: migrateCoverLetter
  }
});

export async function getCoverLetter() {
  return migrateCoverLetter(await coverLetterStorage.getValue());
}

export async function setCoverLetter(value: CoverLetterText) {
  await coverLetterStorage.setValue(migrateCoverLetter(value));
}
