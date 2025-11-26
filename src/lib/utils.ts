'server only';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

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
