'use client';
import React, { useActionState, useEffect, useState } from 'react';
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
import { Checkbox } from '@/components/ui/checkbox';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';
import { signUpAction } from '@/actions/auth';
import { useRouter } from 'next/navigation';
import { authClient } from '@/lib/auth-client';
import Logo from '../Logo';
import { GoogleIcon } from '../icons/GoogleIcon';

const SignUpForm = () => {
  const t = useTranslations();
  const router = useRouter();
  const [privacyChecked, setPrivacyChecked] = useState(true);
  const [isloading, setIsLoading] = React.useState(false);
  const [state, formAction, isPending] = useActionState(signUpAction, null);

  useEffect(() => {
    if (state?.data?.email && !state.errors) {
      toast.success(t('Success'), {
        description: t('Please verify your email to complete signup.'),
      });
      router.replace(
        '/auth/verify?email=' + encodeURIComponent(state.data.email),
      );
    } else if (state?.errors) {
      toast.error(t('Error'), {
        description: t('Signup failed, please check your inputs.'),
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
        <Logo className='text-brand mx-auto mb-4' width={70} />
        <CardTitle className='text-2xl'>{t('Sign Up')}</CardTitle>
        <CardDescription>
          {t('Create your account to get started.')}
        </CardDescription>
      </CardHeader>
      <form
        action={formAction}
        onSubmit={e => {
          if (!privacyChecked) {
            e.preventDefault();
          }
        }}
      >
        <CardContent className='grid gap-6'>
          <div className='grid gap-4'>
            <div className='flex items-center gap-4 w-full'>
              <div className='flex-1 space-y-1'>
                <Label htmlFor='first_name'>{t('First Name')}</Label>
                <Input
                  id='firstName'
                  placeholder={t('First Name')}
                  name='firstName'
                  defaultValue={state?.data?.firstName}
                  className={state?.errors?.firstName && 'border-red-500'}
                />
                {state?.errors?.firstName?.[0] && (
                  <p className='text-xs text-red-500'>
                    {state.errors.firstName}
                  </p>
                )}
              </div>
              <div className='flex-1 space-y-1'>
                <Label htmlFor='lastName'>{t('Last Name')}</Label>
                <Input
                  id='lastName'
                  placeholder={t('Last Name')}
                  name='lastName'
                  defaultValue={state?.data?.lastName}
                  className={state?.errors?.lastName && 'border-red-500'}
                />
                {state?.errors?.lastName && (
                  <p className='text-xs text-red-500'>
                    {state.errors.lastName}
                  </p>
                )}
              </div>
            </div>

            <div className='space-y-1'>
              <Label htmlFor='email'>{t('Email')}</Label>
              <Input
                id='email'
                placeholder={t('Email')}
                name='email'
                defaultValue={state?.data?.email}
                className={state?.errors?.email && 'border-red-500'}
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
                className={state?.errors?.password && 'border-red-500'}
                type='password'
              />
              {state?.errors?.password && (
                <p className='text-xs text-red-500'>{state.errors.password}</p>
              )}
            </div>
          </div>
          <div className='flex items-center space-x-2'>
            <Checkbox
              id='privacy_terms'
              checked={privacyChecked}
              onCheckedChange={checked => setPrivacyChecked(!!checked)}
            />
            <label
              htmlFor='privacy_terms'
              className='text-sm text-zinc-500 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
            >
              {t.rich(
                'I accept the <guidelines>Terms of Use</guidelines> and <guidelines2>Privacy Policy</guidelines2>.',
                {
                  guidelines: chunks => (
                    <Link
                      href='/terms'
                      className='text-black font-bold underline'
                    >
                      {chunks}
                    </Link>
                  ),
                  guidelines2: chunks => (
                    <Link
                      href='/privacy'
                      className='text-black font-bold underline'
                    >
                      {chunks}
                    </Link>
                  ),
                },
              )}
            </label>
          </div>
          {!privacyChecked && (
            <p className='text-xs text-red-500 -mt-4'>
              {t('You must accept the terms and privacy policy.')}
            </p>
          )}
        </CardContent>
        <CardFooter>
          <Button className='w-full' type='submit' isLoading={isPending}>
            {t('Create Account')}
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
              {t('Or sign up with')}
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
        <div className='text-sm flex items-center justify-center mt-4'>
          <span className='text-zinc-500'>{t('Already have an account?')}</span>
          <Link href='/auth/login' className='text-black font-semibold ml-1'>
            {t('Log In')}
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default SignUpForm;
