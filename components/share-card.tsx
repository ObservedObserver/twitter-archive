"use client";

import { useEffect, useMemo, useState } from "react";
import { Check, Copy, Facebook, Linkedin, Mail, MessageCircle, Share2, Twitter } from "lucide-react";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";

type ShareContent = {
  title: string;
  description: string;
  suggestedHashtags: string;
};

const PAGE_SHARE_CONTENT: Record<string, ShareContent> = {
  "/": {
    title: "Share This Twitter Archive Tool",
    description: "Help others discover and export Wayback Machine Twitter snapshots.",
    suggestedHashtags: "#TwitterArchive #WaybackMachine #OpenData #OSINT",
  },
  "/archive-instagram": {
    title: "Share This Instagram Archive Tool",
    description: "Help others discover and export Wayback Machine Instagram snapshots.",
    suggestedHashtags: "#InstagramArchive #WaybackMachine #OpenData #OSINT",
  },
};

function buildShareContent(pathname: string): ShareContent {
  return (
    PAGE_SHARE_CONTENT[pathname] ?? {
      title: "Share Xarchive",
      description: "Share this page with anyone researching archived social media snapshots.",
      suggestedHashtags: "#WaybackMachine #Archive #OpenData #Xarchive",
    }
  );
}

export function ShareCard() {
  const pathname = usePathname();
  const shouldRender = pathname in PAGE_SHARE_CONTENT;
  const [copied, setCopied] = useState(false);
  const [shareUrl, setShareUrl] = useState("");

  useEffect(() => {
    if (!shouldRender) return;
    setShareUrl(window.location.href);
  }, [pathname, shouldRender]);

  const content = useMemo(() => buildShareContent(pathname), [pathname]);
  const canonicalUrl = useMemo(() => {
    if (pathname === "/") {
      return "https://xarchive.net";
    }
    return `https://xarchive.net${pathname}`;
  }, [pathname]);
  const url = shareUrl || canonicalUrl;

  if (!shouldRender) {
    return null;
  }

  const baseText = `${content.title} - ${content.description}`;
  const encodedUrl = encodeURIComponent(url);
  const encodedText = encodeURIComponent(baseText);
  const encodedWhatsAppText = encodeURIComponent(`${baseText}\n${url}`);
  const encodedEmailSubject = encodeURIComponent(content.title);
  const encodedEmailBody = encodeURIComponent(`${content.description}\n\n${url}`);

  const socialLinks = [
    {
      label: "X",
      icon: Twitter,
      href: `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`,
    },
    {
      label: "Facebook",
      icon: Facebook,
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    },
    {
      label: "LinkedIn",
      icon: Linkedin,
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    },
    {
      label: "WhatsApp",
      icon: MessageCircle,
      href: `https://wa.me/?text=${encodedWhatsAppText}`,
    },
  ];

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: content.title,
        text: content.description,
        url,
      });
      return;
    }

    await handleCopy();
  };

  return (
    <section className="mx-auto w-full max-w-5xl px-4 pb-12">
      <div className="rounded-2xl border bg-card p-6 shadow-sm md:p-8">
        <div className="mb-6 flex items-center gap-3">
          <div className="rounded-full bg-primary/10 p-2 text-primary">
            <Share2 className="size-5" aria-hidden="true" />
          </div>
          <div>
            <h2 className="text-2xl font-semibold">{content.title}</h2>
            <p className="text-sm text-muted-foreground">{content.description}</p>
          </div>
        </div>

        <div className="space-y-5">
          <div className="space-y-2">
            <p className="text-sm font-medium">Copy Link</p>
            <div className="flex flex-col gap-2 sm:flex-row">
              <input
                readOnly
                value={url}
                className="h-10 w-full rounded-md border bg-background px-3 text-sm"
                aria-label="Share URL"
              />
              <Button type="button" variant="outline" onClick={handleCopy} className="sm:w-36">
                {copied ? <Check className="size-4" aria-hidden="true" /> : <Copy className="size-4" aria-hidden="true" />}
                {copied ? "Copied" : "Copy"}
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-sm font-medium">Share on Social Media</p>
            <div className="grid gap-2 sm:grid-cols-2">
              {socialLinks.map((item) => (
                <Button key={item.label} asChild variant="outline" className="justify-start">
                  <a href={item.href} target="_blank" rel="noopener noreferrer" aria-label={`Share on ${item.label}`}>
                    <item.icon className="size-4" aria-hidden="true" />
                    {item.label}
                  </a>
                </Button>
              ))}
            </div>
          </div>

          <Button asChild variant="outline" className="w-full">
            <a
              href={`mailto:?subject=${encodedEmailSubject}&body=${encodedEmailBody}`}
              aria-label="Share via email"
            >
              <Mail className="size-4" aria-hidden="true" />
              Share via Email
            </a>
          </Button>

          <div className="border-t pt-5">
            <Button type="button" className="w-full" onClick={handleNativeShare}>
              <Share2 className="size-4" aria-hidden="true" />
              More Share Options
            </Button>
          </div>

          <p className="text-sm text-muted-foreground">
            Suggested hashtags: {content.suggestedHashtags}
          </p>
        </div>
      </div>
    </section>
  );
}
