'use client';
import React, { useActionState, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { useTranslations } from 'next-intl';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useRolesIcon, useStatusesIcon } from './icon-renderer';
import PlusIcon from '@/components/icons/PlusIcon';
import { PhoneInput } from '@/components/ui/phone-input';
import { toast } from 'sonner';
import { DatePicker } from '@/components/DatePicker';
import { CountryDropdown } from '@/components/ui/country-dropdown';
import { Switch } from '@/components/ui/switch';
import { addUserAction } from '@/actions/admin';
import { cn } from '@/lib/utils';

const AddUser = () => {
  const t = useTranslations();
  const rolesIcon = useRolesIcon();
  const statusesIcon = useStatusesIcon();

  const [isBusiness, setIsBusiness] = useState(false);
  const [state, formAction, isPending] = useActionState(addUserAction, null);
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
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button variant='outline' size='sm' className='h-10'>
            <PlusIcon className='stroke-2' />
            {t('Add New User')}
          </Button>
        </DialogTrigger>

        <DialogContent className='grid gap-6 min-w-full md:min-w-1/2'>
          <form action={formAction}>
            <DialogHeader>
              <DialogTitle>{t('Add New User')}</DialogTitle>
              <DialogDescription>
                {t('Fill the form below to add a new user to the system.')}
              </DialogDescription>
            </DialogHeader>

            <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mt-4'>
              <div className='space-y-1'>
                <Label htmlFor='firstName'>{t('First Name')}</Label>
                <Input
                  id='firstName'
                  placeholder={t('First Name')}
                  name='firstName'
                  defaultValue={state?.data?.firstName}
                  className={state?.errors?.firstName && 'border-red-500'}
                />
                {state?.errors?.firstName?.[0] && (
                  <p className='text-xs text-red-500 break-all'>
                    {state.errors.firstName}
                  </p>
                )}
              </div>
              <div className='space-y-1'>
                <Label htmlFor='lastName'>{t('Last Name')}</Label>
                <Input
                  id='lastName'
                  placeholder={t('Last Name')}
                  name='lastName'
                  defaultValue={state?.data?.lastName}
                  className={state?.errors?.lastName && 'border-red-500'}
                />
                {state?.errors?.lastName?.[0] && (
                  <p className='text-xs text-red-500 break-all'>
                    {state.errors.lastName}
                  </p>
                )}
              </div>

              <div className='space-y-1'>
                <Label htmlFor='email'>{t('Email')}</Label>
                <Input
                  id='email'
                  placeholder={t('Email')}
                  type='email'
                  defaultValue={state?.data?.email}
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
                  defaultValue={state?.data?.phone}
                  // hasError={state?.errors?.phone}
                  className={state?.errors?.phone && 'border-red-500'}
                  defaultCountry='HU'
                  international
                />
                {state?.errors?.phone?.[0] && (
                  <p className='text-xs text-red-500 break-all'>
                    {state.errors.phone}
                  </p>
                )}
              </div>

              <div className='space-y-1'>
                <Label htmlFor='dob'>{t('Date Of Birth')}</Label>
                <DatePicker
                  name='dob'
                  value={state?.data?.dob}
                  className={state?.errors?.dob && 'border-red-500'}
                />
                {state?.errors?.dob?.[0] && (
                  <p className='text-xs text-red-500 break-all'>
                    {state.errors.dob}
                  </p>
                )}
              </div>

              <div className='grid gap-1'>
                <Label htmlFor='role'>{t('Role')}</Label>
                <Select name='role'>
                  <SelectTrigger
                    className={cn(
                      'w-full',
                      state?.errors?.role && 'border-red-500',
                    )}
                  >
                    <SelectValue placeholder={t('Select one ...')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {rolesIcon.map(item => (
                        <SelectItem key={item.value} value={item.value}>
                          <div className='flex items-center gap-2'>
                            {item.icon}
                            <span>{item.label}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                {state?.errors?.role?.[0] && (
                  <p className='text-xs text-red-500 break-all'>
                    {state.errors.role}
                  </p>
                )}
              </div>
              <div className='grid gap-1'>
                <Label htmlFor='status'>{t('Status')}</Label>
                <Select name='status'>
                  <SelectTrigger
                    className={cn(
                      'w-full',
                      state?.errors?.status && 'border-red-500',
                    )}
                  >
                    <SelectValue placeholder={t('Select one ...')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {statusesIcon.map(item => (
                        <SelectItem key={item.value} value={item.value}>
                          <div className='flex items-center gap-2'>
                            {item.icon}
                            <span>{item.label}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                {state?.errors?.status?.[0] && (
                  <p className='text-xs text-red-500 break-all'>
                    {state.errors.status}
                  </p>
                )}
              </div>

              <div className='space-y-1'>
                <Label htmlFor='country'>{t('Country')}</Label>
                <CountryDropdown
                  placeholder={t('Select country')}
                  defaultValue={state?.data?.country || 'HU'}
                  name='country'
                />
                {state?.errors?.country?.[0] && (
                  <p className='text-xs text-red-500 break-all'>
                    {state.errors.country}
                  </p>
                )}
              </div>

              <div className='space-y-1'>
                <Label htmlFor='addressLine1'>{t('Address Line 1')}</Label>
                <Input
                  id='addressLine1'
                  placeholder={t('Address Line 1')}
                  name='addressLine1'
                  defaultValue={state?.data?.addressLine1}
                  className={state?.errors?.addressLine1 && 'border-red-500'}
                />
                {state?.errors?.addressLine1?.[0] && (
                  <p className='text-xs text-red-500 break-all'>
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
                  defaultValue={state?.data?.addressLine2}
                  className={state?.errors?.addressLine2 && 'border-red-500'}
                />
                {state?.errors?.addressLine2?.[0] && (
                  <p className='text-xs text-red-500 break-all'>
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
                  defaultValue={state?.data?.state}
                  className={state?.errors?.state && 'border-red-500'}
                />
                {state?.errors?.state?.[0] && (
                  <p className='text-xs text-red-500 break-all'>
                    {state.errors.state}
                  </p>
                )}
              </div>
              <div className='space-y-1'>
                <Label htmlFor='city'>{t('City')}</Label>
                <Input
                  id='city'
                  placeholder={t('City')}
                  name='city'
                  defaultValue={state?.data?.city}
                  className={state?.errors?.city && 'border-red-500'}
                />
                {state?.errors?.city?.[0] && (
                  <p className='text-xs text-red-500 break-all'>
                    {state.errors.city}
                  </p>
                )}
              </div>

              <div className='space-y-1'>
                <Label htmlFor='postalCode'>{t('Postal Code')}</Label>
                <Input
                  id='postalCode'
                  placeholder={t('Postal Code')}
                  name='postalCode'
                  defaultValue={state?.data?.postalCode}
                  className={state?.errors?.postalCode && 'border-red-500'}
                />
                {state?.errors?.postalCode?.[0] && (
                  <p className='text-xs text-red-500 break-all'>
                    {state.errors.postalCode}
                  </p>
                )}
              </div>
            </div>
            <div className='mt-4'>
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
                      defaultValue={state?.data?.companyName}
                      className={state?.errors?.companyName && 'border-red-500'}
                    />
                    {state?.errors?.companyName?.[0] && (
                      <p className='text-xs text-red-500 break-all'>
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
                      defaultValue={state?.data?.vatNumber}
                      className={state?.errors?.vatNumber && 'border-red-500'}
                    />
                    {state?.errors?.vatNumber?.[0] && (
                      <p className='text-xs text-red-500 break-all'>
                        {state.errors.vatNumber}
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>

            <DialogFooter className='mt-4'>
              <DialogClose asChild>
                <Button variant='outline' className='w-32'>
                  {t('Cancel')}
                </Button>
              </DialogClose>
              <Button type='submit' className='w-32' isLoading={isPending}>
                {t('Save')}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </form>
    </Dialog>
  );
};

export default AddUser;
