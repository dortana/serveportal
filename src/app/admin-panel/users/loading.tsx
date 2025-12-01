import { getTranslations } from 'next-intl/server';
import { CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export default async function Loading() {
  const t = await getTranslations();
  return (
    <div className='p-4 rounded-lg h-full bg-white'>
      <CardHeader className='px-0 pt-1'>
        <CardTitle>{t('Users Data')}</CardTitle>
        <CardDescription>
          {t(
            'You can view all your users data here. Use the filters to narrow down your search.',
          )}
        </CardDescription>
      </CardHeader>
      <br />
      <div className='flex items-center space-x-4'>
        <Skeleton className='h-10 rounded-md w-full md:w-96' />
        <Skeleton className='h-10 w-42 rounded-md hidden md:block' />
      </div>
      <div className='space-y-4 mt-8'>
        {Array.from({ length: 10 }).map((_, index) => (
          <div key={index} className='flex items-center space-x-4'>
            <Skeleton className='min-h-12 min-w-12 rounded-full' />
            <div className='space-y-2  w-full md:w-fit'>
              <Skeleton className='h-4 w-full md:w-[250px]' />
              <Skeleton className='h-4 w-[180px]' />
            </div>
            <Skeleton className='h-12 flex-1 hidden md:flex' />
          </div>
        ))}
      </div>
    </div>
  );
}
