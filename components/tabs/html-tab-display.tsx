"use client";

import { Button } from "@/components/ui/button";

type TweetRecord = Record<string, string | boolean | null>;

type HtmlTabDisplayProps = {
  htmlContent: string;
  tweets: TweetRecord[];
  onDownload: () => void;
};

export function HtmlTabDisplay({ htmlContent, tweets, onDownload }: HtmlTabDisplayProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center gap-3">
        <Button type="button" onClick={onDownload}>
          Download HTML
        </Button>
        <span className="text-sm text-muted-foreground">Note: The iframes are best viewed in Firefox.</span>
      </div>
      <iframe
        title="HTML preview"
        srcDoc={htmlContent}
        className="h-[480px] w-full rounded-lg border"
      />
      <TweetPreviewList tweets={tweets} />
    </div>
  );
}

// Import the TweetPreviewList component that was already defined in the original file
import { useMemo, useState } from "react";

type FrameSourceKey =
  | "archived_tweet_url"
  | "parsed_archived_tweet_url"
  | "original_tweet_url"
  | "parsed_tweet_url";

const FRAME_SOURCES: Array<{ key: FrameSourceKey; label: string }> = [
  { key: "archived_tweet_url", label: "Archived Tweet" },
  { key: "parsed_archived_tweet_url", label: "Parsed Archived Tweet" },
  { key: "original_tweet_url", label: "Original Tweet" },
  { key: "parsed_tweet_url", label: "Parsed Tweet" },
];

function TweetPreviewList({ tweets, maxItems = 10 }: { tweets: TweetRecord[]; maxItems?: number }) {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});

  const limitedTweets = useMemo(() => tweets.slice(0, maxItems), [tweets, maxItems]);

  const handleToggle = (id: string, isOpen: boolean) => {
    setOpenSections((prev) => ({ ...prev, [id]: isOpen }));
  };

  if (limitedTweets.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">No preview available for this query.</p>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {limitedTweets.map((tweet, index) => {
        const availableText = typeof tweet.available_tweet_text === "string" ? tweet.available_tweet_text : null;
        const availableInfo = typeof tweet.available_tweet_info === "string" ? tweet.available_tweet_info : null;
        const timestamp =
          typeof tweet.parsed_archived_timestamp === "string"
            ? tweet.parsed_archived_timestamp
            : typeof tweet.archived_timestamp === "string"
              ? tweet.archived_timestamp
              : null;
        const cardKey = String(tweet.archived_urlkey ?? `${index}`);

        return (
          <article
            key={cardKey}
            className="rounded-xl border bg-background p-4 shadow-sm"
          >
            <div className="flex flex-col gap-3 text-sm">
              <div className="flex flex-col gap-1">
                <p className="text-base font-medium">Capture #{index + 1}</p>
                {timestamp && (
                  <p className="text-xs text-muted-foreground">Archived: {timestamp}</p>
                )}
              </div>

              {availableText && (
                <div className="rounded-lg border bg-muted/40 p-3">
                  <p className="text-sm font-medium">Available Tweet Content</p>
                  <p className="mt-1 whitespace-pre-wrap text-sm">{availableText}</p>
                  {availableInfo && (
                    <p className="mt-2 text-xs text-muted-foreground">{availableInfo}</p>
                  )}
                </div>
              )}

              <div className="flex flex-wrap gap-2 text-xs">
                {FRAME_SOURCES.map((source) => {
                  const url = tweet[source.key];
                  const parsedUrl = typeof url === "string" ? url : null;
                  if (!parsedUrl) {
                    return null;
                  }
                  const sectionId = `${index}-${source.key}`;
                  const isOpen = openSections[sectionId] ?? false;

                  return (
                    <details
                      key={sectionId}
                      className="w-full overflow-hidden rounded-lg border bg-background"
                      onToggle={(event) => handleToggle(sectionId, event.currentTarget.open)}
                    >
                      <summary className="cursor-pointer px-3 py-2 text-sm font-medium">
                        Click to load the iframe from {source.label}
                      </summary>
                      <div className="px-3 pb-3">
                        {isOpen && (
                          <iframe
                            key={`${sectionId}-iframe`}
                            src={parsedUrl}
                            title={`${source.label} - ${sectionId}`}
                            className="mt-2 h-[480px] w-full rounded-md border bg-white"
                            sandbox="allow-scripts allow-same-origin allow-popups"
                          />
                        )}
                        {!isOpen && (
                          <p className="mt-2 text-xs text-muted-foreground">
                            Open this section to load the archived iframe.
                          </p>
                        )}
                      </div>
                    </details>
                  );
                })}
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
