import prisma from "@/lib/db";
import { hash } from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const signUpSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.string().email({ message: "The email must be valid." }),
  password: z
    .string()
    .min(6, { message: "The password must be at least of 6 characters" }),
});

export async function POST(req: NextRequest) {
  try {
    const parsedBody = signUpSchema.safeParse(await req.json());

    if (!parsedBody.success) {
      return NextResponse.json(
        {
          message: "Invalid Inputs!",
          error: parsedBody.error.format(),
        },
        { status: 403 }
      );
    }

    const { email, password, username } = parsedBody.data;

    const isUserExists = await prisma.user.findFirst({
      where: {
        OR: [
          {
            username,
          },
          { email },
        ],
      },
    });

    if (isUserExists) {
      return NextResponse.json(
        {
          message: "User With Same Username/Email Already Exists",
        },
        { status: 409 }
      );
    }

    const hashedPassword = await hash(password, 10);

    await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        username,
      },
    });

    return NextResponse.json(
      {
        message: "User Successfully Signed up!",
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
