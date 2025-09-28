import { DEFAULT_USER_AGENT } from "./constants";
import type { EmbedResult } from "./types";

const TWITTER_OEMBED = "https://publish.twitter.com/oembed";
const CONTENT_REGEX = /<blockquote class="twitter-tweet"(?: [^>]+)?><p[^>]*>(.*?)<\/p>.*?&mdash; (.*?)<\/a>/s;
const AUTHOR_REGEX = /^(.*?)\s*\(.*$/s;

export async function fetchTweetEmbed(
  tweetUrl: string
): Promise<EmbedResult | null> {
  const params = new URLSearchParams({ url: tweetUrl });

  try {
    const response = await fetch(`${TWITTER_OEMBED}?${params.toString()}`, {
      headers: {
        "User-Agent": DEFAULT_USER_AGENT,
        Accept: "application/json",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      return null;
    }

    const json = (await response.json()) as {
      html?: string;
      author_name?: string;
    };

    if (!json.html || !json.author_name) return null;

    const match = json.html.match(CONTENT_REGEX);
    if (!match) return null;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const tweetContent = sanitizeHtmlText(match[0]?.replace(/<blockquote[^>]*>|<\/blockquote>/g, ""));
    const contentMatches = Array.from(json.html.matchAll(CONTENT_REGEX));
    if (contentMatches.length === 0) return null;

    const [tweetTextRaw, userInfoRaw] = contentMatches[0].slice(1);
    const tweetText = sanitizeHtmlText(tweetTextRaw)
      .replace(/<br\s*\/?>(\s)*/gi, "\n")
      .replace(/\s+$/g, "")
      .trim();

    const userInfo = sanitizeHtmlText(userInfoRaw).replace(")", "), ");
    const author = userInfo.match(AUTHOR_REGEX)?.[1] ?? "";

    return {
      text: tweetText || null,
      info: userInfo || null,
      isRetweet: author ? json.author_name !== author : null,
    };
  } catch {
    return null;
  }
}

function sanitizeHtmlText(value: string): string {
  return value
    .replace(/<a[^>]*>|<\/a>/gi, "")
    .replace(/<[^>]+>/g, "")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, "&");
}
