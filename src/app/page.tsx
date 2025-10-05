import { Button } from '@/components/ui/button';
import { getTranslations } from 'next-intl/server';
import Link from 'next/link';

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
