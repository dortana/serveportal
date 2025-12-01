'use server';

import { jwtVerify, createRemoteJWKSet } from 'jose';
import { apiBaseUrl } from '@/lib/utils';
import { User } from '@/app/generated/prisma/client';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { DataFilterType, PaginationType } from '@/types/app';

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
    action?: string;
    action_sub?: string;
  },
) => {
  const { page, limit, order, sort, search, status, action, action_sub } =
    filterData;

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

  if (action && action?.length > 0) {
    searchParams.append('action', action);
  }

  if (action_sub && action_sub?.length > 0) {
    searchParams.append('action_sub', action_sub);
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
