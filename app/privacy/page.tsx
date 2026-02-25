import type { Metadata } from "next";
import Link from "next/link";

import { PageShell } from "@/components/page-shell";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy Policy for Xarchive (what data we process and how we use it).",
  alternates: {
    canonical: "/privacy",
  },
};

export default function PrivacyPolicyPage() {
  return (
    <PageShell title="Privacy Policy" subtitle="Effective date: February 25, 2026">
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Summary</h2>
        <p className="text-muted-foreground">
          Xarchive is a tool for browsing archived social media snapshots. We aim to collect as little personal data as
          possible while keeping the service reliable.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Information you provide</h2>
        <p className="text-muted-foreground">
          When you use the tools, you may submit inputs such as usernames or URLs. We process these inputs to query the
          Wayback Machine and generate results and exports.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Information we may collect automatically</h2>
        <ul className="list-disc space-y-2 pl-5 text-muted-foreground">
          <li>
            <span className="font-medium text-foreground">Basic logs:</span> like most websites, our hosting provider may
            collect standard server logs (e.g., IP address, user agent, timestamps, and request paths) for security and
            debugging.
          </li>
          <li>
            <span className="font-medium text-foreground">Analytics:</span> we use Vercel Analytics to understand
            aggregated usage (e.g., page views and performance) so we can improve the product.
          </li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Third-party services</h2>
        <p className="text-muted-foreground">
          Xarchive communicates with third-party services to provide functionality:
        </p>
        <ul className="list-disc space-y-2 pl-5 text-muted-foreground">
          <li>
            <span className="font-medium text-foreground">Internet Archive / Wayback Machine:</span> used to retrieve CDX
            snapshot data and archived URLs.
          </li>
          <li>
            <span className="font-medium text-foreground">X (Twitter) embed services:</span> if you use tweet previews,
            your browser may load resources from <span className="font-medium">platform.twitter.com</span>, and our
            servers may request embed markup from <span className="font-medium">publish.twitter.com</span>.
          </li>
        </ul>
        <p className="text-sm text-muted-foreground">
          These third parties may process data under their own privacy policies. We encourage you to review their terms
          if you use those features.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Data retention</h2>
        <p className="text-muted-foreground">
          We do not intentionally store the usernames or URLs you submit beyond what is needed to fulfill requests, but
          operational logs and analytics may be retained for a limited time by our hosting/analytics providers.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Contact</h2>
        <p className="text-muted-foreground">
          If you have privacy questions, please reach out via{" "}
          <Link href="/contact" className="text-primary hover:underline">
            Contact
          </Link>
          .
        </p>
      </section>

      <p className="text-xs text-muted-foreground">
        Not affiliated: Xarchive is not affiliated with X / Twitter, Meta / Instagram, or the Internet Archive.
      </p>
    </PageShell>
  );
}

