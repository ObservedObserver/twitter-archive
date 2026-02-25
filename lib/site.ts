export const SITE_NAME = "Xarchive";
export const DEFAULT_SITE_URL = "https://xarchive.net";

export const SITE_URL = process.env.SITE_URL ?? DEFAULT_SITE_URL;

export const CONTACT_EMAIL = process.env.CONTACT_EMAIL ?? "support@xarchive.net";
export const DMCA_EMAIL = process.env.DMCA_EMAIL ?? CONTACT_EMAIL;

const rawGithubRepoUrl =
  process.env.GITHUB_REPO_URL ?? "https://github.com/ObservedObserver/twitter-archive";

export const GITHUB_REPO_URL = rawGithubRepoUrl.replace(/\\.git$/i, "");
