import { NextRequest, NextResponse } from "next/server";
import prisma from "@parent-pal/database";
import { z } from "zod";

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const reminders = await prisma.reminder.findMany({ where: { userId: userId ?? "" } });
    return NextResponse.json({ reminders: reminders });
}

const reminderSchema = z.object({
    userId: z.string(),
    title: z.string(),
    content: z.string(),
    dateTime: z.string().datetime(),
});

export async function POST(request: NextRequest) {
    const body = await request.json();
    const parsedBody = reminderSchema.safeParse(body);
    if (!parsedBody.success) {
        return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
    }

    let { userId, title, content, dateTime } = parsedBody.data;
    await prisma.reminder.create({ data: { userId, title, content, dateTime } });
    return NextResponse.json({});
}