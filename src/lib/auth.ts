import NextAuth, { JWT, Session, User } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import prisma from "./db";
import { compare} from "bcryptjs";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {type : "username", label : "username"},
        password: {type : "password", label : "password"},
      },
    }),
  ],
  callbacks: {
    async signIn({ credentials }) {
      const existingUser = await prisma.user.findFirst({
        where: {
          username: credentials?.username as string,
        },
      });

      if (!existingUser) {
        return false;
      }

      const isPasswordValid = await compare(
        credentials?.password as string,
        existingUser.password
      );

      if (!isPasswordValid) {
        return false;
      }

      return true;
    },
  },
  //@ts-ignore
  async jwt({ token, user } : {token : JWT, user : User})  {
    token.id = user?.id as string;

    return token;
  },
  //@ts-ignore
  async session({ session, token } : { session : Session, token : JWT}) {
    Object.assign(session, { id: token.id });
    return session;
  },
  pages: {
    newUser: "/signup",
    signIn: "/login",
  },
});
