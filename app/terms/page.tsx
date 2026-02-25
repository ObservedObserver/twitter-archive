import type { Metadata } from "next";
import Link from "next/link";

import { PageShell } from "@/components/page-shell";

export const metadata: Metadata = {
  title: "Terms",
  description: "Terms of Service for Xarchive.",
  alternates: {
    canonical: "/terms",
  },
};

export default function TermsPage() {
  return (
    <PageShell title="Terms of Service" subtitle="Effective date: February 25, 2026">
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Acceptance</h2>
        <p className="text-muted-foreground">
          By accessing or using Xarchive, you agree to these Terms. If you do not agree, do not use the service.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">What Xarchive provides</h2>
        <p className="text-muted-foreground">
          Xarchive is a research tool that helps you discover and export information about archived social media
          snapshots that are available from third-party services (such as the Internet Archive&apos;s Wayback Machine).
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Your responsibilities</h2>
        <ul className="list-disc space-y-2 pl-5 text-muted-foreground">
          <li>You are responsible for complying with applicable laws and any third-party terms that apply to you.</li>
          <li>You may not use Xarchive to violate privacy rights, harass others, or engage in unlawful activity.</li>
          <li>You may not attempt to disrupt, abuse, or reverse engineer the service.</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Third-party content</h2>
        <p className="text-muted-foreground">
          Xarchive may display or export information derived from third-party sources (e.g., archive indexes and embed
          previews). We do not control and are not responsible for third-party content, availability, or accuracy.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Copyright & takedowns</h2>
        <p className="text-muted-foreground">
          If you believe content shown by Xarchive infringes your rights, please see{" "}
          <Link href="/dmca" className="text-primary hover:underline">
            DMCA / Copyright
          </Link>{" "}
          for how to submit a request.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Disclaimer</h2>
        <p className="text-muted-foreground">
          THE SERVICE IS PROVIDED “AS IS” AND “AS AVAILABLE” WITHOUT WARRANTIES OF ANY KIND. WE DISCLAIM ALL WARRANTIES,
          INCLUDING IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Limitation of liability</h2>
        <p className="text-muted-foreground">
          TO THE MAXIMUM EXTENT PERMITTED BY LAW, XARCHIVE WILL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL,
          CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF DATA, PROFITS, OR REVENUE.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Not affiliated</h2>
        <p className="text-muted-foreground">
          Xarchive is not affiliated with X / Twitter, Meta / Instagram, or the Internet Archive.
        </p>
      </section>
    </PageShell>
  );
}

