"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

type AdSlotProps = {
  label: string;
  slot?: string;
};

const adsEnabled = process.env.NEXT_PUBLIC_ADS_ENABLED === "true";
const adsenseClient = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;
const defaultContentSlot = process.env.NEXT_PUBLIC_ADSENSE_CONTENT_SLOT;

export function AdSlot({ label, slot = defaultContentSlot }: AdSlotProps) {
  useEffect(() => {
    if (!adsEnabled || !adsenseClient || !slot) return;

    try {
      window.adsbygoogle = window.adsbygoogle ?? [];
      window.adsbygoogle.push({});
    } catch {
      // Ad blockers or script timing should not affect page rendering.
    }
  }, [slot]);

  if (!adsEnabled || !adsenseClient || !slot) {
    return null;
  }

  return (
    <aside
      aria-label={label}
      className="my-6 min-h-[250px] w-full overflow-hidden rounded-lg border bg-muted/10 p-2"
    >
      <ins
        className="adsbygoogle block"
        data-ad-client={adsenseClient}
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </aside>
  );
}

