"use client";

import Link from "next/link";
import type { ComponentProps } from "react";

import { trackEvent } from "@/lib/analytics";

type TrackedToolLinkProps = ComponentProps<typeof Link> & {
  source: string;
  tool: "twitter" | "instagram" | "reddit";
};

export function TrackedToolLink({ source, tool, onClick, ...props }: TrackedToolLinkProps) {
  return (
    <Link
      {...props}
      onClick={(event) => {
        trackEvent("guide_to_tool_click", {
          source,
          tool,
        });
        onClick?.(event);
      }}
    />
  );
}

