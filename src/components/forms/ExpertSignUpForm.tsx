//@ts-nocheck
'use client';
import React, { useActionState, useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { Checkbox } from '@/components/ui/checkbox';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';
import { expertSignUpAction } from '@/actions/auth';
import { useRouter } from 'next/navigation';
import UploadIcon from '../icons/UploadIcon';
import { PhoneInput } from '../ui/phone-input';
import { DatePicker } from '../DatePicker';
import { Stepper, StepProps } from '../ui/stepper';
import CameraIcon from '../icons/CameraIcon';
import LocationIcon from '../icons/LocationIcon';
import NoteDoneIcon from '../icons/NoteDoneIcon';
import { CountryDropdown } from '../ui/country-dropdown';
import PermanentJobIcon from '../icons/PermanentJobIcon';
import SearchableSelect from '../ui/searchable-select';
import { Service } from '@/types/app';
import { useServices } from '@/hooks/useServices';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '../ui/textarea';
import {
  MultiSelect,
  MultiSelectContent,
  MultiSelectGroup,
  MultiSelectItem,
  MultiSelectTrigger,
  MultiSelectValue,
} from '@/components/ui/multi-select';
import { Dropzone, DropzoneContent, DropzoneEmptyState } from '../ui/dropzone';

const ExpertSignUpForm = () => {
  const t = useTranslations();

  const router = useRouter();
  const [privacyChecked, setPrivacyChecked] = useState(true);
  const [state, formAction, isPending] = useActionState(
    expertSignUpAction,
    null,
  );
  const [currentStep, setCurrentStep] = useState(2);
  const services: Service[] = useServices();
  const services_options = services.map(service => {
    const Icon = service.icon;
    return {
      icon: <Icon className='!w-5 !h-5' />,
      label: service.label,
      value: service.value,
    };
  });
  const steps: StepProps = [
    {
      title: 'Personal Info',
      description: 'Your basic information',
      icon: <NoteDoneIcon />,
    },
    {
      title: 'Address',
      description: 'Your living area',
      icon: <LocationIcon />,
    },
    {
      title: 'Upload Docs',
      description: 'Verify your identity',
      icon: <CameraIcon />,
    },
    {
      title: 'Profession Details',
      description: 'Set your working area',
      icon: <PermanentJobIcon />,
    },
  ];

  const [files, setFiles] = useState<File[] | undefined>();
  const handleDrop = (files: File[]) => {
    console.log(files);
    setFiles(files);
  };

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
    <Card className='border-0 shadow-none w-full max-w-3xl mt-4 max-md:px-4'>
      <Stepper
        steps={steps}
        currentStep={currentStep}
        onStepChange={setCurrentStep}
      />
      <form
        action={formAction}
        onSubmit={e => {
          if (!privacyChecked) {
            e.preventDefault();
          }
        }}
      >
        <CardContent className='grid gap-6 px-0'>
          {currentStep === 0 && (
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
                {state?.errors?.phone && (
                  <p className='text-xs text-red-500'>
                    {Array.isArray(state.errors.phone)
                      ? state.errors.phone[0]
                      : state.errors.phone}
                  </p>
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
                <DatePicker />
                {state?.errors?.dob?.[0] && (
                  <p className='text-xs text-red-500'>{state.errors.dob}</p>
                )}
              </div>
            </div>
          )}
          {currentStep === 1 && (
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <div className='space-y-1'>
                <Label htmlFor='lastName'>{t('Country')}</Label>
                <CountryDropdown
                  placeholder={t('Select country')}
                  defaultValue='HU'
                />
                {state?.errors?.lastName?.[0] && (
                  <p className='text-xs text-red-500'>
                    {state.errors.lastName}
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
                  defaultValue={state?.data?.addressLine2}
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
                  defaultValue={state?.data?.state}
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
                  defaultValue={state?.data?.city}
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
                  defaultValue={state?.data?.postalCode}
                  className={state?.errors?.postalCode && 'border-red-500'}
                />
                {state?.errors?.postalCode?.[0] && (
                  <p className='text-xs text-red-500'>
                    {state.errors.postalCode}
                  </p>
                )}
              </div>
            </div>
          )}
          {currentStep === 2 && (
            <>
              <Label htmlFor='profession'>
                {t('1- Upload Profile Photo (Your Face)')}
              </Label>
              <div className='bg-tertiary rounded-bl-md rounded-br-md h-auto flex items-center gap-4 p-4 justify-around -mt-2'>
                <div className='border-brand-blue-light text-brand-blue-light border rounded-full bg-white size-20 flex items-center justify-center'>
                  <CameraIcon className='w-7 h-8' />
                </div>
                <div className='flex items-center gap-2 flex-wrap justify-end'>
                  <Button
                    className='w-40 md:w-48'
                    isLoading={false}
                    variant='outline'
                  >
                    <UploadIcon />
                    {t('Upload Image')}
                  </Button>
                </div>
              </div>

              <Label htmlFor='profession'>{t('2- Upload Your ID Card')}</Label>
              <div className='flex gap-4 -mt-2'>
                <Dropzone
                  accept={{ 'image/*': [] }}
                  maxFiles={1}
                  maxSize={1024 * 1024 * 10}
                  minSize={1024}
                  onDrop={handleDrop}
                  onError={console.error}
                  src={files}
                  className='flex-1 border-orange-400 border-dashed'
                >
                  <DropzoneEmptyState title='ID Card Front Side' />
                  <DropzoneContent />
                </Dropzone>
                <Dropzone
                  accept={{ 'image/*': [] }}
                  maxFiles={1}
                  maxSize={1024 * 1024 * 10}
                  minSize={1024}
                  onDrop={handleDrop}
                  onError={console.error}
                  src={files}
                  className='flex-1 border-orange-400 border-dashed'
                >
                  <DropzoneEmptyState title='ID Card Back Side' />
                  <DropzoneContent />
                </Dropzone>
              </div>

              <Label htmlFor='profession'>
                {t('3- Upload Your Address Card')}
              </Label>
              <div className='flex gap-4 -mt-2'>
                <Dropzone
                  accept={{ 'image/*': [] }}
                  maxFiles={1}
                  maxSize={1024 * 1024 * 10}
                  minSize={1024}
                  onDrop={handleDrop}
                  onError={console.error}
                  src={files}
                  className='flex-1 border-orange-400 border-dashed'
                >
                  <DropzoneEmptyState title='Address Card Front Side' />
                  <DropzoneContent />
                </Dropzone>
                <Dropzone
                  accept={{ 'image/*': [] }}
                  maxFiles={1}
                  maxSize={1024 * 1024 * 10}
                  minSize={1024}
                  onDrop={handleDrop}
                  onError={console.error}
                  src={files}
                  className='flex-1 border-orange-400 border-dashed'
                >
                  <DropzoneEmptyState title='Address Card Back Side' />
                  <DropzoneContent />
                </Dropzone>
              </div>
            </>
          )}
          {currentStep === 3 && (
            <div className='grid gap-4'>
              <div className='space-y-1 relative'>
                <Label htmlFor='profession'>
                  {t('Select Your Profession')}
                </Label>
                <SearchableSelect
                  name='profession'
                  items={services_options}
                  placeholder='Select one ...'
                  onChange={value => console.log('Selected:', value)}
                />
                {state?.errors?.profession && (
                  <p className='text-xs text-red-500'>
                    {state.errors.profession}
                  </p>
                )}
              </div>

              <div className='space-y-1 relative'>
                <Label htmlFor='profession_details'>
                  {t('Please describe your profession in detail')}
                </Label>
                <Textarea
                  id='profession_details'
                  placeholder={t('Tell customers about your experience')}
                  name='profession_details'
                  defaultValue={state?.data?.profession_details || undefined}
                  className={
                    state?.errors?.profession_details && 'border-red-500'
                  }
                />
                {state?.errors?.profession && (
                  <p className='text-xs text-red-500'>
                    {state.errors.profession}
                  </p>
                )}
              </div>

              <div className='space-y-1 relative'>
                <Label htmlFor='years_experience'>
                  {t('How many years of experience do you have?')}
                </Label>
                <Select>
                  <SelectTrigger className='w-full' name='years_experience'>
                    <SelectValue placeholder={t('Select one ...')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value='apple'>Less than 1 year</SelectItem>
                      <SelectItem value='banana'>1 to 3 years</SelectItem>
                      <SelectItem value='blueberry'>3 to 6 years</SelectItem>
                      <SelectItem value='grapes'>6 - 10 years</SelectItem>
                      <SelectItem value='123'>More than 10 years</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                {state?.errors?.years_experience && (
                  <p className='text-xs text-red-500'>
                    {state.errors.years_experience}
                  </p>
                )}
              </div>

              <div className='space-y-1 relative'>
                <Label htmlFor='availability'>{t('Availability')}</Label>

                <Select name='availability'>
                  <SelectTrigger className='w-full'>
                    <SelectValue placeholder={t('Select one ...')} />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value='full_time'>
                        {t('Full-time')}
                      </SelectItem>
                      <SelectItem value='part_time'>
                        {t('Part-time')}
                      </SelectItem>
                      <SelectItem value='weekends_only'>
                        {t('Weekends only')}
                      </SelectItem>
                      <SelectItem value='evenings'>{t('Evenings')}</SelectItem>
                      <SelectItem value='custom'>
                        {t('Custom schedule')}
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>

                {state?.errors?.availability && (
                  <p className='text-xs text-red-500'>
                    {state.errors.availability}
                  </p>
                )}
              </div>

              <div className='space-y-1 relative'>
                <Label htmlFor='languages_spoken'>
                  {t('Languages Spoken')}
                </Label>

                <MultiSelect name='languages_spoken'>
                  <MultiSelectTrigger className='w-full'>
                    <MultiSelectValue placeholder='Select one ...' />
                  </MultiSelectTrigger>
                  <MultiSelectContent>
                    <MultiSelectGroup>
                      <MultiSelectItem value='next.js'>English</MultiSelectItem>
                      <MultiSelectItem value='sveltekit'>
                        Hungarian
                      </MultiSelectItem>
                      <MultiSelectItem value='astro'>German</MultiSelectItem>
                    </MultiSelectGroup>
                  </MultiSelectContent>
                </MultiSelect>

                {state?.errors?.languages_spoken && (
                  <p className='text-xs text-red-500'>
                    {state.errors.languages_spoken}
                  </p>
                )}
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
            </div>
          )}
        </CardContent>
        {/* <CardFooter className='justify-between'>
           <Button className='w-full' type='submit' isLoading={isPending}>
            {t('Create Account')}
          </Button> 
        </CardFooter> */}
      </form>

      <div className='flex justify-between'>
        <Button
          variant='outline'
          onClick={() => setCurrentStep(currentStep - 1)}
          disabled={currentStep === 0}
        >
          Previous
        </Button>
        <Button
          onClick={() => setCurrentStep(currentStep + 1)}
          disabled={currentStep === steps.length - 1}
          isLoading={isPending}
        >
          {currentStep === steps.length - 1 ? 'Finish' : 'Next'}
        </Button>
      </div>
    </Card>
  );
};

export default ExpertSignUpForm;
