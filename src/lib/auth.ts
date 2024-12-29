import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import prisma from "./db";
import { compare, hash } from "bcrypt";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {

        const isUserExists = await prisma.user.findFirst({
          where: {
            email: credentials?.email as string,
          },
        });

        if (!isUserExists) {
          throw new Error("No User Found with given Email.");
        }

        const isPasswordMatched = compare(
          credentials?.password as string,
          isUserExists.password
        );

        if (!isPasswordMatched) {
          throw new Error("Invalid credentials.");
        }

        return {
          id: isUserExists.id,
          email: isUserExists.email,
          name: isUserExists.name,
        };
      },
    }),
  ],
});
