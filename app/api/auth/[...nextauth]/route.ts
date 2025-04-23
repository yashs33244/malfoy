import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
import { comparePasswords } from "@/lib/auth";
import { sendSelcomWelcomeEmail } from "@/lib/email";

// Debug email configuration
console.log("Email configuration:", {
  host: process.env.EMAIL_SERVER_HOST,
  port: Number(process.env.EMAIL_SERVER_PORT),
  user: process.env.EMAIL_SERVER_USER?.substring(0, 5) + "...", // Log just the beginning for security
});

const logoUrl = `${process.env.NEXTAUTH_URL}/malfoy_logo.webp`;
const dashboardUrl = `${process.env.NEXTAUTH_URL}/`;

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      profile(profile) {
        console.log("Google profile:", JSON.stringify(profile, null, 2));
        return {
          id: profile.sub,
          name: profile.name || `${profile.given_name} ${profile.family_name}`,
          email: profile.email,
          image: profile.picture as string,
          role: "user",
        };
      },
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          const user = await prisma.user.findUnique({
            where: { email: credentials.email },
          });

          if (!user) {
            return null;
          }

          if (!user.password) {
            throw new Error("Account uses social login");
          }

          const isPasswordValid = await comparePasswords(
            credentials.password,
            user.password
          );

          if (!isPasswordValid) {
            return null;
          }

          return {
            id: user.id,
            email: user.email,
            name: user.name,
            image: user.image,
            role: user.role || "user",
          };
        } catch (error) {
          console.error("Auth error:", error);
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
    error: "/login",
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      console.log("Sign in callback: ", { provider: account?.provider, userId: user.id });
      
      // For Google sign-in
      if (account?.provider === "google" && profile && 'email' in profile) {
        // Type assertion for Google profile
        const googleProfile = profile as { 
          email: string, 
          name?: string, 
          picture?: string
        };
        
        const email = googleProfile.email;
        const name = googleProfile.name || '';
        const picture = googleProfile.picture;
        
        // Look up user by email or create a new one
        try {
          const existingUser = await prisma.user.findUnique({
            where: { email },
          });

          let isNewUser = false;

          if (!existingUser) {
            // Create new user for Google sign in
            isNewUser = true;
            const newUser = await prisma.user.create({
              data: {
                email,
                name,
                image: picture,
                // We need to set a password field since it's not nullable in schema
                // This is just a placeholder as the user will sign in through Google
                password: "GOOGLE_OAUTH_USER",
                role: "user",
              },
            });
            console.log("Created new user for Google sign in:", newUser.id);
          } else if (!existingUser.image && picture) {
            // Update user's image if not set but available from Google
            await prisma.user.update({
              where: { email },
              data: { image: picture },
            });
            console.log("Updated existing user's image from Google");
          }

          // Send welcome email for new Google users
          if (isNewUser && email && name) {
            console.log("Sending welcome email for new Google user");
            await sendSelcomWelcomeEmail(email, name);
          }

          return true;
        } catch (error) {
          console.error("Error during Google sign in:", error);
          return false;
        }
      } 
      // For credentials (email/password) sign-in
      else if (account?.provider === "credentials") {
        try {
          // Check if this is a new user (first time signing in)
          const emailVerifiedUpdate = await prisma.user.findUnique({
            where: { id: user.id },
            select: { emailVerified: true },
          });

          // If emailVerified is null, this is likely the first login
          if (!emailVerifiedUpdate?.emailVerified) {
            // Update emailVerified
            await prisma.user.update({
              where: { id: user.id },
              data: { emailVerified: new Date() },
            });

            // Send welcome email
            if (user.email && user.name) {
              console.log("Sending welcome email for new credentials user");
              await sendSelcomWelcomeEmail(user.email, user.name);
            }
          }
        } catch (error) {
          console.error("Error during credentials sign in handling:", error);
          // Don't block sign in for email failures
        }
      }
      
      return true;
    },
    async jwt({ token, user, account, profile }) {
      // Initial sign in
      if (account && profile) {
        console.log("JWT callback with account and profile for", account.provider);
        
        // For Google provider, ensure we're getting the image
        if (account.provider === "google" && 'picture' in profile) {
          token.picture = (profile as any).picture;
          console.log("Setting picture from Google profile:", token.picture);
        }
      }
      
      if (user) {
        console.log("JWT callback with user:", user.id);
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.picture = user.image;
        token.role = user.role || "user";
      }
      
      // If we don't have an image from the token but user has one, use it
      if (!token.picture && user?.image) {
        token.picture = user.image;
        console.log("Setting picture from user object:", token.picture);
      }
      
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        console.log("Session callback:", { tokenId: token.id });
        session.user.id = token.id as string;
        session.user.email = token.email as string;
        session.user.name = token.name as string;
        session.user.image = token.picture as string;
        session.user.role = (token.role as string) || "user";
        
        // Double-check if we need to fetch user data from database for avatar
        if (!session.user.image) {
          try {
            const dbUser = await prisma.user.findUnique({
              where: { id: session.user.id },
              select: { image: true },
            });
            
            if (dbUser?.image) {
              session.user.image = dbUser.image;
              console.log("Updated session user image from database");
            }
          } catch (error) {
            console.error("Error fetching user image from database:", error);
          }
        }
      }
      return session;
    },
  },
  debug: process.env.NODE_ENV === "development",
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST }; 