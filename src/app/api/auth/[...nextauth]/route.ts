import NextAuth from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import bcrypt from "bcrypt";
import CredentialsProvider from "next-auth/providers/credentials";
import { db } from "@/db";

interface CustomUser {
  id: string;
  username: string;
}

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      authorize: async (credentials): Promise<CustomUser | null> => {
        if (!credentials) return null;

        const user = await db.user.findUnique({
          where: { username: credentials.username }
        });

        if (!user) return null;

        const isPasswordValid = process.env.DISABLE_PASSWORD_HASHING
          ? credentials.password === user.password
          : bcrypt.compareSync(credentials.password, user.password);

        if (!isPasswordValid) return null;

        return { id: user.id, username: user.username };
      }
    })
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60 // 30 days
  },
  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        token.id = user.id;
        token.username = user.username;
      }
      return token;
    },
    async session({ session, token }: any) {
      if (token) {
        session.user = {
          id: token.id,
          username: token.username
        };
      }
      return session;
    }
  },
  adapter: PrismaAdapter(db),
  secret: process.env.NEXTAUTH_SECRET
};

const handler = NextAuth(authOptions as any);

export { handler as GET, handler as POST };
