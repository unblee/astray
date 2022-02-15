import { URL } from "url";

export type GitHubURL = {
  org: string;
  repo: string;
  type: GitHubURLType;
  number: number; // 0 means that URL does not contain a number.
  rawURL: URL;
};

export type GitHubURLType = "issue" | "pull" | "other";

export function parseGitHubURL(url: URL): GitHubURL {
  const segments = url.pathname.split("/").slice(1); // ["org", "repo", "type", ...]
  if (segments.length < 2) {
    // If length of segments is less than 2, it means that there are no elements after the org name.
    throw new Error("Goto issue or pull request page");
  }

  const urlType = ((urlTypeSegment: string): GitHubURLType => {
    switch (urlTypeSegment) {
      case "issues":
        return "issue";
      case "pull":
      case "pulls":
        return "pull";
      default:
        return "other";
    }
  })(segments[2]);

  const urlNumber = ((segments: string[]): number => {
    if (urlType == "other") {
      return 0;
    } else {
      return segments[3] ? Number(segments[3]) : 0;
    }
  })(segments);

  return {
    org: segments[0],
    repo: segments[1],
    type: urlType,
    number: urlNumber,
    rawURL: url,
  };
}
