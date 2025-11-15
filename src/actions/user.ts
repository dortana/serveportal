'use server';

import { z } from 'zod';
import { getTranslations } from 'next-intl/server';
import { makePayloadReady } from '@/lib/utils';
import { User } from '@prisma/client';
import prisma from '@/lib/db';

export async function profileDataAction(
  prevState: any,
  formData: FormData,
): Promise<any> {
  const t = await getTranslations();
  const schema = z.object({
    firstName: z.string().nonempty(t('First name is required')),
    lastName: z.string().nonempty(t('Last name is required')),
    email: z.string().email(t('Invalid email format')),
    phone: z.string().optional(),
    dob: z.string().optional(),
    addressLine1: z.string().nonempty(t('Address is required')),
    city: z.string().nonempty(t('City is required')),
    postalCode: z.string().nonempty(t('Postal Code is required')),
    companyName: z.string().optional(),
    vatNumber: z.string().optional(),
  });

  const payload = makePayloadReady(formData);

  const result = schema.safeParse(payload);

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors;
    return { errors: errors, data: payload };
  }
  try {
    // udpate data here
    new Promise(resolve => setTimeout(resolve, 2000));
    const user = await prisma.user.findUnique({
      where: { email: payload.email },
    });
    return { data: user as unknown as User };
  } catch (error: any) {
    console.error('Update profile data error:', error?.body?.message);
  }
}
