import { NextRequest, NextResponse } from "next/server";
import prisma from "@/db/index";

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const reminders = await prisma.reminder.findMany({ where: { userId: userId ?? "" } });
    return NextResponse.json({ reminders });
}

export async function POST(request: NextRequest) {
    const { userId, title, content } = await request.json();
    const newReminder = await prisma.reminder.create({ data: { userId, title, content } });
    return NextResponse.json({ newReminder });
}