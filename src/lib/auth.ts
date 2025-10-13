import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { PrismaClient } from '@prisma/client';
import { nextCookies } from 'better-auth/next-js';
import { emailOTP } from 'better-auth/plugins';
import { Resend } from 'resend';
import { VerifyEmailTemplate } from '@/components/emails/VerifyEmailTemplate';

const prisma = new PrismaClient();

export const auth = betterAuth({
  appName: 'RealIdea',
  database: prismaAdapter(prisma, {
    provider: 'mongodb',
  }),
  user: {
    additionalFields: {
      firstName: {
        type: 'string',
        required: true,
      },
      lastName: {
        type: 'string',
        required: true,
      },
    },
  },
  emailVerification: {
    autoSignInAfterVerification: true,
    sendOnSignIn: true,
  },
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    autoSignIn: false,
  },
  socialProviders: {
    google: {
      prompt: 'select_account',
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      display: 'popup',
      mapProfileToUser(profile) {
        return {
          email: profile.email,
          image: profile.picture,
          firstName: profile.given_name,
          lastName: profile.family_name,
          emailVerified: profile.email_verified,
        };
      },
    },
  },
  plugins: [
    nextCookies(),
    emailOTP({
      async sendVerificationOTP({ email, otp, type }) {
        const resend = new Resend(process.env.RESEND_API_KEY);
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
          throw new Error('User not found');
        }

        if (type === 'sign-in') {
          await resend.emails.send({
            from: 'RovixPro <onboarding@resend.dev>',
            to: [email],
            subject: 'OTP Verification',
            react: VerifyEmailTemplate({
              firstName: user.firstName,
              validationCode: otp,
            }),
          });
        } else if (type === 'email-verification') {
          await resend.emails.send({
            from: 'RovixPro <onboarding@resend.dev>',
            to: [email],
            subject: 'OTP Verification',
            react: VerifyEmailTemplate({
              firstName: user.firstName,
              validationCode: otp,
            }),
          });
        } else {
          await resend.emails.send({
            from: 'RovixPro <onboarding@resend.dev>',
            to: [email],
            subject: 'OTP Verification',
            react: VerifyEmailTemplate({
              firstName: user.firstName,
              validationCode: otp,
            }),
          });
        }
      },
      otpLength: 6,
      storeOTP: 'plain',
      overrideDefaultEmailVerification: true,
      disableSignUp: true,
    }),
  ],
});

export type Session = typeof auth.$Infer.Session;
export type UserType = typeof auth.$Infer.Session.user;
