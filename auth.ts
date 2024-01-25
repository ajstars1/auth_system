import NextAuth, { type DefaultSession } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { JWT } from "next-auth/jwt";

import { getUserById } from "@/data/user";
import { db } from "./lib/db";
import authConfig from "@/auth.config";
import { UserRole } from "@prisma/client";


declare module "next-auth" {
  interface Session {
    user: {
      role: UserRole,
    } & DefaultSession["user"]
  }
}

declare module "next-auth/jwt" {
  interface JWT {
      role?: UserRole,
    } 
}


export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },
  events: {
    async linkAccount({ user }) {
      await db.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() },
      });
    }
  },

  callbacks: {
    async session({ session, token }) {
      // console.log({session, token});
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (token.role && session.user) {
        session.user.role = token.role;
      }
      return session;
    },




    async jwt({ token }) {
      if (!token?.sub) return token;
        const existingUser = await getUserById(token.sub);
      if (!existingUser) return token;

      token.role = existingUser.role;
      return token; 
    },
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
});
