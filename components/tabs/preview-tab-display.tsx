"use client";

import { Button } from "@/components/ui/button";
import { useMemo, useEffect, useState, useRef } from "react";

// TypeScript declaration for Twitter widgets
declare global {
  interface Window {
    twttr?: {
      widgets: {
        load(): void;
      };
    };
  }
}

// Custom hook for intersection observer (lazy loading)
function useIntersectionObserver(
  options: IntersectionObserverInit = {}
): [React.RefObject<HTMLDivElement | null>, boolean] {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Only trigger once when it comes into view
        if (entry.isIntersecting && !isIntersecting) {
          setIsIntersecting(true);
        }
      },
      {
        threshold: 0.1, // Trigger when 10% of the element is visible
        rootMargin: '100px', // Start loading 100px before it comes into view
        ...options,
      }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [isIntersecting, options]);

  return [ref, isIntersecting];
}

type TweetRecord = Record<string, string | boolean | null>;

type PreviewTabDisplayProps = {
  tweets: TweetRecord[];
  onDownload: () => void;
};

export function PreviewTabDisplay({ tweets, onDownload }: PreviewTabDisplayProps) {
  const limitedTweets = useMemo(() => tweets.slice(0, 20), [tweets]);

  useEffect(() => {
    // Load Twitter widgets script
    if (!document.querySelector('script[src="https://platform.twitter.com/widgets.js"]')) {
      const script = document.createElement('script');
      script.src = 'https://platform.twitter.com/widgets.js';
      script.async = true;
      script.charset = 'utf-8';
      document.head.appendChild(script);
    }
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center gap-3">
        <Button type="button" onClick={onDownload}>
          Download HTML
        </Button>
        <span className="text-sm text-muted-foreground">
          Official Twitter embed cards for archived tweets
        </span>
      </div>
      
      {limitedTweets.length === 0 && (
        <p className="text-sm text-muted-foreground">No tweets available for preview.</p>
      )}

      <div className="flex flex-col gap-6">
        {limitedTweets.map((tweet, index) => (
          <TwitterEmbedCard key={`embed-${index}`} tweet={tweet} index={index} />
        ))}
      </div>
      
      {tweets.length > 20 && (
        <p className="text-xs text-muted-foreground text-center">
          Showing {limitedTweets.length} of {tweets.length} tweets. Download for full results.
        </p>
      )}
    </div>
  );
}

function TwitterEmbedCard({ tweet, index }: { tweet: TweetRecord; index: number }) {
  const [embedHtml, setEmbedHtml] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasStartedLoading, setHasStartedLoading] = useState(false);
  
  // Lazy loading: only fetch when the component comes into view
  const [containerRef, isVisible] = useIntersectionObserver();
  
  const parsedTweetUrl = typeof tweet.parsed_tweet_url === "string" ? tweet.parsed_tweet_url : null;
  const archivedUrl = typeof tweet.archived_tweet_url === "string" ? tweet.archived_tweet_url : null;
  const availableText = typeof tweet.available_tweet_text === "string" ? tweet.available_tweet_text : null;
  
  const timestamp = typeof tweet.parsed_archived_timestamp === "string" 
    ? tweet.parsed_archived_timestamp 
    : typeof tweet.archived_timestamp === "string" 
    ? tweet.archived_timestamp 
    : null;

  useEffect(() => {
    // Only fetch when visible and we haven't started loading yet
    if (!parsedTweetUrl || !isVisible || hasStartedLoading) return;
    
    setHasStartedLoading(true);
    setLoading(true);
    setError(null);
    
    // Use our server-side API to avoid CORS issues
    fetch(`/api/twitter-embed?url=${encodeURIComponent(parsedTweetUrl)}`)
      .then(async (response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch embed");
        }
        const data = await response.json();
        return data.html;
      })
      .then((html) => {
        if (html) {
          setEmbedHtml(html);
          
          // Re-initialize Twitter widgets after setting HTML
          setTimeout(() => {
            if (window.twttr?.widgets) {
              window.twttr.widgets.load();
            }
          }, 100);
        } else {
          setError("Could not load Twitter embed");
        }
      })
      .catch(() => {
        setError("Failed to fetch Twitter embed");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [parsedTweetUrl, isVisible, hasStartedLoading]);

  return (
    <div ref={containerRef} className="flex flex-col gap-3">
      {/* Header with metadata */}
      <div className="flex items-center justify-between text-sm text-gray-600">
        <span>Capture #{index + 1}</span>
        <div className="flex items-center gap-3">
          {timestamp && (
            <span>Archived: {new Date(timestamp).toLocaleDateString()}</span>
          )}
          {parsedTweetUrl && (
            <a
              href={parsedTweetUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:text-blue-600"
            >
              Original
            </a>
          )}
          {archivedUrl && (
            <a
              href={archivedUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:text-blue-600"
            >
              Archive
            </a>
          )}
        </div>
      </div>

      {/* Twitter Embed */}
      {!isVisible && parsedTweetUrl && (
        <div className="flex items-center justify-center p-8 border rounded-lg bg-gray-50">
          <div className="text-gray-500">📱 Scroll down to load Twitter embed</div>
        </div>
      )}

      {loading && (
        <div className="flex items-center justify-center p-8 border rounded-lg bg-gray-50">
          <div className="text-gray-500">Loading Twitter embed...</div>
        </div>
      )}

      {error && (
        <div className="p-4 border rounded-lg bg-red-50 border-red-200">
          <div className="text-red-600 text-sm font-medium mb-2">{error}</div>
          {availableText && (
            <div className="text-gray-700">
              <div className="text-sm font-medium mb-1">Fallback content:</div>
              <p className="whitespace-pre-wrap">{availableText}</p>
            </div>
          )}
        </div>
      )}

      {embedHtml && !loading && !error && (
        <div 
          className="twitter-embed-container"
          dangerouslySetInnerHTML={{ __html: embedHtml }}
        />
      )}

      {!parsedTweetUrl && (
        <div className="p-4 border rounded-lg bg-gray-50">
          <div className="text-gray-500 text-sm">No valid tweet URL available for embed</div>
          {availableText && (
            <div className="mt-2">
              <div className="text-sm font-medium mb-1">Available content:</div>
              <p className="whitespace-pre-wrap text-gray-700">{availableText}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
