import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

// Connect to DB
export async function doConnect() {
  try {
    await prisma.$connect();
  } catch {
    return Error("DB接続に失敗しました");
  }
}

// POST (Create a new post)
export const POST = async (req: Request) => {
  try {
    const { title, content, authorId } = await req.json();

    await doConnect();
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
