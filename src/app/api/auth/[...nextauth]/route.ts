import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { JWT } from "next-auth/jwt";
import { User as PrismaUser } from "@prisma/client";
import { Session, DefaultSession } from "next-auth";

const prisma = new PrismaClient();

// Extend the User, JWT and Session types to include custom fields
declare module "next-auth" {
  interface User {
    id: string;
    role: string;
  }

  interface Session extends DefaultSession {
    user: {
      id: string;
      role: string;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: string;
    id?: string;
  }
}

// For development only - test user
const TEST_USER = {
  id: "test-user-id",
  email: "test@example.com",
  name: "Test User",
  role: "ADMIN",
  hashedPassword: "$2a$10$7W3//5t/KGnbu/3CHZqQe.0A8YvaSlwm9i8R/scP5emKnCV32muai", // hashed 'password123' - fresh hash
};

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "CredentialsSignin",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          console.log('Missing credentials');
          return null;
        }

        console.log('Auth attempt with email:', credentials.email);

        try {
          // For development - check for test user first
          if (credentials.email === TEST_USER.email) {
            console.log('Test user login attempt');
            
            // Compare password directly without bcrypt for test user
            if (credentials.password === 'password123') {
              console.log('Test user authenticated successfully (direct comparison)');
              return {
                id: TEST_USER.id,
                email: TEST_USER.email,
                name: TEST_USER.name,
                role: TEST_USER.role,
              };
            }
            
            // If direct comparison fails, try bcrypt as fallback
            console.log('Trying bcrypt comparison for test user');
            const passwordMatch = await bcrypt.compare(
              credentials.password, 
              TEST_USER.hashedPassword
            );
            
            console.log('Test user password match:', passwordMatch);
            
            if (passwordMatch) {
              console.log('Test user authenticated successfully (bcrypt)');
              return {
                id: TEST_USER.id,
                email: TEST_USER.email,
                name: TEST_USER.name,
                role: TEST_USER.role,
              };
            } else {
              console.log('Test user password mismatch');
              return null;
            }
          }

          console.log('Looking up user in database:', credentials.email);
          const user = await prisma.user.findUnique({
            where: {
              email: credentials.email
            }
          });

          if (!user || !user?.hashedPassword) {
            console.log('User not found in database');
            return null;
          }

          console.log('Comparing passwords for database user');
          const passwordMatch = await bcrypt.compare(credentials.password, user.hashedPassword);

          if (!passwordMatch) {
            console.log('Password does not match for database user');
            return null;
          }

          console.log('Database user authentication successful');
          return {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
          };
        } catch (error) {
          console.error('Auth error:', error);
          return null;
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.role = token.role as string;
        session.user.id = token.id as string;
      }
      return session;
    }
  },
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: '/auth/signin',
  },
  secret: process.env.NEXTAUTH_SECRET || "development-secret-key",
  debug: process.env.NODE_ENV === 'development',
});

export { handler as GET, handler as POST };
