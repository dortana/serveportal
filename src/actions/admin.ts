'use server';

import { jwtVerify, createRemoteJWKSet } from 'jose';
import { apiBaseUrl, makePayloadReady } from '@/lib/utils';
import { User } from '@/app/generated/prisma/client';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { DataFilterType, PaginationType } from '@/types/app';
import { getTranslations } from 'next-intl/server';
import { z } from 'zod';

export const validateToken = async (token: string) => {
  try {
    const JWKS = createRemoteJWKSet(new URL(apiBaseUrl + '/api/auth/jwks'));
    const { payload } = await jwtVerify(token, JWKS, {
      issuer: apiBaseUrl, // Should match your JWT issuer, which is the BASE_URL
      audience: apiBaseUrl, // Should match your JWT audience, which is the BASE_URL by default
    });
    return payload;
  } catch (error) {
    console.error('Token validation failed:', error);
    throw error;
  }
};

export const getUsers = async (
  filterData: DataFilterType & {
    status?: string;
    role?: string;
  },
) => {
  const { page, limit, order, sort, search, status, role } = filterData;

  const searchParams = new URLSearchParams([
    ['page', page ?? '1'],
    ['limit', limit ?? '10'],
    ['order', order ?? 'desc'],
    ['sort', sort ?? 'createdAt'],
  ]);

  if (search && search?.trim()?.length > 2) {
    searchParams.append('search', search.trim());
  }

  if (status && status?.length > 0) {
    searchParams.append('status', status);
  }
  if (role && role?.length > 0) {
    searchParams.append('role', role);
  }

  try {
    const { token } = await auth.api.getToken({
      headers: await headers(),
    });
    if (!token) throw new Error('User not authenticated');

    const response = await fetch(
      `${apiBaseUrl}/api/admin/users?${searchParams.toString()}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    const result = await response.json();
    if (!response.ok) {
      return {
        error: result.error || 'Operation failed. Please try again.',
      };
    }
    return result.data as IUsersResponse;
  } catch (error: unknown) {
    return { error: (error as Error)?.message ?? 'An error occurred' };
  }
};

export interface IUsersResponse {
  users: User[];
  pagination: PaginationType;
}

export async function addUserAction(
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

    role: z
      .enum(['USER', 'ADMIN', 'EXPERT', 'EMPLOYEE'])
      .or(z.literal(''))
      .refine(v => v !== '', { message: t('Role is required') }),

    status: z
      .enum(['ACTIVE', 'BLOCKED', 'BANNED', 'DISABLED'])
      .or(z.literal(''))
      .refine(v => v !== '', { message: t('Status is required') }),

    country: z.string().nonempty(t('Country is required')),
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

  console.log(payload);
  return;
  try {
    const { token } = await auth.api.getToken({
      headers: await headers(),
    });
    if (!token) throw new Error('User not authenticated');

    const response = await fetch(`${apiBaseUrl}/api/admin/users`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const result = await response.json();
    if (!response.ok) {
      return {
        error: result.error || 'Operation failed. Please try again.',
      };
    }
    return { data: result.data as User };
  } catch (error: any) {
    console.error('Update profile data error:', error?.body?.message);
  }
}
