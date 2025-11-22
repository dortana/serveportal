'use server';
import { cookies } from 'next/headers';

export const languageSetAction = async (lang: string) => {
  const cookieStore = await cookies();
  cookieStore.set('lang', lang);
};

export const languageGetAction = async () => {
  const cookieStore = await cookies();
  const lang = cookieStore.get('lang');
  return lang || { name: 'lang', value: 'en-US' };
};

export const citySetAction = async (city: string) => {
  const cookieStore = await cookies();
  cookieStore.set('city', city);
};

export const cityGetAction = async () => {
  const cookieStore = await cookies();
  const city = cookieStore.get('city');
  return city?.value || 'Budapest';
};

export const accountTypeSetAction = async (lang: string) => {
  const cookieStore = await cookies();
  cookieStore.set('accountType', lang);
};

export const accountTypeGetAction = async () => {
  const cookieStore = await cookies();
  return cookieStore.get('accountType')?.value as
    | 'customer'
    | 'expert'
    | undefined;
};
