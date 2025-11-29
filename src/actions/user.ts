'use server';

import { z } from 'zod';
import { getTranslations } from 'next-intl/server';
import { generateFileName, makePayloadReady } from '@/lib/utils';
import { ExpertiseDetails, User } from '@prisma/client';
import prisma from '@/lib/db';
import { isValidPhoneNumber } from 'libphonenumber-js';
import { PROFESSION_VALUES } from '@/lib/data';
import { uploadToSupabase } from './app';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';

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
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session?.session?.token) throw new Error('User not authenticated');
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

export async function onBoardingStep1Action(
  prevState: any,
  formData: FormData,
): Promise<any> {
  const t = await getTranslations();
  const schema = z.object({
    phone: z
      .string()
      .refine(
        value => !value || isValidPhoneNumber(value.replaceAll(' ', '')),
        {
          message: t('Invalid phone number'),
        },
      ),
    dob: z
      .string()
      .min(1, 'Date of birth is required')
      .transform(val => new Date(val))
      .refine(d => d.toString() !== 'Invalid Date', 'Invalid date')
      .refine(d => d < new Date(), 'Date cannot be in the future')
      .refine(d => {
        const today = new Date();
        const age = today.getFullYear() - d.getFullYear();

        const hasBirthdayPassed =
          today.getMonth() > d.getMonth() ||
          (today.getMonth() === d.getMonth() && today.getDate() >= d.getDate());

        return age > 18 || (age === 18 && hasBirthdayPassed);
      }, t('You must be at least 18 years old')),
  });

  const payload = makePayloadReady(formData);

  const result = schema.safeParse(payload);

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors;
    return { errors: errors, data: payload };
  }

  try {
    const session = await auth.api.getSession({ headers: await headers() });
    const user = session?.user;

    if (!user) throw new Error('User not authenticated');

    await prisma.user.update({
      where: { email: user.email },
      data: {
        phone: payload.phone.replaceAll(' ', ''),
        dob: payload.dob,
        onBoardingStatus: 'ADDRESS_INFO',
      },
    });

    return { data: payload };
  } catch (error: any) {
    console.error('Step 1 data error:', error?.body?.message);
  }
}

export async function onBoardingStep2Action(
  prevState: any,
  formData: FormData,
): Promise<any> {
  const t = await getTranslations();
  const schema = z.object({
    country: z
      .string()
      .length(2, t('Country must be a 2-letter ISO code'))
      .regex(/^[A-Za-z]{2}$/, t('Invalid ISO country code'))
      .transform(v => v.toUpperCase()),
    addressLine1: z.string().min(1, t('Address Line 1 is required')),
    addressLine2: z.string().optional(),
    state: z.string().min(1, t('State is required')),
    city: z.string().min(1, t('City is required')),
    postalCode: z.string().min(1, t('Postal code is required')),
  });

  const payload = makePayloadReady(formData);

  const result = schema.safeParse(payload);

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors;
    return { errors: errors, data: payload };
  }

  try {
    const session = await auth.api.getSession({ headers: await headers() });
    const user = session?.user;

    if (!user) throw new Error('User not authenticated');

    await prisma.user.update({
      where: { email: user.email },
      data: {
        address: {
          country: payload.country,
          addressLine1: payload.addressLine1,
          addressLine2: payload.addressLine2,
          state: payload.state,
          city: payload.city,
          postalCode: payload.postalCode,
        },
        onBoardingStatus: 'EXPERTISE_DETAILS',
      },
    });

    return { data: payload };
  } catch (error: any) {
    console.error('Step 2 data error:', error?.body?.message);
  }
}

export async function onBoardingProfessionAction(
  prevState: any,
  formData: FormData,
): Promise<any> {
  const t = await getTranslations();
  const schema = z.object({
    profession: z
      .string()
      .refine(val => PROFESSION_VALUES.includes(val as any), {
        message: t('Please select a valid profession'),
      }),
    professionDetails: z
      .string()
      .min(10, t('Please describe your profession in more detail')),
    yearsExperience: z.string().min(1, t('Years of experience is required')),
    availability: z.string().min(1, t('Availability is required')),
    pricePerHour: z
      .string()
      .min(1, t('Price per hour is required'))
      .regex(/^\d+$/, t('Enter a valid HUF amount')),
  });

  const payload = makePayloadReady(formData);
  const result = schema.safeParse(payload);

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors;
    return { errors: errors, data: payload };
  }

  try {
    return { data: payload };
  } catch (error: any) {
    console.error('Step 3 data error:', error?.body?.message);
  }
}

export async function onBoardingStep3Action(
  prevState: any,
  formData: FormData,
): Promise<any> {
  const t = await getTranslations();
  const schema = z.object({
    professions: z
      .array(
        z.object({
          profession: z
            .string()
            .refine(val => PROFESSION_VALUES.includes(val as any), {
              message: t('Please select a valid profession'),
            }),

          professionDetails: z
            .string()
            .min(10, t('Please describe your profession in more detail')),

          yearsExperience: z
            .string()
            .min(1, t('Years of experience is required')),

          availability: z.string().min(1, t('Availability is required')),

          pricePerHour: z.object({
            currency: z.literal('HUF'),
            amount: z
              .string()
              .min(1, t('Price per hour is required'))
              .regex(/^\d+$/, t('Enter a valid HUF amount')),
          }),
        }),
      )
      .min(1, t('Please add at least one profession')),
    languagesSpoken: z
      .string()
      .min(1, t('Please select at least one language')),
  });

  const payload = makePayloadReady(formData);

  if (typeof payload.professions === 'string') {
    try {
      payload.professions = JSON.parse(payload.professions);
    } catch (e) {
      return {
        errors: { professions: ['Invalid professions JSON'] },
        data: null,
      };
    }
  }

  const result = schema.safeParse(payload);

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors;
    return { errors: errors, data: payload };
  }

  try {
    const session = await auth.api.getSession({ headers: await headers() });
    const user = session?.user;

    if (!user) throw new Error('User not authenticated');

    await prisma.user.update({
      where: { email: user.email },
      data: {
        professions: payload.professions.map((p: ExpertiseDetails) => ({
          ...p,
          pricePerHour: {
            ...p.pricePerHour,
            amount: Number(p.pricePerHour.amount),
          },
        })),
        languagesSpoken: payload.languagesSpoken,
        onBoardingStatus: 'DOCUMENTS_UPLOAD',
      },
    });

    return { data: payload };
  } catch (error: any) {
    console.error('Step 3 data error:', error?.body?.message);
  }
}

export async function onBoardingStep4Action(
  prevState: any,
  formData: FormData,
): Promise<any> {
  const t = await getTranslations();

  const fileSchema = z
    .instanceof(File, { message: t('File is required') })
    .refine(f => f.size > 0, t('File is required'))
    .refine(f => f.size <= 10 * 1024 * 1024, t('Max file size is 10 MB'))
    .refine(f => f.type.startsWith('image/'), t('Only images allowed'));

  const schema = z.object({
    profilePhoto: fileSchema,
    idCardFront: fileSchema,
    idCardBack: fileSchema,
    addressCard: fileSchema,
  });

  const payload = {
    profilePhoto: formData.get('profilePhoto') as File,
    idCardFront: formData.get('idCardFront') as File,
    idCardBack: formData.get('idCardBack') as File,
    addressCard: formData.get('addressCard') as File,
  };

  const result = schema.safeParse(payload);

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors;

    const fileInfo = {
      profilePhoto: payload.profilePhoto
        ? {
            name: payload.profilePhoto.name,
            size: payload.profilePhoto.size,
            type: payload.profilePhoto.type,
          }
        : null,
      idCardFront: payload.idCardFront
        ? {
            name: payload.idCardFront.name,
            size: payload.idCardFront.size,
            type: payload.idCardFront.type,
          }
        : null,
      idCardBack: payload.idCardBack
        ? {
            name: payload.idCardBack.name,
            size: payload.idCardBack.size,
            type: payload.idCardBack.type,
          }
        : null,
      addressCard: payload.addressCard
        ? {
            name: payload.addressCard.name,
            size: payload.addressCard.size,
            type: payload.addressCard.type,
          }
        : null,
    };
    return { errors: errors, data: fileInfo };
  }

  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });
    const user = session?.user;

    if (!user) throw new Error('User not authenticated');

    const email = user.email;

    const emailFolder = email.replace(/[^a-zA-Z0-9._-]/g, '_');

    // Generate UUID filenames
    const profileFile = generateFileName(payload.profilePhoto);
    const frontFile = generateFileName(payload.idCardFront);
    const backFile = generateFileName(payload.idCardBack);
    const addrFile = generateFileName(payload.addressCard);

    const [profileUrl, frontUrl, backUrl, addrUrl] = await Promise.all([
      uploadToSupabase(
        payload.profilePhoto,
        `experts/${emailFolder}/${profileFile}`,
      ),
      uploadToSupabase(
        payload.idCardFront,
        `experts/${emailFolder}/${frontFile}`,
      ),
      uploadToSupabase(
        payload.idCardBack,
        `experts/${emailFolder}/${backFile}`,
      ),
      uploadToSupabase(
        payload.addressCard,
        `experts/${emailFolder}/${addrFile}`,
      ),
    ]);

    await prisma.user.update({
      where: { email },
      data: {
        docsUrls: {
          profilePhoto: profileUrl,
          idCardFront: frontUrl,
          idCardBack: backUrl,
          addressCard: addrUrl,
        },
        onBoardingStatus: 'UNDER_REVIEW',
      },
    });

    return {
      data: {
        success: true,
      },
    };
  } catch (error: any) {
    console.error('Step 4 data error:', error?.body?.message);
  }
}
