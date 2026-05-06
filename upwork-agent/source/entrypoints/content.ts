import { mountProposalAssistant } from "../src/content/proposalAssistant";

export default defineContentScript({
  matches: ["https://*.upwork.com/nx/proposals/job/*/apply*"],
  allFrames: true,
  runAt: "document_end",
  main() {
    mountProposalAssistant();
  }
});
