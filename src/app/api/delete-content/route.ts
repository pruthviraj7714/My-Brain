import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
  try {
    const contentId = req.nextUrl.searchParams.get("id");

    if (!contentId) {
      return NextResponse.json(
        {
          message: "Content Id not found!",
        },
        { status: 400 }
      );
    }

    await prisma.content.delete({
      where: {
        id: contentId,
      },
    });

    return NextResponse.json(
      {
        message: "Content Successfully Deleted",
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "Internal Server Error",
      },
      { status: 500 }
    );
  }
}
