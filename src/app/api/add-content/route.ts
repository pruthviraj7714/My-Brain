import { auth } from "@/lib/auth";
import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { title, contentType, link } = await req.json();

  if (!title || !contentType || !link) {
    return NextResponse.json(
      {
        message: "Invalid Inputs",
      },
      { status: 400 }
    );
  }
  try {
    const session = await auth();

    if (!session || !session.user || !session.user.id) {
      return NextResponse.json(
        {
          message: "Unauthorized User",
        },
        { status: 403 }
      );
    }

    await prisma.content.create({
      data: {
        contentType,
        link,
        userId: session.user.id,
        title,
      },
    });

    return NextResponse.json(
      {
        message: "Content Successfully Added to Your Brain",
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({
      message: "Internal Server Error",
    }, { status : 500});
  }
}
