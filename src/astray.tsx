import { showHUD } from "@raycast/api";
import { runAppleScript } from "run-applescript";

export default async function main() {
  const result = await runAppleScript('tell application "Google Chrome" to get URL of active tab of first window');
  await showHUD(result);
}
