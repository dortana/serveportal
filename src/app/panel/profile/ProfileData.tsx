'use client';
import React, { useActionState, useEffect, useState } from 'react';
import { User } from '@/app/generated/prisma/client';
import { Button } from '@/components/ui/button';
import { useTranslations } from 'next-intl';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { PhoneInput } from '@/components/ui/phone-input';
import { toast } from 'sonner';
import { DatePicker } from '@/components/DatePicker';
import { CountryDropdown } from '@/components/ui/country-dropdown';
import { Switch } from '@/components/ui/switch';
import { profileDataAction } from '@/actions/user';

const ProfileData = ({ user }: { user: User }) => {
  const [isBusiness, setIsBusiness] = useState(false);
  const t = useTranslations();
  const [state, formAction, isPending] = useActionState(
    profileDataAction,
    null,
  );
  useEffect(() => {
    if (state?.data?.email && !state.errors) {
      toast.success(t('Success'), {
        description: t('Welcome back 👋'),
      });
    } else if (state?.errors) {
      toast.error(t('Error'), {
        description: t('Login failed, please check your inputs.'),
      });
    }
  }, [state, t]);
  return (
    <Card className='w-full'>
      <CardHeader>
        <CardTitle>{t('Profile Information')}</CardTitle>
        <CardDescription>
          {t('Manage and update your personal profile information.')}
        </CardDescription>
      </CardHeader>
      <form action={formAction}>
        <CardContent className='grid gap-6'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div className='space-y-1'>
              <Label htmlFor='firstName'>{t('First Name')}</Label>
              <Input
                id='firstName'
                placeholder={t('First Name')}
                name='firstName'
                defaultValue={state?.data?.firstName ?? user.firstName}
                className={state?.errors?.firstName && 'border-red-500'}
              />
              {state?.errors?.firstName?.[0] && (
                <p className='text-xs text-red-500'>{state.errors.firstName}</p>
              )}
            </div>
            <div className='space-y-1'>
              <Label htmlFor='lastName'>{t('Last Name')}</Label>
              <Input
                id='lastName'
                placeholder={t('Last Name')}
                name='lastName'
                defaultValue={state?.data?.lastName ?? user.lastName}
                className={state?.errors?.lastName && 'border-red-500'}
              />
              {state?.errors?.lastName?.[0] && (
                <p className='text-xs text-red-500'>{state.errors.lastName}</p>
              )}
            </div>

            <div className='space-y-1'>
              <Label htmlFor='email'>{t('Email')}</Label>
              <Input
                id='email'
                placeholder={t('Email')}
                type='email'
                defaultValue={state?.data?.email ?? user.email}
                className={state?.errors?.email && 'border-red-500'}
                // readOnly
                // disabled
                name='email'
              />
            </div>

            <div className='space-y-1'>
              <Label htmlFor='phone'>{t('Phone')}</Label>
              <PhoneInput
                id='phone'
                placeholder={t('Phone')}
                name='phone'
                defaultValue={state?.data?.phone ?? user.phone}
                // hasError={state?.errors?.phone}
                className={state?.errors?.phone && 'border-red-500'}
                defaultCountry='HU'
                international
              />
              {state?.errors?.phone?.[0] && (
                <p className='text-xs text-red-500'>{state.errors.phone}</p>
              )}
            </div>

            <div className='space-y-1'>
              <Label htmlFor='dob'>{t('Date Of Birth')}</Label>
              {/* <Input
                id='dob'
                placeholder={t('YYYY-MM-DD')}
                name='dob'
                defaultValue={state?.data?.dob ?? user.dob}
                className={state?.errors?.dob && 'border-red-500'}
              /> */}
              <DatePicker name='dob' />
              {state?.errors?.dob?.[0] && (
                <p className='text-xs text-red-500'>{state.errors.dob}</p>
              )}
            </div>

            <div className='space-y-1'>
              <Label htmlFor='lastName'>{t('Country')}</Label>
              <CountryDropdown
                placeholder={t('Select country')}
                defaultValue='HU'
              />
              {state?.errors?.lastName?.[0] && (
                <p className='text-xs text-red-500'>{state.errors.lastName}</p>
              )}
            </div>

            <div className='space-y-1'>
              <Label htmlFor='addressLine1'>{t('Address Line 1')}</Label>
              <Input
                id='addressLine1'
                placeholder={t('Address Line 1')}
                name='addressLine1'
                defaultValue={
                  state?.data?.addressLine1 ?? user.address?.addressLine1
                }
                className={state?.errors?.addressLine1 && 'border-red-500'}
              />
              {state?.errors?.addressLine1?.[0] && (
                <p className='text-xs text-red-500'>
                  {state.errors.addressLine1}
                </p>
              )}
            </div>

            <div className='space-y-1'>
              <Label htmlFor='addressLine2'>{t('Address Line 2')}</Label>
              <Input
                id='addressLine2'
                placeholder={t('Address Line 2')}
                name='addressLine2'
                defaultValue={
                  state?.data?.addressLine2 ?? user.address?.addressLine2
                }
                className={state?.errors?.addressLine2 && 'border-red-500'}
              />
              {state?.errors?.addressLine2?.[0] && (
                <p className='text-xs text-red-500'>
                  {state.errors.addressLine2}
                </p>
              )}
            </div>
            <div className='space-y-1'>
              <Label htmlFor='state'>{t('State')}</Label>
              <Input
                id='state'
                placeholder={t('State')}
                name='state'
                defaultValue={state?.data?.state ?? user.address?.state}
                className={state?.errors?.state && 'border-red-500'}
              />
              {state?.errors?.state?.[0] && (
                <p className='text-xs text-red-500'>{state.errors.state}</p>
              )}
            </div>
            <div className='space-y-1'>
              <Label htmlFor='city'>{t('City')}</Label>
              <Input
                id='city'
                placeholder={t('City')}
                name='city'
                defaultValue={state?.data?.city ?? user.address?.city}
                className={state?.errors?.city && 'border-red-500'}
              />
              {state?.errors?.city?.[0] && (
                <p className='text-xs text-red-500'>{state.errors.city}</p>
              )}
            </div>

            <div className='space-y-1'>
              <Label htmlFor='postalCode'>{t('Postal Code')}</Label>
              <Input
                id='postalCode'
                placeholder={t('Postal Code')}
                name='postalCode'
                defaultValue={
                  state?.data?.postalCode ?? user.address?.postalCode
                }
                className={state?.errors?.postalCode && 'border-red-500'}
              />
              {state?.errors?.postalCode?.[0] && (
                <p className='text-xs text-red-500'>
                  {state.errors.postalCode}
                </p>
              )}
            </div>
          </div>
          <div>
            <div className='flex items-center space-x-2'>
              <Switch
                id='airplane-mode'
                checked={isBusiness}
                onCheckedChange={setIsBusiness}
              />
              <Label htmlFor='airplane-mode'>Are you a business?</Label>
            </div>
            {isBusiness && (
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-4'>
                <div className='space-y-1'>
                  <Label htmlFor='companyName'>{t('Company Name')}</Label>
                  <Input
                    id='companyName'
                    placeholder={t('Company Name')}
                    name='companyName'
                    defaultValue={state?.data?.companyName ?? user.companyName}
                    className={state?.errors?.companyName && 'border-red-500'}
                  />
                  {state?.errors?.companyName?.[0] && (
                    <p className='text-xs text-red-500'>
                      {state.errors.companyName}
                    </p>
                  )}
                </div>
                <div className='space-y-1'>
                  <Label htmlFor='vatNumber'>{t('VAT Number')}</Label>
                  <Input
                    id='vatNumber'
                    placeholder={t('VAT Number')}
                    name='vatNumber'
                    defaultValue={state?.data?.vatNumber ?? user.vatNumber}
                    className={state?.errors?.vatNumber && 'border-red-500'}
                  />
                  {state?.errors?.vatNumber?.[0] && (
                    <p className='text-xs text-red-500'>
                      {state.errors.vatNumber}
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        </CardContent>

        <CardFooter>
          <Button className='ml-auto' isLoading={isPending}>
            {t('Update Profile')}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default ProfileData;
