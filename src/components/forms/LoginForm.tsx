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
import Logo from '../Logo';
import { toast } from 'sonner';
import { signInAction } from '@/actions/auth';
import { GoogleIcon } from '../icons/GoogleIcon';
import { authClient } from '@/lib/auth-client';

const LoginForm = () => {
  const t = useTranslations();
  const router = useRouter();
  const [isloading, setIsLoading] = React.useState(false);
  const [state, formAction, isPending] = useActionState(signInAction, null);
  useEffect(() => {
    if (state?.data?.email && !state.errors) {
      if (state?.data?.goToVerify) {
        toast.success(t('Success'), {
          description: t('Please verify your email to complete login.'),
        });
        return router.replace(
          '/auth/verify?email=' + encodeURIComponent(state.data.email),
        );
      } else {
        toast.success(t('Success'), {
          description: t('Welcome back 👋'),
        });
        return router.replace('/panel/dashboard');
      }
    } else if (state?.errors) {
      toast.error(t('Error'), {
        description: t('Login failed, please check your inputs.'),
      });
    }
  }, [state, router, t]);

  const signInWithGoogle = async () => {
    setIsLoading(true);
    await authClient.signIn.social({
      provider: 'google',
      callbackURL: '/panel/dashboard',
    });
    setIsLoading(false);
  };

  return (
    <Card className='border-0 shadow-none w-full md:w-2/3 sm:max-w-[440px]'>
      <CardHeader>
        <Logo className='text-brand mx-auto mb-4 max-md:hidden' width={70} />
        <CardTitle className='text-2xl'>{t('Login')}</CardTitle>
        <CardDescription>
          {t('Access your account by signing in.')}
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
                <p className='text-xs text-red-500'>
                  {Array.isArray(state.errors.email)
                    ? state.errors.email[0]
                    : state.errors.email}
                </p>
              )}
            </div>
            <div className='space-y-1'>
              <Label htmlFor='password'>{t('Password')}</Label>
              <Input
                id='password'
                placeholder={t('Password')}
                name='password'
                defaultValue={state?.data?.password}
                type='password'
              />
            </div>
            <div className='text-sm -mt-2 flex justify-end'>
              <Link
                href='/auth/forgot-password'
                className='text-black font-semibold ml-1'
              >
                {t('Forgot password?')}
              </Link>
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
        <div className='relative mb-6'>
          <div className='absolute inset-0 flex items-center'>
            <span className='w-full border-t' />
          </div>
          <div className='relative flex justify-center text-xs uppercase'>
            <span className='bg-white px-2 text-zinc-500'>
              {t('Or continue with')}
            </span>
          </div>
        </div>
        <div className='grid grid-cols-1'>
          <Button
            variant='outline'
            onClick={signInWithGoogle}
            isLoading={isloading}
          >
            <GoogleIcon />
            Google
          </Button>
        </div>
        <div className='text-sm mt-4 flex items-center justify-center'>
          <span className='text-zinc-500'>{t("Don't have an account?")}</span>
          <Link href='/auth/signup' className='text-black font-semibold ml-1'>
            {t('Sign up now')}
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default LoginForm;
