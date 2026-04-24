import { NextResponse } from "next/server";

import { trackServerEvent } from "@/lib/server-analytics";

interface WaitlistRequestBody {
  email?: string;
  feature?: string;
  surface?: string;
  note?: string;
}

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as WaitlistRequestBody;
    const email = (body.email ?? "").trim();
    const feature = (body.feature ?? "unknown").trim().slice(0, 80);
    const surface = (body.surface ?? "unknown").trim().slice(0, 80);
    const note = (body.note ?? "").trim().slice(0, 500);

    if (!emailPattern.test(email)) {
      return NextResponse.json({ error: "A valid email is required." }, { status: 400 });
    }

    await trackServerEvent(request, "waitlist_submit_server", {
      feature,
      surface,
      has_note: Boolean(note),
    });

    if (process.env.WAITLIST_WEBHOOK_URL) {
      await fetch(process.env.WAITLIST_WEBHOOK_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: `Xarchive early access: ${email}`,
          email,
          feature,
          surface,
          note,
        }),
      });
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Unable to join early access." }, { status: 500 });
  }
}

