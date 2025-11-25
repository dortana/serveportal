'use server';

import { z } from 'zod';
import { getTranslations } from 'next-intl/server';
import { makePayloadReady } from '@/lib/utils';
import { User } from '@prisma/client';
import prisma from '@/lib/db';
import { isValidPhoneNumber } from 'libphonenumber-js';
import { PROFESSION_VALUES } from '@/lib/data';

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
      .refine(d => d < new Date(), 'Date cannot be in the future'),
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
    profession_details: z
      .string()
      .min(10, t('Please describe your profession in more detail')),
    years_experience: z.string().min(1, t('Years of experience is required')),
    availability: z.string().min(1, t('Availability is required')),
    price_per_hour: z.string().min(1, t('Price per hour is required')),
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

          profession_details: z
            .string()
            .min(10, t('Please describe your profession in more detail')),

          years_experience: z
            .string()
            .min(1, t('Years of experience is required')),

          availability: z.string().min(1, t('Availability is required')),

          price_per_hour: z.object({
            currency: z.literal('HUF'),
            amount: z.string().min(1, t('Price per hour is required')),
          }),
        }),
      )
      .min(1, t('Please add at least one profession')),
    languages_spoken: z
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
    return { data: payload };
  } catch (error: any) {
    console.error('Step 4 data error:', error?.body?.message);
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
    profile_photo: fileSchema,
    id_card_front: fileSchema,
    id_card_back: fileSchema,
    address_card: fileSchema,
  });

  const payload = {
    profile_photo: formData.get('profile_photo') as File,
    id_card_front: formData.get('id_card_front') as File,
    id_card_back: formData.get('id_card_back') as File,
    address_card: formData.get('address_card') as File,
  };

  console.log(payload);
  const result = schema.safeParse(payload);

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors;

    const fileInfo = {
      profile_photo: payload.profile_photo
        ? {
            name: payload.profile_photo.name,
            size: payload.profile_photo.size,
            type: payload.profile_photo.type,
          }
        : null,
      id_card_front: payload.id_card_front
        ? {
            name: payload.id_card_front.name,
            size: payload.id_card_front.size,
            type: payload.id_card_front.type,
          }
        : null,
      id_card_back: payload.id_card_back
        ? {
            name: payload.id_card_back.name,
            size: payload.id_card_back.size,
            type: payload.id_card_back.type,
          }
        : null,
      address_card: payload.address_card
        ? {
            name: payload.address_card.name,
            size: payload.address_card.size,
            type: payload.address_card.type,
          }
        : null,
    };
    return { errors: errors, data: fileInfo };
  }

  try {
    return { data: payload };
  } catch (error: any) {
    console.error('Step 4 data error:', error?.body?.message);
  }
}
