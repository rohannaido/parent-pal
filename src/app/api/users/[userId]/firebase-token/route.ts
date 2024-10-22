import { NextRequest, NextResponse } from "next/server";
import prisma from "@/db/index";
import { z } from "zod";

const notificationTokenSchema = z.object({
    notificationToken: z.string(),
});

export async function POST(request: NextRequest, { params }: { params: { userId: string } }) {
    const userId = params.userId;
    const body = await request.json();
    const parsedBody = notificationTokenSchema.safeParse(body);
    if (!parsedBody.success) {
        return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
    }
    const { notificationToken } = parsedBody.data;
    await prisma.user.update({ where: { id: userId }, data: { notificationToken } });
    return NextResponse.json({});
}