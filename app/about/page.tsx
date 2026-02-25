import type { Metadata } from "next";
import Link from "next/link";

import { PageShell } from "@/components/page-shell";

export const metadata: Metadata = {
  title: "About",
  description: "Learn what Xarchive is, how it works, and what it is (and is not) affiliated with.",
  alternates: {
    canonical: "/about",
  },
};

export default function AboutPage() {
  return (
    <PageShell
      title="About Xarchive"
      subtitle="Xarchive helps you browse and export archived social media snapshots already saved in the Wayback Machine."
    >
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">What we do</h2>
        <ul className="list-disc space-y-2 pl-5 text-muted-foreground">
          <li>Search Internet Archive CDX data for archived Twitter (X) and Instagram URLs.</li>
          <li>Preview snapshots and export results in common formats (HTML/CSV/JSON).</li>
          <li>Make it easier to research historical public posts that are already archived elsewhere.</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">What we don&apos;t do</h2>
        <ul className="list-disc space-y-2 pl-5 text-muted-foreground">
          <li>We are not an archiving service and we don&apos;t control what the Wayback Machine has captured.</li>
          <li>We don&apos;t claim ownership of third-party content referenced by the archive snapshots.</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Not affiliated</h2>
        <p className="text-muted-foreground">
          Xarchive is an independent project and is not affiliated with, endorsed by, or sponsored by X / Twitter, Meta
          / Instagram, or the Internet Archive.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Contact</h2>
        <p className="text-muted-foreground">
          For support, feedback, or copyright concerns, see{" "}
          <Link href="/contact" className="text-primary hover:underline">
            Contact
          </Link>{" "}
          and{" "}
          <Link href="/dmca" className="text-primary hover:underline">
            DMCA / Copyright
          </Link>
          .
        </p>
      </section>

      <p className="text-xs text-muted-foreground">Last updated: February 25, 2026</p>
    </PageShell>
  );
}

