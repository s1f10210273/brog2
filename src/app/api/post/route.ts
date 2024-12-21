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

// GET (Get all posts)
export const GET = async () => {
  try {
    await doConnect();
    const posts = await prisma.post.findMany(); // Fetch all posts
    return NextResponse.json({ posts }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};

// PUT (Update a post)
export const PUT = async (req: Request) => {
  try {
    const { id, title, content, authorId } = await req.json();

    await doConnect();
    const existingPost = await prisma.post.findUnique({ where: { id } });

    if (!existingPost) {
      return NextResponse.json({ message: "Post not found" }, { status: 404 });
    }

    const updatedPost = await prisma.post.update({
      where: { id },
      data: { title, content, authorId },
    });

    return NextResponse.json(
      { message: "Post updated", updatedPost },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};

// DELETE (Delete a post)
export const DELETE = async (req: Request) => {
  try {
    const { id } = await req.json(); // Pass the post id in the body

    await doConnect();
    const existingPost = await prisma.post.findUnique({
      where: { id },
    });

    if (!existingPost) {
      return NextResponse.json({ message: "Post not found" }, { status: 404 });
    }

    await prisma.post.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Post deleted" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};
