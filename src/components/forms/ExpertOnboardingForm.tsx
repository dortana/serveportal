'use client';
import React, { useActionState, useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';
// import { expertSignUpAction } from '@/actions/auth';
import UploadIcon from '../icons/UploadIcon';
import { PhoneInput } from '../ui/phone-input';
import { DatePicker } from '../DatePicker';
import { Stepper } from '../ui/stepper';
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
import {
  onBoardingStep1Action,
  onBoardingStep2Action,
  onBoardingStep3Action,
  onBoardingStep4Action,
} from '@/actions/user';
import { cn } from '@/lib/utils';
import Image from 'next/image';

const ExpertOnboardingForm = () => {
  const t = useTranslations();

  const [formData, setFormData] = useState<{
    phone: string;
    dob: string;
    country: string;
    addressLine1: string;
    addressLine2: string;
    state: string;
    city: string;
    postalCode: string;
    profession: string;
    profession_details: string;
    years_experience: string;
    availability: string;
    languages_spoken: string;
    profile_photo: string;
    id_front: string;
    id_back: string;
    address_front: string;
    address_back: string;
  }>({
    // Step1
    phone: '+36 30 123 4567',
    dob: '2022-01-01',
    // Step2
    country: 'HU',
    addressLine1: 'Agota utca 4',
    addressLine2: '',
    state: 'Pest County',
    city: 'Erd',
    postalCode: '2030',
    // Step3
    profession: 'electrical_services',
    profession_details: 'sdfsdfsfsfsdf',
    years_experience: 'banana',
    availability: 'part_time',
    languages_spoken: 'EN,HU',
    // Step4
    profile_photo: '',
    id_front: '',
    id_back: '',
    address_front: '',
    address_back: '',
  });

  const ref1 = React.useRef<HTMLFormElement>(null);
  const ref2 = React.useRef<HTMLFormElement>(null);
  const ref3 = React.useRef<HTMLFormElement>(null);
  const ref4 = React.useRef<HTMLFormElement>(null);

  // Files Ref
  const profileRef = React.useRef<HTMLInputElement>(null);
  const idFrontRef = React.useRef<HTMLInputElement>(null);
  const idBackRef = React.useRef<HTMLInputElement>(null);
  const addressFrontRef = React.useRef<HTMLInputElement>(null);
  const addressBackRef = React.useRef<HTMLInputElement>(null);

  const [profilePhoto, setProfilePhoto] = useState<File | null>(null);

  console.log(profilePhoto);

  const [profilePreview, setProfilePreview] = useState<string | null>(null);

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Save file for upload (optional)
    setProfilePhoto(file);

    // Create a preview URL
    const url = URL.createObjectURL(file);
    setProfilePreview(url);
  };

  const [stateStep1, formActionStep1, isPendingStep1] = useActionState(
    onBoardingStep1Action,
    null,
  );

  const [stateStep2, formActionStep2, isPendingStep2] = useActionState(
    onBoardingStep2Action,
    null,
  );

  const [stateStep3, formActionStep3, isPendingStep3] = useActionState(
    onBoardingStep3Action,
    null,
  );

  const [stateStep4, formActionStep4, isPendingStep4] = useActionState(
    onBoardingStep4Action,
    null,
  );

  console.log(stateStep4);

  // const [state, formAction, isPending] = useActionState(
  //   expertSignUpAction,
  //   null,
  // );

  const [currentStep, setCurrentStep] = useState(3);
  const services: Service[] = useServices();
  const services_options = services.map(service => {
    const Icon = service.icon;
    return {
      icon: <Icon className='!w-5 !h-5' />,
      label: service.label,
      value: service.value,
    };
  });

  //@ts-ignore
  const steps = [
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
      title: 'Profession Details',
      description: 'Set your working area',
      icon: <PermanentJobIcon />,
    },
    {
      title: 'Upload Docs',
      description: 'Verify your identity',
      icon: <CameraIcon />,
    },
  ];

  // Handle side effects for step 1
  useEffect(() => {
    if (stateStep1?.data?.dob && !stateStep1.errors) {
      setFormData(prev => ({
        ...prev,
        phone: stateStep1.data.phone,
        dob: stateStep1.data.dob,
      }));
      setCurrentStep(1);
    } else if (stateStep1?.errors) {
      toast.error(t('Error'), {
        description: t('Validation failed, please check your inputs.'),
      });
    }
  }, [stateStep1, t]);

  // Handle side effects for step 2
  useEffect(() => {
    if (stateStep2?.data?.country && !stateStep2.errors) {
      setFormData(prev => ({
        ...prev,
        country: stateStep2.data.country,
        addressLine1: stateStep2.data.addressLine1,
        addressLine2: stateStep2.data.addressLine2,
        state: stateStep2.data.state,
        city: stateStep2.data.city,
        postalCode: stateStep2.data.postalCode,
      }));
      setCurrentStep(2);
    } else if (stateStep2?.errors) {
      toast.error(t('Error'), {
        description: t('Validation failed, please check your inputs.'),
      });
    }
  }, [stateStep2, t]);

  // Handle side effects for step 3
  useEffect(() => {
    if (stateStep3?.data?.profession && !stateStep3.errors) {
      setFormData(prev => ({
        ...prev,
        profession: stateStep3.data.profession,
        profession_details: stateStep3.data.profession_details,
        years_experience: stateStep3.data.years_experience,
        availability: stateStep3.data.availability,
        languages_spoken: stateStep3.data.languages_spoken,
      }));
      setCurrentStep(3);
    } else if (stateStep3?.errors) {
      toast.error(t('Error'), {
        description: t('Validation failed, please check your inputs.'),
      });
    }
  }, [stateStep3, t]);

  useEffect(() => {
    return () => {
      if (profilePreview) URL.revokeObjectURL(profilePreview);
    };
  }, [profilePreview]);

  return (
    <Card className='border-0 shadow-none w-full max-w-3xl'>
      <CardHeader className='px-0'>
        <CardTitle className='text-2xl'>{t('Compelete Onboarding')}</CardTitle>
        <CardDescription>
          {t('Please provide the following information to get started.')}
        </CardDescription>
      </CardHeader>
      <Stepper
        steps={steps}
        currentStep={currentStep}
        //@ts-ignore
        onStepChange={setCurrentStep}
      />

      <CardContent className='grid gap-6 px-0'>
        {currentStep === 0 && (
          <form action={formActionStep1} ref={ref1}>
            <div className='grid gap-4'>
              <div className='space-y-1'>
                <Label htmlFor='phone'>{t('Phone')}</Label>
                <PhoneInput
                  id='phone'
                  placeholder={t('Phone')}
                  name='phone'
                  hasError={stateStep1?.errors?.phone}
                  className={stateStep1?.errors?.phone && 'border-red-500'}
                  defaultCountry='HU'
                  international
                  value={stateStep1?.data?.phone || formData.phone}
                />
                {stateStep1?.errors?.phone && (
                  <p className='text-xs text-red-500'>
                    {Array.isArray(stateStep1.errors.phone)
                      ? stateStep1.errors.phone[0]
                      : stateStep1.errors.phone}
                  </p>
                )}
              </div>

              <div className='space-y-1'>
                <Label htmlFor='dob'>{t('Date Of Birth')}</Label>
                <DatePicker
                  name='dob'
                  value={formData.dob}
                  className={stateStep1?.errors?.dob && 'border-red-500'}
                />
                {stateStep1?.errors?.dob?.[0] && (
                  <p className='text-xs text-red-500'>
                    {stateStep1.errors.dob}
                  </p>
                )}
              </div>
            </div>
          </form>
        )}
        {currentStep === 1 && (
          <form action={formActionStep2} ref={ref2}>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <div className='space-y-1'>
                <Label htmlFor='country'>{t('Country')}</Label>
                <CountryDropdown
                  placeholder={t('Select country')}
                  defaultValue={formData.country || 'HU'}
                  name='country'
                />
                {stateStep2?.errors?.country?.[0] && (
                  <p className='text-xs text-red-500'>
                    {stateStep2.errors.country}
                  </p>
                )}
              </div>

              <div className='space-y-1'>
                <Label htmlFor='addressLine1'>{t('Address Line 1')}</Label>
                <Input
                  id='addressLine1'
                  placeholder={t('Address Line 1')}
                  name='addressLine1'
                  defaultValue={
                    stateStep2?.data?.addressLine1 || formData.addressLine1
                  }
                  className={
                    stateStep2?.errors?.addressLine1 && 'border-red-500'
                  }
                />
                {stateStep2?.errors?.addressLine1?.[0] && (
                  <p className='text-xs text-red-500'>
                    {stateStep2.errors.addressLine1}
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
                    stateStep2?.data?.addressLine2 || formData.addressLine2
                  }
                  className={
                    stateStep2?.errors?.addressLine2 && 'border-red-500'
                  }
                />
                {stateStep2?.errors?.addressLine2?.[0] && (
                  <p className='text-xs text-red-500'>
                    {stateStep2.errors.addressLine2}
                  </p>
                )}
              </div>
              <div className='space-y-1'>
                <Label htmlFor='state'>{t('State')}</Label>
                <Input
                  id='state'
                  placeholder={t('State')}
                  name='state'
                  defaultValue={stateStep2?.data?.state || formData.state}
                  className={stateStep2?.errors?.state && 'border-red-500'}
                />
                {stateStep2?.errors?.state?.[0] && (
                  <p className='text-xs text-red-500'>
                    {stateStep2.errors.state}
                  </p>
                )}
              </div>
              <div className='space-y-1'>
                <Label htmlFor='city'>{t('City')}</Label>
                <Input
                  id='city'
                  placeholder={t('City')}
                  name='city'
                  defaultValue={stateStep2?.data?.city || formData.city}
                  className={stateStep2?.errors?.city && 'border-red-500'}
                />
                {stateStep2?.errors?.city?.[0] && (
                  <p className='text-xs text-red-500'>
                    {stateStep2.errors.city}
                  </p>
                )}
              </div>

              <div className='space-y-1'>
                <Label htmlFor='postalCode'>{t('Postal Code')}</Label>
                <Input
                  id='postalCode'
                  placeholder={t('Postal Code')}
                  name='postalCode'
                  defaultValue={
                    stateStep2?.data?.postalCode || formData.postalCode
                  }
                  className={stateStep2?.errors?.postalCode && 'border-red-500'}
                />
                {stateStep2?.errors?.postalCode?.[0] && (
                  <p className='text-xs text-red-500'>
                    {stateStep2.errors.postalCode}
                  </p>
                )}
              </div>
            </div>
          </form>
        )}
        {currentStep === 2 && (
          <form action={formActionStep3} ref={ref3}>
            <div className='grid gap-4'>
              <div className='space-y-1 relative'>
                <Label htmlFor='profession'>
                  {t('Select Your Profession')}
                </Label>
                <SearchableSelect
                  name='profession'
                  items={services_options}
                  placeholder={t('Select one ...')}
                  defaultValue={
                    stateStep3?.data?.profession || formData.profession
                  }
                  className={stateStep3?.errors?.profession && 'border-red-500'}
                />
                {stateStep3?.errors?.profession && (
                  <p className='text-xs text-red-500'>
                    {stateStep3.errors.profession}
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
                  defaultValue={
                    stateStep3?.data?.profession_details ||
                    formData.profession_details
                  }
                  className={
                    stateStep3?.errors?.profession_details && 'border-red-500'
                  }
                />
                {stateStep3?.errors?.profession_details && (
                  <p className='text-xs text-red-500'>
                    {stateStep3.errors.profession_details}
                  </p>
                )}
              </div>

              <div className='space-y-1 relative'>
                <Label htmlFor='years_experience'>
                  {t('How many years of experience do you have?')}
                </Label>
                <Select
                  defaultValue={
                    stateStep3?.data?.years_experience ||
                    formData.years_experience.length > 0
                      ? formData.years_experience
                      : undefined
                  }
                  name='years_experience'
                >
                  <SelectTrigger
                    className={cn(
                      'w-full',
                      stateStep3?.errors?.years_experience && 'border-red-500',
                    )}
                    name='years_experience'
                  >
                    <SelectValue placeholder={t('Select one ...')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value='apple'>
                        {t('Less than 1 year')}
                      </SelectItem>
                      <SelectItem value='banana'>
                        {t('1 to 3 years')}
                      </SelectItem>
                      <SelectItem value='blueberry'>
                        {t('3 to 6 years')}
                      </SelectItem>
                      <SelectItem value='grapes'>
                        {t('6 - 10 years')}
                      </SelectItem>
                      <SelectItem value='123'>
                        {t('More than 10 years')}
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                {stateStep3?.errors?.years_experience && (
                  <p className='text-xs text-red-500'>
                    {stateStep3.errors.years_experience?.[0]}
                  </p>
                )}
              </div>

              <div className='space-y-1 relative'>
                <Label htmlFor='availability'>{t('Availability')}</Label>

                <Select
                  name='availability'
                  defaultValue={
                    stateStep3?.data?.availability ||
                    formData.availability.length > 0
                      ? formData.availability
                      : undefined
                  }
                >
                  <SelectTrigger
                    className={cn(
                      'w-full',
                      stateStep3?.errors?.availability && 'border-red-500',
                    )}
                  >
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

                {stateStep3?.errors?.availability && (
                  <p className='text-xs text-red-500'>
                    {stateStep3.errors.availability}
                  </p>
                )}
              </div>

              <div className='space-y-1 relative'>
                <Label htmlFor='languages_spoken'>
                  {t('Languages Spoken')}
                </Label>

                <MultiSelect
                  name='languages_spoken'
                  defaultValues={
                    stateStep3?.data?.languages_spoken.split(',') ||
                    formData?.languages_spoken.length > 0
                      ? formData.languages_spoken.split(',')
                      : undefined
                  }
                >
                  <MultiSelectTrigger
                    className={cn(
                      'w-full',
                      stateStep3?.errors?.languages_spoken && 'border-red-500',
                    )}
                  >
                    <MultiSelectValue placeholder={t('Select one ...')} />
                  </MultiSelectTrigger>
                  <MultiSelectContent>
                    <MultiSelectGroup>
                      <MultiSelectItem value='EN'>
                        {t('English')}
                      </MultiSelectItem>
                      <MultiSelectItem value='HU'>
                        {t('Hungarian')}
                      </MultiSelectItem>
                      <MultiSelectItem value='DE'>
                        {t('German')}
                      </MultiSelectItem>
                    </MultiSelectGroup>
                  </MultiSelectContent>
                </MultiSelect>

                {stateStep3?.errors?.languages_spoken && (
                  <p className='text-xs text-red-500'>
                    {stateStep3.errors.languages_spoken?.[0]}
                  </p>
                )}
              </div>
            </div>
          </form>
        )}
        {currentStep === 3 && (
          <form action={formActionStep4} ref={ref4}>
            <Label htmlFor='profile_photo'>
              {t('1- Upload Profile Photo (Your Face)')}
            </Label>
            <input
              type='file'
              name='profile_photo'
              hidden
              ref={profileRef}
              accept='image/*'
              onChange={handleProfileChange}
            />
            <div className='bg-tertiary rounded-bl-md rounded-br-md h-auto flex items-center gap-4 p-4 justify-around mt-2'>
              <div className='border-brand-blue-light text-brand-blue-light border rounded-full bg-white size-20 aspect-square flex items-center justify-center overflow-hidden'>
                {profilePreview ? (
                  <Image
                    src={profilePreview}
                    alt='Profile Preview'
                    className='w-full h-full object-cover'
                    width={80}
                    height={80}
                    unoptimized
                  />
                ) : (
                  <CameraIcon className='w-7 h-8 text-brand-blue-light' />
                )}
              </div>
              <div className='flex items-center gap-2 flex-wrap justify-end'>
                <Button
                  className='w-40 md:w-48'
                  isLoading={false}
                  variant='outline'
                  onClick={() => profileRef.current?.click()}
                >
                  <UploadIcon />
                  {t('Upload Image')}
                </Button>
              </div>
            </div>
            <br />
            <Label htmlFor='id_card'>{t('2- Upload Your ID Card')}</Label>

            <div className='flex gap-4 mt-2'>
              <input type='file' name='id_front' hidden ref={idFrontRef} />
              <Dropzone
                accept={{ 'image/*': [] }}
                maxFiles={1}
                maxSize={1024 * 1024 * 10}
                minSize={256}
                onDrop={files => {
                  if (files.length > 0) {
                    const file = files[0];
                    const dt = new DataTransfer();
                    dt.items.add(file);
                    idFrontRef.current!.files = dt.files;
                  }
                }}
                onError={console.error}
                src={
                  idFrontRef.current?.files
                    ? Array.from(idFrontRef.current.files)
                    : undefined
                }
                className='flex-1 border-orange-400 border-dashed'
              >
                <DropzoneEmptyState title='ID Card Front Side' />
                <DropzoneContent />
              </Dropzone>
              <input type='file' name='id_back' hidden ref={idBackRef} />
              <Dropzone
                accept={{ 'image/*': [] }}
                maxFiles={1}
                maxSize={1024 * 1024 * 10}
                minSize={256}
                onDrop={files => {
                  if (files.length > 0) {
                    const file = files[0];
                    const dt = new DataTransfer();
                    dt.items.add(file);
                    idBackRef.current!.files = dt.files;
                  }
                }}
                onError={console.error}
                src={
                  idBackRef.current?.files
                    ? Array.from(idBackRef.current.files)
                    : undefined
                }
                className='flex-1 border-orange-400 border-dashed'
              >
                <DropzoneEmptyState title='ID Card Back Side' />
                <DropzoneContent />
              </Dropzone>
            </div>
            <br />
            <Label htmlFor='address_card'>
              {t('3- Upload Your Address Card')}
            </Label>
            <div className='flex gap-4 mt-2'>
              <input
                type='file'
                name='address_front'
                hidden
                ref={addressFrontRef}
              />
              <Dropzone
                accept={{ 'image/*': [] }}
                maxFiles={1}
                maxSize={1024 * 1024 * 10}
                minSize={256}
                onDrop={files => {
                  if (files.length > 0) {
                    const file = files[0];
                    const dt = new DataTransfer();
                    dt.items.add(file);
                    addressFrontRef.current!.files = dt.files;
                  }
                }}
                onError={console.error}
                src={
                  addressFrontRef.current?.files
                    ? Array.from(addressFrontRef.current.files)
                    : undefined
                }
                className='flex-1 border-orange-400 border-dashed'
              >
                <DropzoneEmptyState title='Address Card Front Side' />
                <DropzoneContent />
              </Dropzone>
              <input
                type='file'
                name='address_back'
                hidden
                ref={addressBackRef}
              />
              <Dropzone
                accept={{ 'image/*': [] }}
                maxFiles={1}
                maxSize={1024 * 1024 * 10}
                minSize={256}
                onDrop={files => {
                  if (files.length > 0) {
                    const file = files[0];
                    const dt = new DataTransfer();
                    dt.items.add(file);
                    addressBackRef.current!.files = dt.files;
                  }
                }}
                onError={console.error}
                src={
                  addressBackRef.current?.files
                    ? Array.from(addressBackRef.current.files)
                    : undefined
                }
                className='flex-1 border-orange-400 border-dashed'
              >
                <DropzoneEmptyState title='Address Card Back Side' />
                <DropzoneContent />
              </Dropzone>
            </div>
          </form>
        )}
      </CardContent>
      <div className='flex justify-between'>
        <Button
          variant='outline'
          onClick={() => setCurrentStep(currentStep - 1)}
          disabled={currentStep === 0}
        >
          {t('Previous')}
        </Button>
        <Button
          onClick={() => {
            if (currentStep === 0) {
              ref1.current?.requestSubmit();
            } else if (currentStep === 1) {
              ref2.current?.requestSubmit();
            } else if (currentStep === 2) {
              ref3.current?.requestSubmit();
            } else if (currentStep === 3) {
              ref4.current?.requestSubmit();
            }
          }}
          disabled={currentStep === steps.length - 1}
          isLoading={
            currentStep === 0
              ? isPendingStep1
              : currentStep === 1
                ? isPendingStep2
                : currentStep === 2
                  ? isPendingStep3
                  : isPendingStep4
          }
        >
          {currentStep === steps.length - 1 ? t('Finish') : t('Next')}
        </Button>
      </div>
    </Card>
  );
};

export default ExpertOnboardingForm;
