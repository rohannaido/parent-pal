import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import prisma from '@parent-pal/database';
import { z } from 'zod';

const setPasswordSchema = z.object({
    token: z.string(),
    password: z.string().min(8),
});

export async function POST(req: Request) {
    const body = await req.json();
    const parsedBody = setPasswordSchema.safeParse(body);

    if (!parsedBody.success) {
        return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
    }

    const { token, password } = parsedBody.data;

    const setup = await prisma.passwordSetup.findFirst({
        where: {
            token,
            expiresAt: { gt: new Date() },
            used: false,
        }
    });

    if (!setup) {
        return NextResponse.json(
            { error: 'Invalid or expired token' },
            { status: 400 }
        );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.update({
        where: { email: setup.email },
        data: { password: hashedPassword },
    });

    await prisma.passwordSetup.update({
        where: { id: setup.id },
        data: { used: true },
    });

    return NextResponse.json({ success: true });
}
