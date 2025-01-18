import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import prisma from "./db";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [GitHub],
  callbacks: {
    //@ts-ignore
    async signIn({ user }) {
      const isUserExist = await prisma.user.findUnique({
        where: {
        username: user.name as string,
        },
      });
      
      
      if (!isUserExist) {
        await prisma.user.create({
          data: {
            username: user.name as string,
            photo: user.image,
          },
        });
      }

      return true;
    },
    //@ts-ignore
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    //@ts-ignore
    async session({ session, token }) {
      if (session && session.user) {
        session.user.id = token.id as string;
      }

      return session;
    },
  },
});
