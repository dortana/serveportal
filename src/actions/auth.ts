'use server';

import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import { auth } from '@/lib/auth';
import { getTranslations } from 'next-intl/server';
import { makePayloadReady } from '@/lib/utils';
import { User } from '@prisma/client';
import { Resend } from 'resend';
import NewPasswordEmailTemplate from '@/components/emails/NewPasswordEmailTemplate';
import prisma from '@/lib/db';
import { app_name } from '@/lib/data';

interface UserWitPassword extends User {
  password: string;
  goToVerify?: boolean;
}

export async function expertSignUpAction(prevState: any, formData: FormData) {
  const t = await getTranslations();
  const schema = z.object({
    email: z
      .email({ message: t('Invalid email format') })
      .min(1, t('Email is required')),
    firstName: z
      .string()
      .min(2, t('First name must be at least 2 characters long')),
    lastName: z
      .string()
      .min(2, t('Last name must be at least 2 characters long')),
    password: z
      .string()
      .min(8, t('Password must be at least 8 characters long'))
      .max(20, t('Password must be at most 20 characters long')),
  });

  const payload = makePayloadReady(formData);

  const result = schema.safeParse(payload);

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors;
    return { errors: errors, data: payload };
  }

  try {
    // const data = await auth.api.signUpEmail({
    //   // @ts-ignore
    //   body: {
    //     ...payload,
    //   },
    // });
    console.log('result: ', result);
    return { data: payload as unknown as UserWitPassword };
  } catch (error: any) {
    if (error?.body?.message === 'User already exists. Use another email.') {
      delete payload.password;
      return {
        data: payload,
        errors: {
          email: t('User already exists. Use another email.'),
          firstName: undefined,
          lastName: undefined,
          password: undefined,
        },
      };
    } else {
      console.error('Sign up error:', error?.body?.message);
    }
  }
}

export async function signUpAction(prevState: any, formData: FormData) {
  const t = await getTranslations();
  const schema = z.object({
    accountType: z
      .string()
      .refine(val => val === 'customer' || val === 'expert', {
        message: t('Please select account type'),
      }),
    email: z
      .email({ message: t('Invalid email format') })
      .min(1, t('Email is required')),
    firstName: z
      .string()
      .min(2, t('First name must be at least 2 characters long')),
    lastName: z
      .string()
      .min(2, t('Last name must be at least 2 characters long')),
    password: z
      .string()
      .min(8, t('Password must be at least 8 characters long'))
      .max(20, t('Password must be at most 20 characters long')),
  });

  const payload = makePayloadReady(formData);

  const result = schema.safeParse(payload);

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors;
    return { errors: errors, data: payload };
  }

  try {
    const data = await auth.api.signUpEmail({
      // @ts-ignore
      body: {
        ...payload,
      },
    });

    return { data: data.user as unknown as UserWitPassword };
  } catch (error: any) {
    if (error?.body?.message === 'User already exists. Use another email.') {
      delete payload.password;
      return {
        data: payload,
        errors: {
          email: t('User already exists. Use another email.'),
          firstName: undefined,
          lastName: undefined,
          password: undefined,
        },
      };
    } else {
      console.error('Sign up error:', error?.body?.message);
    }
  }
}

export async function verifyAction(prevState: any, formData: FormData) {
  const t = await getTranslations();
  const schema = z.object({
    email: z
      .email({ message: t('Invalid email format') })
      .min(1, t('Email is required')),
    otp: z.string().length(6, t('OTP Code must be exactly 6 characters long')),
  });

  const payload = makePayloadReady(formData);

  const result = schema.safeParse(payload);

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors;
    return { errors: errors, data: payload };
  }
  try {
    const data = await auth.api.verifyEmailOTP({
      // @ts-ignore
      body: {
        ...payload,
      },
    });
    return { status: data.status };
  } catch (error: any) {
    if (error?.body?.message === 'otp expired') {
      return {
        errors: { otp: t('OTP Code has expired. Please request a new one.') },
      };
    } else if (error?.body?.message === 'Invalid OTP') {
      return { errors: { otp: t('Invalid OTP Code') } };
    } else {
      console.error('OTP verification error:', error?.body?.message);
    }
  }
}

export async function verifyForgotAction(prevState: any, formData: FormData) {
  const t = await getTranslations();
  const schema = z.object({
    email: z
      .email({ message: t('Invalid email format') })
      .min(1, t('Email is required')),
    otp: z.string().length(6, t('OTP Code must be exactly 6 characters long')),
  });

  const payload = makePayloadReady(formData);

  const result = schema.safeParse(payload);

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors;
    return { errors: errors, data: payload };
  }
  try {
    const newPassword = Array.from(crypto.getRandomValues(new Uint8Array(10)))
      .map(
        b =>
          'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'[
            b % 62
          ],
      )
      .join('');
    const data = await auth.api.resetPasswordEmailOTP({
      // @ts-ignore
      body: {
        ...payload,
        password: newPassword,
      },
    });
    const user = await prisma.user.findUnique({
      where: { email: payload.email },
    });
    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({
      from: app_name + ' <onboarding@resend.dev>',
      to: [payload.email],
      subject: 'New Password',
      react: NewPasswordEmailTemplate({
        // @ts-ignore
        firstName: user.firstName,
        password: newPassword,
      }),
    });
    return { status: data.success };
  } catch (error: any) {
    if (error?.body?.message === 'otp expired') {
      return {
        errors: { otp: t('OTP Code has expired. Please request a new one.') },
      };
    } else if (error?.body?.message === 'Invalid OTP') {
      return { errors: { otp: t('Invalid OTP Code') } };
    } else {
      console.error('OTP forgot verification error:', error?.body?.message);
    }
  }
}

export async function resendCodeAction(prevState: any, formData: FormData) {
  const t = await getTranslations();
  const schema = z.object({
    email: z
      .email({ message: t('Invalid email format') })
      .min(1, t('Email is required')),
  });

  const payload = makePayloadReady(formData);

  const result = schema.safeParse(payload);

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors;
    return { errors: errors, data: payload };
  }
  try {
    const data = await auth.api.sendVerificationEmail({
      // @ts-ignore
      body: {
        ...payload,
      },
    });
    return { status: data.status };
  } catch (error: any) {
    console.error('Resend OTP verification error:', error?.body?.message);
  }
}

export async function signInAction(prevState: any, formData: FormData) {
  const t = await getTranslations();
  const schema = z.object({
    email: z
      .email({ message: t('Invalid email format') })
      .min(1, t('Email is required')),
    password: z
      .string()
      .min(8, t('Password must be at least 8 characters long'))
      .max(20, t('Password must be at most 20 characters long')),
  });

  const payload = makePayloadReady(formData);

  const result = schema.safeParse(payload);

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors;
    return { errors: errors, data: payload };
  }
  try {
    const data = await auth.api.signInEmail({
      // @ts-ignore
      body: {
        ...payload,
      },
    });

    return { data: data.user as unknown as UserWitPassword };
  } catch (error: any) {
    if (error?.body?.message === 'Invalid email or password') {
      return { errors: { email: t('Invalid email or password') } };
    } else if (error?.body?.message === 'Email not verified') {
      payload.goToVerify = true;
      return { data: payload };
    } else {
      console.error('Login verification error:', error?.body?.message);
    }
  }
}

export async function signOutAction() {
  await auth.api.signOut({
    headers: await headers(),
  });
  redirect('/');
}

export async function forgotPasswordAction(prevState: any, formData: FormData) {
  const t = await getTranslations();
  const schema = z.object({
    email: z
      .email({ message: t('Invalid email format') })
      .min(1, t('Email is required')),
  });

  const payload = makePayloadReady(formData);

  const result = schema.safeParse(payload);

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors;
    return { errors: errors, data: payload };
  }

  try {
    const data = await auth.api.forgetPasswordEmailOTP({
      // @ts-ignore
      body: {
        ...payload,
      },
    });
    const obj = { email: payload.email, success: data.success };
    return { data: obj };
  } catch (error: any) {
    if (error?.body?.message === 'Invalid body parameters') {
      return { errors: { email: t('Invalid email address') } };
    } else {
      console.error(
        'Forgot password verification error:',
        error?.body?.message,
      );
    }
  }
}
