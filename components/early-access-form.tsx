"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { trackEvent } from "@/lib/analytics";

export function EarlyAccessForm() {
  const searchParams = useSearchParams();
  const feature = searchParams.get("feature") ?? "unknown";
  const surface = searchParams.get("surface") ?? "unknown";
  const [email, setEmail] = useState("");
  const [note, setNote] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("loading");
    setMessage(null);

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.trim(),
          note: note.trim(),
          feature,
          surface,
        }),
      });

      if (!response.ok) {
        const payload = (await response.json()) as { error?: string };
        throw new Error(payload.error ?? "Unable to join early access.");
      }

      trackEvent("waitlist_submit", {
        feature,
        surface,
      });
      setStatus("done");
      setMessage("Thanks. We recorded your interest for this feature.");
      setEmail("");
      setNote("");
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Unable to join early access.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5 rounded-lg border p-5">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="feature">Feature</Label>
          <Input id="feature" value={feature.replaceAll("_", " ")} readOnly />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="note">What would you use it for?</Label>
        <Input
          id="note"
          placeholder="Optional"
          value={note}
          onChange={(event) => setNote(event.target.value)}
        />
      </div>
      <div className="flex items-center justify-between gap-4">
        <p className="text-sm text-muted-foreground">
          Surface: {surface.replaceAll("_", " ")}
        </p>
        <Button type="submit" disabled={status === "loading"}>
          {status === "loading" ? "Submitting..." : "Join Early Access"}
        </Button>
      </div>
      {message ? (
        <p className={status === "error" ? "text-sm text-destructive" : "text-sm text-muted-foreground"}>
          {message}
        </p>
      ) : null}
    </form>
  );
}

