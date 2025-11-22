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
import SocialLogin from '../SocialLogin';
import { cn } from '@/lib/utils';
import EyeIcon from '../icons/EyeIcon';
import EyeSlashIcon from '../icons/EyeSlashIcon';
import Image from 'next/image';
import BrandText from '../BrandText';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import PermanentJobIcon from '../icons/PermanentJobIcon';
import { useSearchParams } from 'next/navigation';
const SignUpForm = () => {
  const t = useTranslations();
  const router = useRouter();
  const [privacyChecked, setPrivacyChecked] = useState(true);
  const [state, formAction, isPending] = useActionState(signUpAction, null);
  const [showPassword, setShowPassword] = React.useState(false);
  const searchParams = useSearchParams();
  const accountType = searchParams.get('accountType') || 'customer';

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
            <div className='flex-1 space-y-1'>
              <Label htmlFor='first_name'>{t('Account Type')}</Label>

              <RadioGroup
                className='w-full justify-items-center grid-cols-2'
                name='accountType'
                defaultValue={accountType}
                onValueChange={r => {
                  router.push('?accountType=' + r);
                }}
              >
                {/* CUSTOMER CARD */}
                <Label
                  htmlFor='customer'
                  className='border-input has-[&:has(input[data-state=checked])]:border-primary/50 relative flex w-full flex-col items-center gap-3 rounded-md border p-2 shadow-xs cursor-pointer'
                >
                  <RadioGroupItem
                    value='customer'
                    id='customer'
                    className='order-1 size-4 absolute left-2 top-2 [&_svg]:size-2.5'
                  />

                  <div className='grid grow justify-items-center gap-2'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      viewBox='0 0 24 24'
                      width='24'
                      height='24'
                      color='currentColor'
                      fill='none'
                    >
                      <path
                        opacity='0.4'
                        d='M7.37859 14.3122C8.86094 13.6364 10.6214 13.25 12.5 13.25C14.3786 13.25 16.1391 13.6364 17.6214 14.3122C19.0996 14.986 19.75 16.5343 19.75 17.9704C19.7501 18.4032 19.7501 18.8744 19.7067 19.1972C19.6589 19.5527 19.5465 19.9284 19.2374 20.2374C18.9284 20.5465 18.5527 20.6589 18.1972 20.7067C17.8744 20.7501 17.4776 20.7501 17.0448 20.75H17.0448H7.95526H7.95525C7.52244 20.7501 7.12561 20.7501 6.8028 20.7067C6.44732 20.6589 6.07159 20.5465 5.76257 20.2374C5.45355 19.9284 5.3411 19.5527 5.29331 19.1972C5.24991 18.8744 5.24996 18.4032 5.25001 17.9704C5.25001 16.5343 5.9004 14.986 7.37859 14.3122Z'
                        fill='#141B34'
                      />
                      <path
                        d='M8.25 7.5C8.25 5.15279 10.1528 3.25 12.5 3.25C14.8472 3.25 16.75 5.15279 16.75 7.5C16.75 9.84721 14.8472 11.75 12.5 11.75C10.1528 11.75 8.25 9.84721 8.25 7.5Z'
                        fill='#141B34'
                      />
                    </svg>

                    <span className='text-xs'>{t('Customer')}</span>
                  </div>
                </Label>

                {/* EXPERT CARD */}
                <Label
                  htmlFor='expert'
                  className='border-input has-[&:has(input[data-state=checked])]:border-primary/50 relative flex w-full flex-col items-center gap-3 rounded-md border p-2 shadow-xs cursor-pointer'
                >
                  <RadioGroupItem
                    value='expert'
                    id='expert'
                    className='order-1 size-4 absolute left-2 top-2 [&_svg]:size-2.5'
                  />

                  <div className='grid grow justify-items-center gap-2'>
                    <PermanentJobIcon />
                    <span className='text-xs'>{t('Service Provider')}</span>
                  </div>
                </Label>
              </RadioGroup>
            </div>

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

            <div className='space-y-1 relative'>
              <Label htmlFor='password'>{t('Password')}</Label>
              <Input
                id='password'
                placeholder={t('Password')}
                name='password'
                defaultValue={state?.data?.password}
                className={cn(
                  'pr-10',
                  state?.errors?.password && 'border-red-500',
                )}
                type={showPassword ? 'text' : 'password'}
              />
              <div
                className='cursor-pointer absolute right-3 top-8'
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeIcon /> : <EyeSlashIcon />}
              </div>
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
        <div className='text-xs text-zinc-800 mb-2 text-center'>
          {t('As: ')}
          <span className='font-medium'>
            {accountType === 'expert' ? t('Service Provider') : t('Customer')}
          </span>
        </div>
        <SocialLogin accountType={accountType as 'expert' | 'customer'} />
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
