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
