'use server';

import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

import { auth } from '@/lib/auth';

export async function signUpAction(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const firstName = formData.get('firstName') as string;
  const lastName = formData.get('lastName') as string;

  await auth.api.signUpEmail({
    // @ts-ignore
    body: {
      email,
      password,
      firstName,
      lastName,
    },
  });

  redirect('/panel');
}

export async function signInAction(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  await auth.api.signInEmail({
    body: {
      email,
      password,
    },
  });

  redirect('/panel');
}

export async function signOutAction() {
  await auth.api.signOut({
    headers: await headers(),
  });

  redirect('/');
}
