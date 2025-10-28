// app/api/auth/[...nextauth]/route.ts (UPDATED)
import NextAuth, { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import type { JWT } from "next-auth/jwt";

const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials?.password) {
            throw new Error("Email and password required");
          }

          const user = await prisma.user.findUnique({
            where: { email: credentials.email },
          });

          if (!user) {
            throw new Error("User not found");
          }

          const isPasswordValid = await bcrypt.compare(
            credentials.password,
            user.password
          );

          if (!isPasswordValid) {
            throw new Error("Invalid password");
          }

          return {
            id: user.id,
            name: user.name,
            email: user.email,
          };
        } catch (error: any) {
          console.error("Auth error:", error.message);
          throw new Error(error.message || "Authentication failed");
        } finally {
          await prisma.$disconnect();
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin",
  },
  callbacks: {
    async jwt({ token, user, account }) {
      // Add user info to token on signin
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        // Set expiration time (30 days from now)
        token.exp = Math.floor(Date.now() / 1000) + 30 * 24 * 60 * 60;
      }
      return token;
    },
    async session({ session, token }) {
      // Add token data to session
      if (session.user) {
        session.user.id = token.id as string;
        session.user.name = token.name;
        session.user.email = token.email;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // Update session every 24 hours
  },
  jwt: {
    maxAge: 30 * 24 * 60 * 60, // 30 days
    secret: process.env.NEXTAUTH_SECRET,
  },
  events: {
    async signIn({ user }) {
      console.log(`✅ User signed in: ${user.email}`);
    },
    async signOut() {
      console.log("❌ User signed out");
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };