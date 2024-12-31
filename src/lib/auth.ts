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
    }),
  ],
  callbacks: {
    async signIn({ credentials }) {
      const existingUser = await prisma.user.findFirst({
        where: {
          email: credentials?.email as string,
        },
      });

      if (!existingUser) {
        return false;
      }

      const isPasswordValid = compare(
        existingUser.password,
        credentials?.password as string
      );

      if (!isPasswordValid) {
        return false;
      }

      return true;
    },
  },
  async jwt({ token, user }) {
    token.id = user?._id;

    return token;
  },
  async session({ session, token }) {
    Object.assign(session, { id: token.id });
    return session;
  },
  pages: {
    newUser: "/signup",
    signIn: "/login",
  },
});
