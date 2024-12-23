import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const GET = async (req: Request) => {
  const auth_id: string = req.url.split("/user/")[1];
  console.log(auth_id);

  try {
    try {
      await prisma.$connect();
    } catch {
      return NextResponse.json(
        { message: "DB connection Error" },
        { status: 500 }
      );
    }
    const user = await prisma.user.findUnique({
      where: { auth_id },
      include: {
        posts: true,
      },
    });
    return NextResponse.json({ message: "Success", user }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};
