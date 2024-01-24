import bcrypt from "bcryptjs";
import type { NextAuthConfig } from "next-auth";
import credentials from "next-auth/providers/credentials";

import { LoginSchema } from "@/schemas";
import { get } from "http";
import { getUserByEmail } from "@/data/user";

export default {
  providers: [credentials({
    async authorize(credentials) {
      const validatedFields = await LoginSchema.safeParse(credentials);

      // if (!validatedFields.success) {
      //   throw new Error("Invalid credentials");
      // }
      if (validatedFields.success) {
        const { email, password } = validatedFields.data;

        const user = await getUserByEmail(email);
        if (!user || !user.password) return null;

        const passwordsMatch = await bcrypt.compare(password, user.password);

        if (passwordsMatch) return user;
      }
      return null;
    }
  })
  ],
} satisfies NextAuthConfig;
