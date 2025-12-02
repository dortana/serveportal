'use client';
import React, { useActionState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { forgotPasswordAction } from '@/actions/auth';
import Image from 'next/image';
import BrandText from '../BrandText';

const ForgotPasswordForm = () => {
  const t = useTranslations();
  const router = useRouter();
  const [state, formAction, isPending] = useActionState(
    forgotPasswordAction,
    null,
  );
  useEffect(() => {
    if (state?.data?.email && !state.errors) {
      toast.success(t('Success'), {
        description: t('Please verify your email to complete login.'),
      });
      return router.replace(
        '/auth/verify-forgot?email=' + encodeURIComponent(state.data.email),
      );
    } else if (state?.errors) {
      toast.error(t('Error'), {
        description: t('Forgot password failed, please check your inputs.'),
      });
    }
  }, [state, router, t]);

  return (
    <Card className='border-0 shadow-none w-full md:w-2/3 sm:max-w-[440px]'>
      <CardHeader>
        <Link
          href='/'
          className='flex flex-col gap-2 items-center mx-auto mb-10'
        >
          <Image
            src='/app_logo.png'
            width={70}
            height={50}
            className='h-auto'
            alt='App Logo'
          />
          <BrandText />
        </Link>
        <CardTitle className='text-2xl'>{t('Forgot Password')}</CardTitle>
        <CardDescription>
          {t('Enter your email to reset your password.')}
        </CardDescription>
      </CardHeader>
      <form action={formAction}>
        <CardContent className='grid gap-6'>
          <div className='grid gap-4'>
            <div className='space-y-1'>
              <Label htmlFor='email'>{t('Email')}</Label>
              <Input
                id='email'
                placeholder={t('Email')}
                type='email'
                defaultValue={state?.data?.email}
                className={state?.errors?.email && 'border-red-500'}
                name='email'
              />
              {state?.errors?.email && (
                <p className='text-xs text-red-500 break-all'>
                  {Array.isArray(state.errors.email)
                    ? state.errors.email[0]
                    : state.errors.email}
                </p>
              )}
            </div>
          </div>
        </CardContent>

        <CardFooter>
          <Button className='w-full' isLoading={isPending}>
            {t('Continue')}
          </Button>
        </CardFooter>
      </form>
      <CardContent>
        <div className='text-sm flex items-center justify-center'>
          <span className='text-zinc-500'>{t("Don't have an account?")}</span>
          <Link href='/auth/signup' className='text-black font-semibold ml-1'>
            {t('Sign up now')}
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default ForgotPasswordForm;
