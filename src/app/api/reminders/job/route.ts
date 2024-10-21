import { NextRequest, NextResponse } from "next/server";
import { sendReminders } from "@/jobs/sendReminders";

export async function POST(request: NextRequest) {
    await sendReminders();
    return NextResponse.json({ message: "Reminders sent" });
}
