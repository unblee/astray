import { URL } from "url";
import { GitHubURL, parseGitHubURL } from "./GitHubURL";

describe("parseGitHubURL()", () => {
  it("github root", () => {
    const url = new URL("https://github.com");
    expect(() => {
      parseGitHubURL(url);
    }).toThrow();
  });

  it("org and repo name only", () => {
    const url = new URL("https://github.com/raycast/extensions");
    const expected: GitHubURL = {
      org: "raycast",
      repo: "extensions",
      type: "other",
      number: 0,
      rawURL: url,
    };
    expect(parseGitHubURL(url)).toStrictEqual(expected);
  });

  it("org name only", () => {
    const url = new URL("https://github.com/raycast");
    expect(() => {
      parseGitHubURL(url);
    }).toThrow();
  });

  it("root of issues", () => {
    const url = new URL("https://github.com/raycast/extensions/issues");
    const expected: GitHubURL = {
      org: "raycast",
      repo: "extensions",
      type: "issue",
      number: 0,
      rawURL: url,
    };
    expect(parseGitHubURL(url)).toStrictEqual(expected);
  });

  it("a issue with number", () => {
    const url = new URL("https://github.com/raycast/extensions/issues/910");
    const expected: GitHubURL = {
      org: "raycast",
      repo: "extensions",
      type: "issue",
      number: 910,
      rawURL: url,
    };
    expect(parseGitHubURL(url)).toStrictEqual(expected);
  });

  it("pulls of issues", () => {
    const url = new URL("https://github.com/raycast/extensions/pulls");
    const expected: GitHubURL = {
      org: "raycast",
      repo: "extensions",
      type: "pull",
      number: 0,
      rawURL: url,
    };
    expect(parseGitHubURL(url)).toStrictEqual(expected);
  });

  it("a pull with number", () => {
    const url = new URL("https://github.com/raycast/extensions/pull/911");
    const expected: GitHubURL = {
      org: "raycast",
      repo: "extensions",
      type: "pull",
      number: 911,
      rawURL: url,
    };
    expect(parseGitHubURL(url)).toStrictEqual(expected);
  });

  it("other url types", () => {
    const url = new URL("https://github.com/raycast/extensions/tree/main/extensions");
    const expected: GitHubURL = {
      org: "raycast",
      repo: "extensions",
      type: "other",
      number: 0,
      rawURL: url,
    };
    expect(parseGitHubURL(url)).toStrictEqual(expected);
  });
});
