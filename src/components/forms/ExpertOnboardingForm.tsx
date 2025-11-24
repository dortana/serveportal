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
import { PhoneInput } from '../ui/phone-input';
import { DatePicker } from '../DatePicker';
import { Stepper } from '../ui/stepper';
import CameraIcon from '../icons/CameraIcon';
import LocationIcon from '../icons/LocationIcon';
import NoteDoneIcon from '../icons/NoteDoneIcon';
import { CountryDropdown } from '../ui/country-dropdown';
import PermanentJobIcon from '../icons/PermanentJobIcon';
import SearchableSelect from '../ui/searchable-select';
import { ExpertiseDetails, Service } from '@/types/app';
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
  onBoardingProfessionAction,
  onBoardingStep1Action,
  onBoardingStep2Action,
  onBoardingStep3Action,
  onBoardingStep4Action,
} from '@/actions/user';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { useExperienceOptions } from '@/hooks/useExperienceOptions';
import { useWorkScheduleOptions } from '@/hooks/useWorkScheduleOptions';
import EditBulkIcon from '../icons/EditBulkIcon';
import TrashBulkIcon from '../icons/TrashBulkIcon';

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import PlusIcon from '../icons/PlusIcon';

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
    professions: ExpertiseDetails[];
    languages_spoken: string;
    profile_photo: string;
    id_card_front: string;
    id_card_back: string;
    address_card: string;
  }>({
    // Step1
    phone: '+36301234567',
    dob: '2022-01-01',
    // Step2
    country: 'HU',
    addressLine1: 'Agota utca 4',
    addressLine2: '',
    state: 'Pest County',
    city: 'Erd',
    postalCode: '2030',
    // Step3
    professions: [],
    languages_spoken: 'EN,HU',
    // Step4
    profile_photo: '',
    id_card_front: '',
    id_card_back: '',
    address_card: '',
  });

  const ref1 = React.useRef<HTMLFormElement>(null);
  const ref2 = React.useRef<HTMLFormElement>(null);
  const ref3 = React.useRef<HTMLFormElement>(null);
  const ref4 = React.useRef<HTMLFormElement>(null);

  // Files Ref
  const profilePhotoRef = React.useRef<HTMLInputElement>(null);
  const idCardFrontRef = React.useRef<HTMLInputElement>(null);
  const idBCardBackRef = React.useRef<HTMLInputElement>(null);
  const addressCardRef = React.useRef<HTMLInputElement>(null);

  const [stateStep1, formActionStep1, isPendingStep1] = useActionState(
    onBoardingStep1Action,
    null,
  );

  const [stateStep2, formActionStep2, isPendingStep2] = useActionState(
    onBoardingStep2Action,
    null,
  );

  const [stateProfession, formActionProfession, isPendingProfession] =
    useActionState(onBoardingProfessionAction, null);

  const [stateStep3, formActionStep3, isPendingStep3] = useActionState(
    onBoardingStep3Action,
    null,
  );

  const [stateStep4, formActionStep4, isPendingStep4] = useActionState(
    onBoardingStep4Action,
    null,
  );

  // const [state, formAction, isPending] = useActionState(
  //   expertSignUpAction,
  //   null,
  // );

  const [currentStep, setCurrentStep] = useState(2);
  const services: Service[] = useServices();
  const experience_options = useExperienceOptions();
  const scheduleOptions = useWorkScheduleOptions();
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

  // Handle side effects for adding or editing a profession
  useEffect(() => {
    if (stateProfession?.data?.profession && !stateProfession.errors) {
      setFormData(prev => {
        const newItem: ExpertiseDetails = {
          profession: stateProfession.data.profession,
          profession_details: stateProfession.data.profession_details,
          years_experience: stateProfession.data.years_experience,
          availability: stateProfession.data.availability,
          pricePerHour: {
            currency: 'HUF',
            amount: Number(stateProfession.data.price_per_hour),
          },
        };

        const existsIndex = prev.professions.findIndex(
          p => p.profession === newItem.profession,
        );

        const updatedProfessions =
          existsIndex !== -1
            ? prev.professions.map((p, idx) =>
                idx === existsIndex ? newItem : p,
              )
            : [...prev.professions, newItem];

        return {
          ...prev,
          professions: updatedProfessions,
        };
      });
      setOpenEditProfession(false);
      setSelectedProfession(undefined);
    } else if (stateProfession?.errors) {
      toast.error(t('Error'), {
        description: t('Validation failed, please check your inputs.'),
      });
    }
  }, [stateProfession, t]);

  // Handle side effects for step 1
  useEffect(() => {
    if (stateStep3?.data?.professions && !stateStep3.errors) {
      setFormData(prev => ({
        ...prev,
        professions: stateStep3.data.professions,
        languages_spoken: stateStep3.data.languages_spoken,
      }));
      setCurrentStep(3);
    } else if (stateStep3?.errors) {
      toast.error(t('Error'), {
        description: t('Validation failed, please check your inputs.'),
      });
    }
  }, [stateStep3, t]);

  const [files1, setFiles1] = useState<File[] | undefined>();
  const [filePreview1, setFilePreview1] = useState<string | undefined>();
  const handleDrop1 = (files: File[]) => {
    setFiles1(files);
    if (files.length > 0) {
      const reader = new FileReader();
      reader.onload = e => {
        if (typeof e.target?.result === 'string') {
          setFilePreview1(e.target?.result);
        }
      };
      reader.readAsDataURL(files[0]);
    }
  };

  const [files2, setFiles2] = useState<File[] | undefined>();
  const [filePreview2, setFilePreview2] = useState<string | undefined>();
  const handleDrop2 = (files: File[]) => {
    setFiles2(files);
    if (files.length > 0) {
      const reader = new FileReader();
      reader.onload = e => {
        if (typeof e.target?.result === 'string') {
          setFilePreview2(e.target?.result);
        }
      };
      reader.readAsDataURL(files[0]);
    }
  };

  const [files3, setFiles3] = useState<File[] | undefined>();
  const [filePreview3, setFilePreview3] = useState<string | undefined>();
  const handleDrop3 = (files: File[]) => {
    setFiles3(files);
    if (files.length > 0) {
      const reader = new FileReader();
      reader.onload = e => {
        if (typeof e.target?.result === 'string') {
          setFilePreview3(e.target?.result);
        }
      };
      reader.readAsDataURL(files[0]);
    }
  };

  const [files4, setFiles4] = useState<File[] | undefined>();
  const [filePreview4, setFilePreview4] = useState<string | undefined>();
  const handleDrop4 = (files: File[]) => {
    setFiles4(files);
    if (files.length > 0) {
      const reader = new FileReader();
      reader.onload = e => {
        if (typeof e.target?.result === 'string') {
          setFilePreview4(e.target?.result);
        }
      };
      reader.readAsDataURL(files[0]);
    }
  };

  const [openEditProfession, setOpenEditProfession] = useState(false);
  const [selectedProfession, setSelectedProfession] =
    useState<ExpertiseDetails>();

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
                  value={
                    stateStep1?.data?.phone.replaceAll(' ', '') ||
                    formData.phone.replaceAll(' ', '')
                  }
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
          <div className='grid gap-2'>
            <Label htmlFor='languages_spoken'>
              {t('Your Professions (up to 3 items)')}
              <span className='text-red-500 ml-1'>*</span>
            </Label>
            {formData.professions.map((profession, index) => {
              const job = services.find(
                item => item.value === profession.profession,
              );
              const Icon = job?.icon;
              return (
                <div
                  key={index}
                  className='border border-brand border-dashed rounded-md p-2 space-y-1 gap-2'
                >
                  <div className='flex justify-between gap-2'>
                    <div>
                      <div className='flex items-center'>
                        {Icon && <Icon />}
                        <span className='text-sm ml-1 font-medium'>
                          {job?.label}
                        </span>
                      </div>
                      <p className='text-xs text-muted-foreground ml-7'>
                        {'Details: '}
                        {profession.profession_details}
                      </p>
                    </div>
                    <div className='gap-2 hidden md:flex'>
                      <div
                        className='cursor-pointer'
                        onClick={() => {
                          setSelectedProfession(profession);
                          setOpenEditProfession(true);
                        }}
                      >
                        <EditBulkIcon className='size-6' />
                      </div>
                      <div
                        className='cursor-pointer'
                        onClick={() => {
                          const updatedProfessions =
                            formData.professions.filter((_, i) => i !== index);
                          setFormData(prev => ({
                            ...prev,
                            professions: updatedProfessions,
                          }));
                        }}
                      >
                        <TrashBulkIcon className='size-6' />
                      </div>
                    </div>
                  </div>
                  <div className='flex flex-wrap justify-between gap-2 mt-4'>
                    <div className='text-xs'>
                      <span className='font-medium'>{t('Expericene:')}</span>{' '}
                      {
                        experience_options.find(
                          item => item.value === profession.years_experience,
                        )?.label
                      }
                    </div>

                    <div className='text-xs'>
                      <span className='font-medium'>{t('Availability:')}</span>{' '}
                      {
                        scheduleOptions.find(
                          item => item.value === profession.availability,
                        )?.label
                      }
                    </div>

                    <div className='text-xs'>
                      <span className='font-medium'>
                        {t('Price Per Hour:')}
                      </span>{' '}
                      <span className='text-green-700'>
                        {profession.pricePerHour.amount
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
                        {' Ft/h'}
                      </span>
                    </div>

                    <div className='flex gap-2 md:hidden mt-4 ml-auto'>
                      <div
                        className='cursor-pointer'
                        onClick={() => {
                          setSelectedProfession(profession);
                          setOpenEditProfession(true);
                        }}
                      >
                        <EditBulkIcon className='size-6' />
                      </div>
                      <div
                        className='cursor-pointer'
                        onClick={() => {
                          const updatedProfessions =
                            formData.professions.filter((_, i) => i !== index);
                          setFormData(prev => ({
                            ...prev,
                            professions: updatedProfessions,
                          }));
                        }}
                      >
                        <TrashBulkIcon className='size-6' />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
            <form action={formActionStep3} ref={ref3}>
              {formData.professions.length === 0 && (
                <div className='text-xs text-muted-foreground text-center w-full bg-tertiary h-10 rounded-md flex items-center justify-center'>
                  {t('There is no item to display.')}
                </div>
              )}
              {stateStep3?.errors?.professions && (
                <p className='text-xs text-red-500 mt-1'>
                  {stateStep3.errors.professions?.[0]}
                </p>
              )}

              {formData.professions.length >= 3 ? null : (
                <div className='w-full flex justify-end mt-2'>
                  <Button
                    className='w-fit text-xs'
                    onClick={() => {
                      setSelectedProfession(undefined);
                      setOpenEditProfession(true);
                    }}
                  >
                    <PlusIcon className='stroke-2' />
                    {t('Add Profession')}
                  </Button>
                </div>
              )}

              <input
                type='hidden'
                name='professions'
                value={JSON.stringify(formData.professions)}
              />

              <div className='space-y-1 relative mt-2'>
                <Label htmlFor='languages_spoken'>
                  {t('Languages Spoken')}
                  <span className='text-red-500 ml-1'>*</span>
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
            </form>
          </div>
        )}
        {currentStep === 3 && (
          <form action={formActionStep4} ref={ref4}>
            <div className='flex flex-col gap-3 mt-6'>
              <Label htmlFor='profile_photo'>
                {t('1- Upload your profile photo (face)')}
                <span className='text-red-500 ml-1'>*</span>
              </Label>
              <input
                id='profile_photo'
                type='file'
                name='profile_photo'
                hidden
                ref={profilePhotoRef}
              />

              <Dropzone
                accept={{ 'image/*': ['.png', '.jpg', '.jpeg'] }}
                onDrop={handleDrop1}
                onError={console.error}
                src={files1}
                maxFiles={1}
                maxSize={1024 * 1024 * 10}
                className='flex-1 border-orange-400 border-dashed'
              >
                <DropzoneEmptyState />
                <DropzoneContent>
                  {filePreview1 && (
                    <div className='h-[102px] w-full flex items-center justify-center'>
                      <Image
                        alt='Preview'
                        className='h-30 w-30 object-cover'
                        src={filePreview1}
                        width={200}
                        height={200}
                        unoptimized
                      />
                    </div>
                  )}
                </DropzoneContent>
              </Dropzone>
            </div>

            <div className='flex flex-col gap-3 mt-6'>
              <Label htmlFor='id_card_front'>
                {t('2- Upload your ID card front side')}
                <span className='text-red-500 ml-1'>*</span>
              </Label>
              <input
                id='id_card_front'
                type='file'
                name='id_card_front'
                hidden
                ref={idCardFrontRef}
              />
              <Dropzone
                accept={{ 'image/*': ['.png', '.jpg', '.jpeg'] }}
                onDrop={handleDrop2}
                onError={console.error}
                src={files2}
                maxFiles={1}
                maxSize={1024 * 1024 * 10}
                className='flex-1 border-orange-400 border-dashed'
              >
                <DropzoneEmptyState />
                <DropzoneContent>
                  {filePreview2 && (
                    <div className='h-[102px] w-full flex items-center justify-center'>
                      <Image
                        alt='Preview'
                        className='h-30 w-48 object-cover'
                        src={filePreview2}
                        width={200}
                        height={200}
                        unoptimized
                      />
                    </div>
                  )}
                </DropzoneContent>
              </Dropzone>
            </div>

            <div className='flex flex-col gap-3 mt-6'>
              <Label htmlFor='id_card_back'>
                {t('3- Upload your ID card back side')}
                <span className='text-red-500 ml-1'>*</span>
              </Label>
              <input
                id='id_card_back'
                type='file'
                name='id_card_back'
                hidden
                ref={idBCardBackRef}
              />
              <Dropzone
                accept={{ 'image/*': ['.png', '.jpg', '.jpeg'] }}
                onDrop={handleDrop3}
                onError={console.error}
                src={files3}
                maxFiles={1}
                maxSize={1024 * 1024 * 10}
                className='flex-1 border-orange-400 border-dashed'
              >
                <DropzoneEmptyState />
                <DropzoneContent>
                  {filePreview3 && (
                    <div className='h-[102px] w-full flex items-center justify-center'>
                      <Image
                        alt='Preview'
                        className='h-30 w-48 object-cover'
                        src={filePreview3}
                        width={200}
                        height={200}
                        unoptimized
                      />
                    </div>
                  )}
                </DropzoneContent>
              </Dropzone>
            </div>

            <div className='flex flex-col gap-3 mt-6'>
              <Label htmlFor='address_card'>
                {t('4- Upload your address card')}
                <span className='text-red-500 ml-1'>*</span>
              </Label>
              <input
                id='address_card'
                type='file'
                name='address_card'
                hidden
                ref={addressCardRef}
              />
              <Dropzone
                accept={{ 'image/*': ['.png', '.jpg', '.jpeg'] }}
                onDrop={handleDrop4}
                onError={console.error}
                src={files4}
                maxFiles={1}
                maxSize={1024 * 1024 * 10}
                className='flex-1 border-orange-400 border-dashed'
              >
                <DropzoneEmptyState />
                <DropzoneContent>
                  {filePreview4 && (
                    <div className='h-[102px] w-full flex items-center justify-center'>
                      <Image
                        alt='Preview'
                        className='h-30 w-48 object-cover'
                        src={filePreview4}
                        width={200}
                        height={200}
                        unoptimized
                      />
                    </div>
                  )}
                </DropzoneContent>
              </Dropzone>
            </div>
          </form>
        )}
      </CardContent>

      {/* Profession Dialog */}
      <Dialog open={openEditProfession} onOpenChange={setOpenEditProfession}>
        <DialogContent className='sm:max-w-[425px]'>
          <DialogHeader>
            <DialogTitle>{t('Profession Details')}</DialogTitle>
            <DialogDescription>
              {t('Please provide your profession details below.')}
            </DialogDescription>
          </DialogHeader>
          <form action={formActionProfession}>
            <div className='grid gap-2 mb-4'>
              <div className='space-y-1 relative'>
                <Label htmlFor='profession'>
                  {t('Select Your Profession')}
                </Label>
                <SearchableSelect
                  name='profession'
                  items={services_options}
                  placeholder={t('Select one ...')}
                  defaultValue={
                    stateProfession?.data?.profession ||
                    selectedProfession?.profession
                      ? selectedProfession?.profession
                      : undefined
                  }
                  className={
                    stateProfession?.errors?.profession && 'border-red-500'
                  }
                />
                {stateProfession?.errors?.profession && (
                  <p className='text-xs text-red-500'>
                    {stateProfession.errors.profession}
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
                    stateProfession?.data?.profession_details ||
                    selectedProfession?.profession_details
                      ? selectedProfession?.profession_details
                      : undefined
                  }
                  className={
                    stateProfession?.errors?.profession_details &&
                    'border-red-500'
                  }
                />
                {stateProfession?.errors?.profession_details && (
                  <p className='text-xs text-red-500'>
                    {stateProfession.errors.profession_details}
                  </p>
                )}
              </div>

              <div className='space-y-1 relative'>
                <Label htmlFor='years_experience'>
                  {t('How many years of experience do you have?')}
                </Label>
                <Select
                  defaultValue={
                    stateProfession?.data?.years_experience ||
                    (selectedProfession?.years_experience &&
                      selectedProfession?.years_experience.length > 0)
                      ? selectedProfession?.years_experience
                      : undefined
                  }
                  name='years_experience'
                >
                  <SelectTrigger
                    className={cn(
                      'w-full',
                      stateProfession?.errors?.years_experience &&
                        'border-red-500',
                    )}
                    name='years_experience'
                  >
                    <SelectValue placeholder={t('Select one ...')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {experience_options.map(opt => (
                        <SelectItem key={opt.value} value={opt.value}>
                          {opt.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                {stateProfession?.errors?.years_experience && (
                  <p className='text-xs text-red-500'>
                    {stateProfession.errors.years_experience?.[0]}
                  </p>
                )}
              </div>

              <div className='space-y-1 relative'>
                <Label htmlFor='availability'>{t('Availability')}</Label>

                <Select
                  name='availability'
                  defaultValue={
                    stateProfession?.data?.availability ||
                    (selectedProfession?.availability &&
                      selectedProfession?.availability.length > 0)
                      ? selectedProfession?.availability
                      : undefined
                  }
                >
                  <SelectTrigger
                    className={cn(
                      'w-full',
                      stateProfession?.errors?.availability && 'border-red-500',
                    )}
                  >
                    <SelectValue placeholder={t('Select one ...')} />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectGroup>
                      {scheduleOptions.map(opt => (
                        <SelectItem key={opt.value} value={opt.value}>
                          {opt.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>

                {stateProfession?.errors?.availability && (
                  <p className='text-xs text-red-500'>
                    {stateProfession.errors.availability}
                  </p>
                )}
              </div>

              <div className='space-y-1 relative'>
                <Label htmlFor='price_per_hour'>
                  {t('Price Per Hour (HUF)')}
                </Label>
                <Input
                  id='price_per_hour'
                  placeholder={t('e.g., 15000 HUF')}
                  name='price_per_hour'
                  type='number'
                  defaultValue={
                    stateProfession?.data?.price_per_hour ||
                    selectedProfession?.pricePerHour
                      ? selectedProfession?.pricePerHour?.amount
                      : undefined
                  }
                  className={
                    stateProfession?.errors?.price_per_hour && 'border-red-500'
                  }
                />
                {stateProfession?.errors?.price_per_hour && (
                  <p className='text-xs text-red-500'>
                    {stateProfession.errors.price_per_hour}
                  </p>
                )}
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant='outline'>{t('Cancel')}</Button>
              </DialogClose>
              <Button
                type='submit'
                isLoading={isPendingProfession}
                disabled={isPendingProfession}
              >
                {selectedProfession?.profession
                  ? t('Save changes')
                  : t('Add Profession')}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

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
