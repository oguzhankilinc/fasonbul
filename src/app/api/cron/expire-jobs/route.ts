import { NextRequest, NextResponse } from "next/server";
import { expireOldJobs } from "@/actions/admin";

// This endpoint can be called by a cron service to expire old jobs
// For Vercel, add to vercel.json:
// { "crons": [{ "path": "/api/cron/expire-jobs", "schedule": "0 0 * * *" }] }

export async function GET(request: NextRequest) {
  // Optional: Verify cron secret for security
  const authHeader = request.headers.get("authorization");
  const cronSecret = process.env.CRON_SECRET;

  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const result = await expireOldJobs();

    return NextResponse.json({
      success: true,
      message: `${result.expired} ilan süresi doldu olarak işaretlendi.`,
      expired: result.expired,
    });
  } catch (error) {
    console.error("Expire jobs error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  return GET(request);
}
