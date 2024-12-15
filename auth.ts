import NextAuth, { User, type DefaultSession } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { JWT } from "next-auth/jwt";

import { getUserById } from "@/data/user";
import { db } from "./lib/db";
import authConfig from "@/auth.config";
import { UserRole } from "@prisma/client";
import { getTwoFactorConfirmationByUserId } from "./data/two-factor-confirmation";
import { get } from "http";
import { getAccountByUserId } from "./data/account";


declare module "next-auth" {
export interface Session {
    user: {
      role: UserRole,
      isTwoFactorEnabled: boolean,
      isOAuth: boolean,
    } & DefaultSession["user"]
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role: UserRole,
    isTwoFactorEnabled: boolean,
    isOAuth: boolean,
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
    async signIn({ user, account }) {

      // Allow OAuth without email verification
      if (account?.provider !== "credentials") return true;
      if (user.id) {
        const existingUser = await getUserById(user.id);

        // Prevent login if email is not verified
        if (!existingUser?.emailVerified) return false;

        if (existingUser.isTwoFactorEnabled) {
          const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(existingUser.id);
          if (!twoFactorConfirmation) return false;

          // Delete two factor confirmation for next sign in 
          await db.twoFactorConfirmation.delete({
            where: {
              id: twoFactorConfirmation.id,
            },
          });
        }
      }

      return true;
    },
    async session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (token.role && session.user) {
        session.user.role = token.role;
      }

      if (session.user) {
        session.user.name = token.name;
        session.user.email = token.email!;
        session.user.isOAuth = token.isOAuth;
        session.user.isTwoFactorEnabled = token.isTwoFactorEnabled;
      }

      return session;
    },



    async jwt({ token }) {

      if (!token?.sub) return token;
        const existingUser = await getUserById(token.sub);

      if (!existingUser) return token;
      const existingAccount = await getAccountByUserId(existingUser.id);

      token.isOAuth = !!existingAccount;
      token.name = existingUser.name;
      token.email = existingUser.email;
      token.role = existingUser.role;
      token.isTwoFactorEnabled = existingUser.isTwoFactorEnabled;

      return token; 
    },
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
});
