import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// POST (Create a new post)
export const POST = async (req: Request) => {
  try {
    const { title, content, authorId } = await req.json();

    try {
      await prisma.$connect();
    } catch {
      return NextResponse.json(
        { message: "DB connection Error" },
        { status: 500 }
      );
    }
    const post = await prisma.post.create({
      data: { title, content, authorId },
    });
    return NextResponse.json({ message: "Success", post }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};
