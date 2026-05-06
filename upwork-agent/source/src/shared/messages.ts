import { MESSAGE_TYPES } from "./constants";

export type OpenPageMessage = {
  type: typeof MESSAGE_TYPES.OPEN_PAGE;
  url: string;
};

export type PlaySoundMessage = {
  type: typeof MESSAGE_TYPES.PLAY_SOUND;
  volume: number;
};

export type GetJobDetailsMessage = {
  type: typeof MESSAGE_TYPES.GET_JOB_DETAILS;
  jobId: string;
};

export type ExtensionMessage = OpenPageMessage | PlaySoundMessage | GetJobDetailsMessage;

export function isOpenPageMessage(message: unknown): message is OpenPageMessage {
  return (
    typeof message === "object" &&
    message !== null &&
    (message as OpenPageMessage).type === MESSAGE_TYPES.OPEN_PAGE &&
    typeof (message as OpenPageMessage).url === "string"
  );
}

export function isPlaySoundMessage(message: unknown): message is PlaySoundMessage {
  return (
    typeof message === "object" &&
    message !== null &&
    (message as PlaySoundMessage).type === MESSAGE_TYPES.PLAY_SOUND &&
    typeof (message as PlaySoundMessage).volume === "number"
  );
}

export function isGetJobDetailsMessage(message: unknown): message is GetJobDetailsMessage {
  return (
    typeof message === "object" &&
    message !== null &&
    (message as GetJobDetailsMessage).type === MESSAGE_TYPES.GET_JOB_DETAILS &&
    typeof (message as GetJobDetailsMessage).jobId === "string"
  );
}
