import { NextRequest, NextResponse } from "next/server";
import prisma from "@/db/index";
import { z } from "zod";

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const reminders = await prisma.reminder.findMany({ where: { userId: userId ?? "" } });
    return NextResponse.json({ reminders });
}

const reminderSchema = z.object({
    userId: z.string(),
    title: z.string(),
    content: z.string(),
    date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in YYYY-MM-DD format"),
    time: z.string().regex(/^\d{2}:\d{2}$/, "Time must be in HH:MM format")
});

export async function POST(request: NextRequest) {
    const body = await request.json();
    const parsedBody = reminderSchema.safeParse(body);
    if (!parsedBody.success) {
        return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
    }

    const { userId, title, content, date, time } = parsedBody.data;
    const newReminder = await prisma.reminder.create({ data: { userId, title, content, date, time } });
    return NextResponse.json({ newReminder });
}