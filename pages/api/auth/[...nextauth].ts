import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import dbConnect from '@/app/utils/dbConnect';
import User, { IUser } from '@/app/models/User';
import bcrypt from 'bcryptjs';
import { Document } from 'mongoose';

const MAX_FAILED_ATTEMPTS = 3;
const LOCKOUT_DURATION = 15 * 60 * 1000; // 15 minutes

dbConnect();

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('No credentials provided');
        }

        const email = credentials.email.toLowerCase();
        const user: (Document<unknown, {}, IUser> & IUser) | null = await User.findOne({ email });

        if (!user) {
          console.log('User does not exist');
          throw new Error('User does not exist, please sign up.');
        }

        const now = new Date();
        if (user.lockoutUntil && user.lockoutUntil > now) {
          console.log('User is locked out until', user.lockoutUntil);
          throw new Error('Too many attempts, try again later.');
        }

        const isValid = await bcrypt.compare(credentials.password, user.password || '');

        if (!isValid) {
          user.failedLoginAttempts = (user.failedLoginAttempts || 0) + 1;
          console.log('Failed login attempts:', user.failedLoginAttempts);

          if (user.failedLoginAttempts >= MAX_FAILED_ATTEMPTS) {
            user.lockoutUntil = new Date(now.getTime() + LOCKOUT_DURATION);
            user.failedLoginAttempts = 0; // Reset after lockout
            console.log('User locked out until', user.lockoutUntil);
          }

          await user.save();
          throw new Error('Incorrect email or password');
        }

        user.failedLoginAttempts = 0;
        user.lockoutUntil = null;
        await user.save();

        return { id: user._id.toString(), email: user.email, role: user.role }; // Ensure the ID is returned as a string
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as 'user' | 'admin';
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
  },
  pages: {
    signIn: '/auth/signin',
  },
  secret: process.env.NEXTAUTH_SECRET!,
  session: {
    strategy: 'jwt',
  },
  debug: true,
});
