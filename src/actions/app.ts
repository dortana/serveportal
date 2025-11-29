'use server';
import { cookies } from 'next/headers';
import { createSupabaseClient } from '@/lib/supabase';

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

export async function uploadToSupabase(
  file: File,
  path: string,
  bucketName = 'ServePortal',
) {
  const supabase = createSupabaseClient();

  // Convert file → Buffer
  const buffer = Buffer.from(await file.arrayBuffer());

  const { error } = await supabase.storage
    .from(bucketName)
    .upload(path, buffer, {
      contentType: file.type,
      upsert: true,
    });

  if (error) {
    console.error('Upload error:', error);
    throw new Error(error.message);
  }

  const { data: publicUrl } = supabase.storage
    .from(bucketName)
    .getPublicUrl(path);

  return publicUrl.publicUrl;
}
