import { showHUD } from "@raycast/api";
import { runAppleScript } from "run-applescript";

export default async function main() {
  const result = await runAppleScript('return "unicorn"');
  await showHUD(result);
}
