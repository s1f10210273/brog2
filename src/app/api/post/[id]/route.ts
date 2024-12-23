import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// PUT (Update a post)
export const PUT = async (req: Request) => {
  try {
    const id = Number(req.url.split("/post/")[1]);
    const { title, content, authorId } = await req.json();

    try {
      await prisma.$connect();
    } catch {
      return NextResponse.json(
        { message: "DB connection Error" },
        { status: 500 }
      );
    }

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
    const id = Number(req.url.split("/post/")[1]);

    try {
      await prisma.$connect();
    } catch {
      return NextResponse.json(
        { message: "DB connection Error" },
        { status: 500 }
      );
    }

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

export const GET = async (req: Request) => {
  try {
    const id = Number(req.url.split("/post/")[1]);

    if (!id) {
      return NextResponse.json(
        { message: "Post ID is required" },
        { status: 400 }
      );
    }

    try {
      await prisma.$connect();
    } catch {
      return NextResponse.json(
        { message: "DB connection Error" },
        { status: 500 }
      );
    }
    const post = await prisma.post.findUnique({
      where: { id },
    });

    if (!post) {
      return NextResponse.json({ message: "Post not found" }, { status: 404 });
    }

    return NextResponse.json({ post }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};
