import { Button } from '@/components/ui/button';
import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'RealIdea - Home Page',
};

export default async function Home() {
  const t = await getTranslations();
  return (
    <div className='w-full h-screen flex items-center justify-center'>
      <Button asChild>
        <Link href='/panel'>{t('Go To Panel')}</Link>
      </Button>
    </div>
  );
}
