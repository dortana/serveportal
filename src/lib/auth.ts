import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { PrismaClient, UserRole } from '@/app/generated/prisma/client';
import { nextCookies } from 'better-auth/next-js';
import { emailOTP } from 'better-auth/plugins';
import { Resend } from 'resend';
import { VerifyEmailTemplate } from '@/components/emails/VerifyEmailTemplate';
import { app_name } from './data';
import { accountTypeGetAction } from '@/actions/app';

const prisma = new PrismaClient();

export const auth = betterAuth({
  appName: app_name,
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
      phone: {
        type: 'string',
        required: false,
      },
      dob: {
        type: 'string',
        required: false,
      },
      address: {
        type: 'json',
        required: false,
      },
      companyName: {
        type: 'string',
        required: false,
      },
      vatNumber: {
        type: 'string',
        required: false,
      },
      role: {
        type: 'string',
        required: false,
      },
      status: {
        type: 'string',
        required: true,
      },
      onBoardingStatus: {
        type: 'string',
        required: true,
      },
      languagesSpoken: {
        type: 'string',
        required: true,
      },
      professions: {
        type: 'string',
        required: true,
      },
      docsUrls: {
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
      async mapProfileToUser(profile) {
        const accountType = await accountTypeGetAction();
        return {
          email: profile.email,
          image: profile.picture,
          firstName: profile.given_name,
          lastName: profile.family_name,
          emailVerified: profile.email_verified,
          ...(accountType && {
            role: accountType === 'customer' ? UserRole.USER : UserRole.EXPERT,
          }),
        };
      },
    },
    facebook: {
      clientId: process.env.FACEBOOK_CLIENT_ID as string,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET as string,
      async mapProfileToUser(profile) {
        const nameParts = (profile.name || '').split(' ');
        const accountType = await accountTypeGetAction();
        return {
          email: profile.email,
          image: profile.picture?.data?.url,
          firstName: nameParts[0] || '',
          lastName: nameParts[1] || '',
          emailVerified: profile.email_verified,
          ...(accountType && {
            role: accountType === 'customer' ? UserRole.USER : UserRole.EXPERT,
          }),
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
            from: app_name + ' <onboarding@resend.dev>',
            to: [email],
            subject: 'OTP Verification',
            react: VerifyEmailTemplate({
              firstName: user.firstName,
              validationCode: otp,
            }),
          });
        } else if (type === 'email-verification') {
          await resend.emails.send({
            from: app_name + ' <onboarding@resend.dev>',
            to: [email],
            subject: 'OTP Verification',
            react: VerifyEmailTemplate({
              firstName: user.firstName,
              validationCode: otp,
            }),
          });
        } else {
          await resend.emails.send({
            from: app_name + ' <onboarding@resend.dev>',
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
