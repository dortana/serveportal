'use client';
import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PhoneInput } from '@/components/ui/phone-input';
import { useTranslations } from 'next-intl';
// import { toast } from 'sonner';
// import { contactUsAction } from '@/actions/app';

const ContactUsForm = () => {
  const t = useTranslations();
  // const [state, formAction, isPending] = useActionState(
  //   contactUsAction,
  //   undefined,
  // );

  // useEffect(() => {
  //   if (state?.data?.email && !state.error) {
  //     toast.success(t('Success'), {
  //       description: t(
  //         'Your message has been sent successfully. We will get back to you shortly.',
  //       ),
  //     });
  //   } else if (state?.error) {
  //     toast.error(t('Error'), {
  //       description: t(
  //         'There was an error sending your message. Please check your inputs and try again.',
  //       ),
  //     });
  //   }
  // }, [state, t]);

  return (
    <Card className='border-0 shadow-none w-full m-auto pt-0'>
      <CardHeader className='max-md:px-0 pt-0 pr-0'>
        <CardTitle className='text-2xl'>{t("Let's Talk")}</CardTitle>
        <CardDescription>
          {t(
            'To request a quote our products, contact us directly or fill out the form below and we will get back to you shortly.',
          )}
        </CardDescription>
      </CardHeader>
      <form>
        <CardContent className='grid gap-6 max-md:px-0 pr-0'>
          <div className='grid gap-4'>
            <div className='space-y-1'>
              <Label htmlFor='name'>{t('Full Name')}</Label>
              <Input
                id='name'
                placeholder={t('Full Name')}
                type='text'
                name='full_name'
                // defaultValue={state?.data?.full_name || undefined}
                // className={state?.error?.full_name && 'border-red-500'}
              />
              {/* {state?.error?.full_name && (
                <p className='text-xs text-red-500 break-all'>{state.error.full_name}</p>
              )} */}
            </div>

            <div className='space-y-1'>
              <Label htmlFor='email'>{t('Email')}</Label>
              <Input
                id='email'
                placeholder={t('Email')}
                type='email'
                name='email'
                // defaultValue={state?.data?.email || undefined}
                // className={state?.error?.email && 'border-red-500'}
              />
              {/* {state?.error?.email && (
                <p className='text-xs text-red-500 break-all'>{state.error.email}</p>
              )} */}
            </div>

            <div className='space-y-1'>
              <Label htmlFor='phone'>{t('Phone')}</Label>
              <PhoneInput
                placeholder={t('Phone')}
                name='phone'
                // hasError={state?.error?.phone}
                // className={state?.error?.phone && 'border-red-500'}
                international
              />
              {/* {state?.error?.phone && (
                <p className='text-xs text-red-500 break-all'>{state.error.phone}</p>
              )} */}
            </div>
            <div className='space-y-1'>
              <Label htmlFor='subject'>{t('Subject')}</Label>
              <Input
                id='subject'
                placeholder={t('Subject')}
                type='text'
                name='subject'
                // defaultValue={state?.data?.subject || undefined}
                // className={state?.error?.subject && 'border-red-500'}
              />
              {/* {state?.error?.subject && (
                <p className='text-xs text-red-500 break-all'>{state.error.subject}</p>
              )} */}
            </div>

            <div className='space-y-1'>
              <Label htmlFor='comment'>{t('Comment')}</Label>
              <Textarea
                id='comment'
                placeholder={t('Type your message here.')}
                name='comment'
                // defaultValue={state?.data?.comment || undefined}
                // className={state?.error?.comment && 'border-red-500'}
              />
              {/* {state?.error?.comment && (
                <p className='text-xs text-red-500 break-all'>{state.error.comment}</p>
              )} */}
            </div>
          </div>
        </CardContent>
        <CardFooter className='max-md:px-0 pr-0'>
          <Button
            className='w-full flex items-center gap-2'
            type='submit'
            // isLoading={isPending}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 24 24'
              width='24'
              height='24'
              color='#ffffff'
              fill='none'
            >
              <path
                d='M22.3886 3.50934C22.9207 2.01947 21.4821 0.58092 19.9922 1.11301L2.24451 7.45149C0.477797 8.08246 0.630218 10.6298 2.45959 11.0455L9.59327 12.648L13.3909 8.73607C13.7756 8.3398 14.4087 8.33041 14.8049 8.7151C15.2012 9.09979 15.2106 9.73289 14.8259 10.1292L10.9106 14.1623L12.456 21.042C12.8718 22.8714 15.4191 23.0238 16.0501 21.2571L22.3886 3.50934Z'
                fill='#ffffff'
              ></path>
            </svg>
            {t('Send')}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default ContactUsForm;
