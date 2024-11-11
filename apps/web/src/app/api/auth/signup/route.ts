import prisma from "@parent-pal/database";
import bcrypt from "bcrypt";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const signupSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
});

export async function POST(request: NextRequest) {
    const body = await request.json();
    const parsedBody = signupSchema.safeParse(body);

    if (!parsedBody.success) {
        return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
    }

    const { email, password } = parsedBody.data;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({ data: { email, password: hashedPassword, role: "child" } });

    return NextResponse.json(user);
}
