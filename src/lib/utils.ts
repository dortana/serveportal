'server only';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { NextResponse, NextRequest } from 'next/server';
import prisma from '@/lib/db';
import { validateToken } from '@/actions/admin';
import { UserRole } from '@/app/generated/prisma';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const apiBaseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const formatDateWithHour = (dateString: string): string => {
  const date = new Date(dateString);

  return (
    date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    }) +
    ' ' +
    date.toLocaleTimeString('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    })
  );
};

export const makePayloadReady = (formData: FormData) => {
  const payload: Record<string, any> = {};
  formData.forEach((value, key) => {
    if (!key.includes('$')) {
      payload[key] = value;
    }
  });
  return payload;
};

export const formatWithCommas = (n: number | string) => {
  return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const formatCurrency = (inputValue: string): string => {
  if (inputValue === '') return '';
  const cleanedValue = inputValue.replace(/[^\d.]/g, '');
  const [integerPart, decimalPart] = cleanedValue.split('.');
  const formattedIntegerPart = integerPart.replace(
    /\B(?=(\d{3})+(?!\d))/g,
    ',',
  );
  let formattedValue = formattedIntegerPart;
  if (decimalPart !== undefined) {
    const truncatedDecimalPart = decimalPart.slice(0, 2);
    formattedValue += '.' + truncatedDecimalPart;
  }
  if (formattedValue === '0') formattedValue = '0.00';
  return '€' + formattedValue;
};

export function formatCurrencyHuf(amount: number | string): string {
  const num = Number(amount);

  if (isNaN(num)) return '';

  const formatted = num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

  return `${formatted} HUF`;
}

export const generateFileName = (file: File) => {
  // Get extension from MIME type → jpg/jpeg/png
  const ext = file.type.split('/')[1] || 'bin';

  // Remove dashes to get a cleaner long hash
  const uuid = crypto.randomUUID().replace(/-/g, '');

  return `${uuid}.${ext}`;
};

export const authenticate = async (req: NextRequest, role: UserRole) => {
  const token = req.headers.get('authorization')?.split(' ')[1];

  if (!token) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const payload = await validateToken(token);

  if (!payload.sessionId) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  if (payload.role !== role) {
    console.log('AUTH FAILED: Role mismatch', payload.role, '≠', role);
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const user = await prisma.user.findUnique({
    where: { id: payload.id! as string },
  });

  if (!user) {
    return NextResponse.json({ error: 'Invalid token' }, { status: 400 });
  }

  return user;
};
