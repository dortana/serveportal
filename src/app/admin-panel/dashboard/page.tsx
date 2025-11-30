import AnimatedNumber from '@/components/AnimatedNumber';
import { app_name } from '@/lib/data';
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import VisitChart from '@/components/admin/VisitChart';
import { CitiesTable } from '@/components/admin/CitiesTable';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations();
  return {
    title: app_name + ' - ' + t('Dashboard'),
  };
}

const DashboardPage = async () => {
  const t = await getTranslations();
  return (
    <div className='rounded-lg h-full space-y-4'>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
        <div className='bg-white h-auto flex-1 rounded-lg p-5 space-y-4'>
          <h2 className='text-lg font-semibold'>{t('Total Users')}</h2>
          <div className='flex justify-between items-center'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 24 24'
              width='40'
              height='40'
              color='currentColor'
              fill='none'
            >
              <path
                opacity='0.4'
                d='M8.2499 10.5C8.2499 8.42893 9.92884 6.75 11.9999 6.75C14.071 6.75 15.7499 8.42893 15.7499 10.5C15.7499 12.0256 14.8388 13.3385 13.5311 13.9242C16.2049 14.5465 18.25 16.7615 18.25 19.499C18.25 19.9133 17.9142 20.249 17.5 20.249H6.5C6.08579 20.249 5.75 19.9133 5.75 19.499C5.75 16.7615 7.79507 14.5466 10.4688 13.9242C9.16099 13.3385 8.2499 12.0257 8.2499 10.5Z'
                fill='currentColor'
              />
              <path
                d='M7.4999 3.74805C5.42884 3.74805 3.7499 5.42698 3.7499 7.49805C3.7499 9.02371 4.66099 10.3366 5.96877 10.9222C3.29507 11.5447 1.25 13.7596 1.25 16.4971C1.25 16.9113 1.58579 17.2471 2 17.2471H4.62528C5.17244 15.6666 6.27833 14.3603 7.67909 13.4807C7.09348 12.6342 6.7499 11.6067 6.7499 10.498C6.7499 8.0732 8.39385 6.03231 10.628 5.42911C9.95662 4.41605 8.80627 3.74805 7.4999 3.74805Z'
                fill='currentColor'
              />
              <path
                d='M19.3747 17.2471C18.8276 15.6665 17.7216 14.3602 16.3208 13.4806C16.9064 12.6341 17.2499 11.6066 17.2499 10.498C17.2499 8.0732 15.606 6.03231 13.3718 5.42911C14.0432 4.41605 15.1936 3.74805 16.4999 3.74805C18.571 3.74805 20.2499 5.42698 20.2499 7.49805C20.2499 9.02368 19.3389 10.3365 18.0311 10.9222C20.7049 11.5446 22.75 13.7595 22.75 16.4971C22.75 16.9113 22.4142 17.2471 22 17.2471H19.3747Z'
                fill='currentColor'
              />
            </svg>
            <h2 className='text-xl lg:text-2xl font-bold'>
              <AnimatedNumber end={66464} separator=',' duration={2} />
            </h2>
          </div>
          <p className='text-muted-foreground text-xs'>
            {t('Sum of customers and experts')}
          </p>
        </div>
        <div className='bg-white h-auto flex-1 rounded-lg p-5 space-y-4'>
          <h2 className='text-lg font-semibold'>{t('Total Orders')}</h2>
          <div className='flex justify-between items-center'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 24 24'
              width='40'
              height='40'
              color='currentColor'
              fill='none'
            >
              <path
                opacity='0.4'
                d='M20.75 15.0579V15V11V10.9532C20.75 10.0524 20.75 9.30102 20.6699 8.70508C20.5855 8.07747 20.3997 7.51103 19.9443 7.05567C19.489 6.60031 18.9225 6.41451 18.2949 6.33008C17.699 6.24996 16.9475 6.24998 16.0467 6.25H16H8H7.95332C7.05246 6.24998 6.30103 6.24996 5.70508 6.33008C5.07747 6.41451 4.51103 6.60031 4.05567 7.05567C3.60031 7.51103 3.41451 8.07747 3.33008 8.70508C3.24996 9.30103 3.24998 10.0525 3.25 10.9533V11V15V15.0578C3.24998 16.6595 3.24996 17.9378 3.38477 18.9404C3.52409 19.9767 3.81999 20.8298 4.49512 21.5049C5.17025 22.18 6.02332 22.4759 7.05957 22.6152C8.06221 22.75 9.34052 22.75 10.9421 22.75H11H13H13.0579C14.6595 22.75 15.9378 22.75 16.9404 22.6152C17.9767 22.4759 18.8298 22.18 19.5049 21.5049C20.18 20.8298 20.4759 19.9767 20.6152 18.9404C20.75 17.9378 20.75 16.6595 20.75 15.0579Z'
                fill='currentColor'
              />
              <path
                d='M14.85 9.30263C14.85 7.60378 14.4529 5.98066 13.8443 4.81373C13.2037 3.58541 12.4988 3.14474 12 3.14474C11.5012 3.14474 10.7963 3.58541 10.1557 4.81373C9.54707 5.98066 9.15 7.60378 9.15 9.30263C9.15 9.82585 8.72467 10.25 8.2 10.25C7.67533 10.25 7.25 9.82585 7.25 9.30263C7.25 7.33906 7.70329 5.4095 8.46997 3.93945C9.20467 2.53078 10.4001 1.25 12 1.25C13.5999 1.25 14.7953 2.53078 15.53 3.93945C16.2967 5.4095 16.75 7.33906 16.75 9.30263C16.75 9.82585 16.3247 10.25 15.8 10.25C15.2753 10.25 14.85 9.82585 14.85 9.30263Z'
                fill='currentColor'
              />
            </svg>
            <h2 className='text-xl lg:text-2xl font-bold'>
              <AnimatedNumber end={21} separator=',' duration={2} />
            </h2>
          </div>
          <p className='text-muted-foreground text-xs'>
            {t('All completed orders')}
          </p>
        </div>
        <div className='bg-white h-auto flex-1 rounded-lg p-5 space-y-4'>
          <h2 className='text-lg font-semibold'>{t('Total Income')}</h2>
          <div className='flex justify-between items-center'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 24 24'
              width='40'
              height='40'
              color='#000000'
              fill='none'
            >
              <path
                opacity='0.4'
                d='M12.4724 14.99C11.9357 14.2489 11.0867 13.7418 10.0656 13.7418H8.8884C8.72611 13.7418 8.56107 13.7011 8.40513 13.6164L7.40609 13.0741C6.67311 11.8904 6.25 10.4946 6.25 9C6.25 4.71979 9.7198 1.25 14 1.25C18.2802 1.25 21.75 4.71979 21.75 9C21.75 10.9009 21.0656 12.6421 19.9298 13.9903C19.1282 13.3248 18.0482 13.0641 16.9868 13.4339L12.4724 14.99Z'
                fill='currentColor'
              ></path>
              <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M11.0192 7.22222C11.0192 5.43523 12.2554 3.75 14.0473 3.75C15.2178 3.75 16.1723 4.49518 16.6697 5.48159C16.8562 5.85144 16.7075 6.30245 16.3377 6.48895C15.9678 6.67545 15.5168 6.52681 15.3303 6.15696C15.0305 5.56227 14.5342 5.25 14.0473 5.25C13.323 5.25 12.5192 6.00233 12.5192 7.22222V7.25H14.2692C14.6834 7.25 15.0192 7.58579 15.0192 8C15.0192 8.41421 14.6834 8.75 14.2692 8.75H12.5192V8.77778C12.5192 9.99767 13.323 10.75 14.0473 10.75C14.5342 10.75 15.0305 10.4377 15.3303 9.84304C15.5168 9.47319 15.9678 9.32455 16.3377 9.51105C16.7075 9.69755 16.8562 10.1486 16.6697 10.5184C16.1723 11.5048 15.2178 12.25 14.0473 12.25C12.2554 12.25 11.0192 10.5648 11.0192 8.77778V8.75H10.5C10.0858 8.75 9.75 8.41421 9.75 8C9.75 7.58579 10.0858 7.25 10.5 7.25H11.0192V7.22222Z'
                fill='currentColor'
              ></path>
              <path
                d='M12.8249 16.1907L17.3963 14.615C18.1964 14.3353 19.0654 14.6648 19.5723 15.4523C19.8935 15.9513 19.7579 16.6621 19.3003 16.9583L10.815 22.4511C10.3419 22.7573 9.78523 22.8315 9.26637 22.6587L2.93218 20.55C2.52365 20.414 2.24805 20.0318 2.24805 19.6012V14.25C2.24805 13.6977 2.69576 13.25 3.24805 13.25H4.6696C4.95941 13.25 5.24489 13.3233 5.50335 13.4636L7.80879 14.715C8.14441 14.8972 8.51401 14.9918 8.8884 14.9918H10.0656C11.0079 14.9918 11.7662 15.7777 11.839 16.7584V16.8919L9.10967 17.7385C8.66466 17.8766 8.18821 17.8317 7.76802 17.6083L5.43804 16.1286C5.20493 15.9805 4.89595 16.0495 4.74791 16.2826C4.59987 16.5157 4.66883 16.8247 4.90193 16.9727L7.24724 18.4622C7.25688 18.4683 7.26672 18.4741 7.27675 18.4795C7.93444 18.8365 8.69524 18.9141 9.40594 18.6936L12.2747 17.8038C12.6656 17.6826 12.9084 17.3089 12.9084 16.9134C12.9084 16.6871 12.8855 16.4663 12.8419 16.2534C12.8375 16.2319 12.8318 16.211 12.8249 16.1907Z'
                fill='currentColor'
              ></path>
            </svg>
            <h2 className='text-xl lg:text-2xl font-bold'>
              <AnimatedNumber end={2655624} separator=' ' duration={2} />
              {' Ft'}
            </h2>
          </div>
          <p className='text-muted-foreground text-xs'>
            {t('Sum of all completed orders income')}
          </p>
        </div>
      </div>
      <div className='w-full flex gap-4 flex-wrap'>
        <div className='flex w-full md:flex-1 flex-col gap-6'>
          <Tabs defaultValue='account' className='h-full flex flex-col'>
            <TabsList className='bg-white w-full h-12'>
              <TabsTrigger
                value='account'
                className='flex-1 h-10 data-[state=active]:bg-brand-light data-[state=active]:text-white cursor-pointer'
              >
                {t('Experts Updates')}
              </TabsTrigger>

              <TabsTrigger
                value='password'
                className='flex-1 h-10 data-[state=active]:bg-brand-light data-[state=active]:text-white cursor-pointer'
              >
                {t('Customers Updates')}
              </TabsTrigger>
            </TabsList>
            <TabsContent value='account' className='flex-1'>
              <Card className='border-none shadow-none h-full'>
                <CardHeader>
                  <CardTitle>{t('Experts Updates')}</CardTitle>
                  <CardDescription>
                    {t('View expert statistics here')}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className='flex flex-col bg-tertiary w-full h-full rounded-md p-4 gap-3'>
                    <div className='flex items-center gap-2'>
                      <span className='text-zinc-500'>
                        {t('Total Experts')}
                      </span>
                      <div className='border-b-2 border-dashed flex-1'></div>
                      <AnimatedNumber end={36001} separator=',' duration={2} />
                    </div>
                    <div className='flex items-center gap-2'>
                      <span className='text-zinc-500'>{t('Joined Today')}</span>
                      <div className='border-b-2 border-dashed flex-1'></div>
                      <AnimatedNumber end={210} separator=',' duration={2} />
                    </div>
                    <div className='flex items-center gap-2'>
                      <span className='text-zinc-500'>
                        {t('Joined This Month')}
                      </span>
                      <div className='border-b-2 border-dashed flex-1'></div>
                      <AnimatedNumber end={6524} separator=',' duration={2} />
                    </div>

                    <div className='flex items-center gap-2'>
                      <span className='text-zinc-500'>
                        {t('Total Verified')}
                      </span>
                      <div className='border-b-2 border-dashed flex-1'></div>
                      <span className='text-green-500 font-semibold text-xl'>
                        <AnimatedNumber
                          end={12365}
                          separator=','
                          duration={2}
                        />
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value='password' className='flex-1'>
              <Card className='border-none shadow-none h-full'>
                <CardHeader>
                  <CardTitle>{t('Customers Updates')}</CardTitle>
                  <CardDescription>
                    {t('View customers statistics here')}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className='flex flex-col bg-tertiary w-full h-full rounded-md p-4 gap-3'>
                    <div className='flex items-center gap-2'>
                      <span className='text-zinc-500'>
                        {t('Total Customers')}
                      </span>
                      <div className='border-b-2 border-dashed flex-1'></div>
                      <AnimatedNumber end={36001} separator=',' duration={2} />
                    </div>
                    <div className='flex items-center gap-2'>
                      <span className='text-zinc-500'>{t('Joined Today')}</span>
                      <div className='border-b-2 border-dashed flex-1'></div>
                      <AnimatedNumber end={210} separator=',' duration={2} />
                    </div>
                    <div className='flex items-center gap-2'>
                      <span className='text-zinc-500'>
                        {t('Joined This Month')}
                      </span>
                      <div className='border-b-2 border-dashed flex-1'></div>
                      <AnimatedNumber end={6524} separator=',' duration={2} />
                    </div>

                    <div className='flex items-center gap-2'>
                      <span className='text-zinc-500'>
                        {t('Total Inactive')}
                      </span>
                      <div className='border-b-2 border-dashed flex-1'></div>
                      <span className='text-red-500 font-semibold text-xl'>
                        <AnimatedNumber end={6325} separator=',' duration={2} />
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
        <div className='flex w-full md:flex-1 flex-col gap-6'>
          <Card className='border-none shadow-none'>
            <CardHeader>
              <CardTitle>{t('Visits Statistics')}</CardTitle>
              <CardDescription>
                {t('Recent visit of the website')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <VisitChart />
            </CardContent>
          </Card>
        </div>
      </div>

      <div className='flex w-full flex-col gap-6'>
        <Card className='border-none shadow-none'>
          <CardHeader>
            <CardTitle>{t('Cities Statistics')}</CardTitle>
            <CardDescription>
              {t('Cities data for customers and experts')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <CitiesTable />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;
