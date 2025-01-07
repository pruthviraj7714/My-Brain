import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import prisma from "./db";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [GitHub],
  callbacks: {
    async signIn({
      user: { name, email, image },
      //@ts-ignore
      profile : { id, login } ,
    }) {
      const existingUser = await prisma.user.findFirst({
        where: {
          id,
        },
      });

      if(!existingUser) {
        await prisma.user.create({
          data: {
            username : login as string,
          },
        });
      }


      return true;
    },
  },
  //@ts-ignore
  async jwt({ token, account, profile }) {
    if (account && profile) {
      const user = await prisma.user.findFirst({
        where : {
          id : profile.id
        }
      })
  
      token.id = user?.id;
    }

    return token;
  },
  //@ts-ignore
  async session({ session, token }) {
    Object.assign(session, { id: token.id });
    return session;
  },
});
