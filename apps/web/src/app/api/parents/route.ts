import { NextRequest, NextResponse } from "next/server";
import prisma from "@parent-pal/database";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET() {
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const parents = await prisma.childParent.findMany({
        where: {
            childId: session.user.id,
        },
    });

    const parentNames = await prisma.user.findMany({
        where: {
            id: { in: parents.map((parent) => parent.parentId) },
        },
    });

    return NextResponse.json({ parents: parentNames });
}

export async function POST(req: NextRequest) {
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { name, email } = await req.json();

    const parent = await prisma.user.create({
        data: {
            name,
            email,
            role: "parent",
        },
    });

    await prisma.childParent.create({
        data: {
            childId: session.user.id,
            parentId: parent.id,
        },
    });

    return NextResponse.json({ message: "Parent added" });
}