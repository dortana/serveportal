import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';

export const metadata: Metadata = {
  title: 'ServePortal - Home Page',
};

export default async function Home() {
  const t = await getTranslations();
  return (
    <main>
      <SiteHeader />
      <div className='w-full flex h-[50vh] items-center justify-center'>
        {t('Home Page')}
      </div>
      <SiteFooter />
    </main>
  );
}
