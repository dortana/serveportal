import { app_name } from '@/lib/data';
import { Metadata } from 'next';
import React from 'react';
import UploadPhoto from './UploadPhoto';
import { User } from '@/app/generated/prisma/client';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { auth } from '@/lib/auth';
import ProfileData from './ProfileData';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations();
  return {
    title: app_name + ' - ' + t('Profile'),
  };
}

const ProfilePage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const user = session?.user as unknown as User;
  if (!user) {
    return redirect('/auth/login');
  }
  return (
    <div className='p-4 rounded-lg h-full bg-white space-y-4'>
      <UploadPhoto user={user} />
      <ProfileData user={user} />
    </div>
  );
};

export default ProfilePage;
