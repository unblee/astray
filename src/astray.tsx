import { showHUD } from "@raycast/api";
import { runAppleScript } from "run-applescript";
import { URL } from "url";
import { parseGitHubURL } from "./GitHubURL";

export default async function Command() {
  const result = await runAppleScript('tell application "Google Chrome" to get URL of active tab of first window');
  const browserTabURL = new URL(result);
  if (browserTabURL.hostname != "github.com") {
    await showHUD("The current URL opened in a browser tab is not supported.");
    return;
  }
  const ghURL = parseGitHubURL(browserTabURL);
  console.log(ghURL);
}
