import NextAuth from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import CredentialsProvider from "next-auth/providers/credentials";

const prisma = new PrismaClient();

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      authorize: async (credentials): Promise<any> => {
        const user = await prisma.user.findUnique({
          where: { email: credentials?.email }
        });

        if ( credentials ) {
            if (user && bcrypt.compareSync(credentials.password, user.password)) {
                return { id: user.id, name: user.name, email: user.email };
            }
        }
        return null;
      }
    })
  ],
  session: {
    strategy: "jwt"
  },
  adapter: PrismaAdapter(prisma),
  secret: process.env.SECRET
});

export { handler as GET, handler as POST };
