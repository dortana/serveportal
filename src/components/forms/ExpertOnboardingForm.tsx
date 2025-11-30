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
  onBoardingProfessionAction,
  onBoardingStep1Action,
  onBoardingStep2Action,
  onBoardingStep3Action,
  onBoardingStep4Action,
} from '@/actions/user';
import { cn, formatCurrencyHuf } from '@/lib/utils';
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
import NumberInput from '../ui/number-input';
import ReviewIcon from '../icons/ReviewIcon';
import {
  ExpertiseDetails,
  OnBoardingStatus,
  User,
} from '@/app/generated/prisma/client';

const ExpertOnboardingForm = ({ user }: { user: User }) => {
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
    languagesSpoken: string;
    profilePhoto: string;
    idCardFront: string;
    idCardBack: string;
    addressCard: string;
  }>({
    // Step1
    phone: user.phone ?? '',
    dob: user.dob ?? '',
    // Step2
    country: user.address?.country || 'HU',
    addressLine1: user.address?.addressLine1 || '',
    addressLine2: user.address?.addressLine2 || '',
    state: user.address?.state || '',
    city: user.address?.city || '',
    postalCode: user.address?.postalCode || '',
    // Step3
    professions: user.professions ?? [],
    languagesSpoken: user.languagesSpoken ?? '',
    // Step4
    profilePhoto: user.docsUrls?.profilePhoto ?? '',
    idCardFront: user.docsUrls?.idCardFront ?? '',
    idCardBack: user.docsUrls?.idCardBack ?? '',
    addressCard: user.docsUrls?.addressCard ?? '',
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

  const [currentStep, setCurrentStep] = useState(
    user.onBoardingStatus === OnBoardingStatus.PERSONAL_INFO
      ? 0
      : user.onBoardingStatus === OnBoardingStatus.ADDRESS_INFO
        ? 1
        : user.onBoardingStatus === OnBoardingStatus.EXPERTISE_DETAILS
          ? 2
          : user.onBoardingStatus === OnBoardingStatus.DOCUMENTS_UPLOAD
            ? 3
            : 4,
  );
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

  const [openEditProfession, setOpenEditProfession] = useState(false);
  const [selectedProfession, setSelectedProfession] =
    useState<ExpertiseDetails>();

  //@ts-ignore
  const steps = [
    {
      title: t('Personal Info'),
      description: t('Your basic information'),
      icon: <NoteDoneIcon />,
    },
    {
      title: t('Address Info'),
      description: t('Where do you live?'),
      icon: <LocationIcon />,
    },
    {
      title: t('Expertise Details'),
      description: t('Your professional info'),
      icon: <PermanentJobIcon />,
    },
    {
      title: t('Document Upload'),
      description: t('Upload your documents'),
      icon: <CameraIcon />,
    },
    {
      title: t('Review'),
      description: t('Submit your information'),
      icon: <ReviewIcon />,
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
          professionDetails: stateProfession.data.professionDetails,
          yearsExperience: stateProfession.data.yearsExperience,
          availability: stateProfession.data.availability,
          pricePerHour: {
            currency: 'HUF',
            amount: stateProfession.data.pricePerHour,
          },
          rate: null,
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

  // Handle side effects for step 3
  useEffect(() => {
    if (stateStep3?.data?.professions && !stateStep3.errors) {
      setFormData(prev => ({
        ...prev,
        professions: stateStep3.data.professions,
        languagesSpoken: stateStep3.data.languagesSpoken,
      }));
      setCurrentStep(3);
    } else if (stateStep3?.errors) {
      toast.error(t('Error'), {
        description: t('Validation failed, please check your inputs.'),
      });
    }
  }, [stateStep3, t]);

  // Handle side effects for step 4
  useEffect(() => {
    if (stateStep4?.data?.success && !stateStep4.errors) {
      toast.success(t('Success'), {
        description: t('Your onboarding information has been saved.'),
      });
      setCurrentStep(4);
    } else if (stateStep4?.errors) {
      toast.error(t('Error'), {
        description: t('Validation failed, please check your inputs.'),
      });

      if (filePreview1 && profilePhotoRef.current) {
        profilePhotoRef.current.files = createFileList(files1 || []);
      }
      if (filePreview2 && idCardFrontRef.current) {
        idCardFrontRef.current.files = createFileList(files2 || []);
      }
      if (filePreview3 && idBCardBackRef.current) {
        idBCardBackRef.current.files = createFileList(files3 || []);
      }
      if (filePreview4 && addressCardRef.current) {
        addressCardRef.current.files = createFileList(files4 || []);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stateStep4, t]);

  const createFileList = (files: File[]) => {
    const dt = new DataTransfer();
    files.forEach(file => dt.items?.add(file));
    return dt.files;
  };

  const [files1, setFiles1] = useState<File[] | undefined>();
  const [filePreview1, setFilePreview1] = useState<string | undefined>();
  const handleDrop1 = (files: File[]) => {
    setFiles1(files);
    if (files.length > 0) {
      if (profilePhotoRef.current) {
        profilePhotoRef.current.files = createFileList(files);
        // Trigger change event to ensure form data is updated
        profilePhotoRef.current.dispatchEvent(
          new Event('change', { bubbles: true }),
        );
      }

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
      if (idCardFrontRef.current) {
        idCardFrontRef.current.files = createFileList(files);
        // Trigger change event to ensure form data is updated
        idCardFrontRef.current.dispatchEvent(
          new Event('change', { bubbles: true }),
        );
      }

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
      if (idBCardBackRef.current) {
        idBCardBackRef.current.files = createFileList(files);
        // Trigger change event to ensure form data is updated
        idBCardBackRef.current.dispatchEvent(
          new Event('change', { bubbles: true }),
        );
      }

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
      if (addressCardRef.current) {
        addressCardRef.current.files = createFileList(files);
        // Trigger change event to ensure form data is updated
        addressCardRef.current.dispatchEvent(
          new Event('change', { bubbles: true }),
        );
      }

      const reader = new FileReader();
      reader.onload = e => {
        if (typeof e.target?.result === 'string') {
          setFilePreview4(e.target?.result);
        }
      };
      reader.readAsDataURL(files[0]);
    }
  };

  return (
    <Card className='border-0 shadow-none w-full'>
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

      <CardContent className='grid gap-6 px-0 w-full md:max-w-3xl mx-auto md:py-10'>
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
            <Label htmlFor='languagesSpoken'>
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
                        {profession.professionDetails}
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
                          item => item.value === profession.yearsExperience,
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
                        {formatCurrencyHuf(profession.pricePerHour.amount)}
                        {'/h'}
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
                    type='button'
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
                <Label htmlFor='languagesSpoken'>
                  {t('Languages Spoken')}
                  <span className='text-red-500 ml-1'>*</span>
                </Label>

                <MultiSelect
                  name='languagesSpoken'
                  defaultValues={
                    stateStep3?.data?.languagesSpoken.split(',') ||
                    formData?.languagesSpoken.length > 0
                      ? formData.languagesSpoken.split(',')
                      : undefined
                  }
                >
                  <MultiSelectTrigger
                    className={cn(
                      'w-full',
                      stateStep3?.errors?.languagesSpoken && 'border-red-500',
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

                {stateStep3?.errors?.languagesSpoken && (
                  <p className='text-xs text-red-500'>
                    {stateStep3.errors.languagesSpoken?.[0]}
                  </p>
                )}
              </div>
            </form>
          </div>
        )}
        {currentStep === 3 && (
          <form action={formActionStep4} ref={ref4}>
            <div className='flex flex-col gap-3 mt-6'>
              <Label htmlFor='profilePhoto'>
                {t('1- Upload your profile photo (face)')}
                <span className='text-red-500 ml-1'>*</span>
              </Label>
              <input
                id='profilePhoto'
                type='file'
                name='profilePhoto'
                hidden
                ref={profilePhotoRef}
              />

              <Dropzone
                accept={{
                  'image/png': ['.png'],
                  'image/jpeg': ['.jpg', '.jpeg'],
                }}
                onDrop={handleDrop1}
                onError={console.error}
                src={files1}
                maxFiles={1}
                maxSize={1024 * 1024 * 10}
                className='flex-1 border-brand-blue border-dashed'
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
              {stateStep4?.errors?.profilePhoto && (
                <p className='text-xs text-red-500'>
                  {stateStep4.errors.profilePhoto?.[0]}
                </p>
              )}
            </div>

            <div className='flex flex-col gap-3 mt-6'>
              <Label htmlFor='idCardFront'>
                {t('2- Upload your ID card front side')}
                <span className='text-red-500 ml-1'>*</span>
              </Label>
              <input
                id='idCardFront'
                type='file'
                name='idCardFront'
                hidden
                ref={idCardFrontRef}
              />
              <Dropzone
                accept={{
                  'image/png': ['.png'],
                  'image/jpeg': ['.jpg', '.jpeg'],
                }}
                onDrop={handleDrop2}
                onError={console.error}
                src={files2}
                maxFiles={1}
                maxSize={1024 * 1024 * 10}
                className='flex-1 border-brand-blue border-dashed'
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
              {stateStep4?.errors?.idCardFront && (
                <p className='text-xs text-red-500'>
                  {stateStep4.errors.idCardFront?.[0]}
                </p>
              )}
            </div>

            <div className='flex flex-col gap-3 mt-6'>
              <Label htmlFor='idCardBack'>
                {t('3- Upload your ID card back side')}
                <span className='text-red-500 ml-1'>*</span>
              </Label>
              <input
                id='idCardBack'
                type='file'
                name='idCardBack'
                hidden
                ref={idBCardBackRef}
              />
              <Dropzone
                accept={{
                  'image/png': ['.png'],
                  'image/jpeg': ['.jpg', '.jpeg'],
                }}
                onDrop={handleDrop3}
                onError={console.error}
                src={files3}
                maxFiles={1}
                maxSize={1024 * 1024 * 10}
                className='flex-1 border-brand-blue border-dashed'
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

              {stateStep4?.errors?.idCardBack && (
                <p className='text-xs text-red-500'>
                  {stateStep4.errors.idCardBack?.[0]}
                </p>
              )}
            </div>

            <div className='flex flex-col gap-3 mt-6'>
              <Label htmlFor='addressCard'>
                {t('4- Upload your address card')}
                <span className='text-red-500 ml-1'>*</span>
              </Label>
              <input
                id='addressCard'
                type='file'
                name='addressCard'
                hidden
                ref={addressCardRef}
              />
              <Dropzone
                accept={{
                  'image/png': ['.png'],
                  'image/jpeg': ['.jpg', '.jpeg'],
                }}
                onDrop={handleDrop4}
                onError={console.error}
                src={files4}
                maxFiles={1}
                maxSize={1024 * 1024 * 10}
                className='flex-1 border-brand-blue border-dashed'
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

              {stateStep4?.errors?.addressCard && (
                <p className='text-xs text-red-500'>
                  {stateStep4.errors.addressCard?.[0]}
                </p>
              )}
            </div>
          </form>
        )}
        {currentStep === 4 && (
          <div className='flex flex-col justify-center items-center bg-orange-100 gap-2 p-10 rounded-md'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 24 24'
              width='40'
              height='40'
              color='currentColor'
              fill='none'
              className='text-orange-500'
            >
              <path
                opacity='0.4'
                fillRule='evenodd'
                clipRule='evenodd'
                d='M6.94315 0.949219C5.13681 0.949219 3.33751 2.20156 3.25421 4.23521C3.16084 6.51476 4.78989 7.96114 6.02989 9.01301C6.93644 9.78203 7.54545 10.301 7.94968 10.7409C8.34207 11.1679 8.42619 11.4011 8.44277 11.5707C8.45112 11.6562 8.45112 11.7422 8.44277 11.8277C8.42619 11.9974 8.34207 12.2305 7.94968 12.6575C7.54545 13.0974 6.93644 13.6164 6.02989 14.3854L5.97859 14.4289C4.72238 15.4941 3.15823 16.8204 3.25421 19.1632C3.33751 21.1969 5.13681 22.4492 6.94315 22.4492L17.0569 22.4492C18.8632 22.4492 20.6625 21.1969 20.7458 19.1632C20.8019 17.7946 20.2966 16.3999 19.1902 15.4217C18.9144 15.1779 18.6238 14.9344 18.3453 14.7011L18.3441 14.7001C18.216 14.5927 18.0904 14.4875 17.9701 14.3854C17.0636 13.6164 16.4546 13.0974 16.0503 12.6575C15.6579 12.2305 15.5738 11.9974 15.5573 11.8277C15.5489 11.7422 15.5489 11.6562 15.5573 11.5707C15.5738 11.4011 15.6579 11.1679 16.0503 10.7409C16.4546 10.301 17.0636 9.78203 17.9701 9.01301L17.9858 8.9997C19.2365 7.93879 20.8417 6.57715 20.7458 4.23521C20.6625 2.20156 18.8632 0.949219 17.0569 0.949219H6.94315ZM8.2708 19.8874C8.13113 20.1267 8.10416 20.4947 8.49392 20.4947L15.507 20.4947C15.8967 20.4947 15.8698 20.1267 15.7301 19.8874C15.51 19.5104 15.1529 19.2579 14.8733 19.0602C14.0168 18.4483 13.1085 17.699 11.9998 17.6992C10.8916 17.6995 9.98363 18.4486 9.1276 19.0602C8.84798 19.2579 8.49084 19.5104 8.2708 19.8874Z'
                fill='currentColor'
              />
              <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M8.26983 19.8874C8.13017 20.1267 8.10319 20.4947 8.49295 20.4947L15.506 20.4947C15.8958 20.4947 15.8688 20.1267 15.7291 19.8874C15.5091 19.5104 15.1519 19.2579 14.8723 19.0602C14.0159 18.4483 13.1075 17.699 11.9988 17.6992C10.8907 17.6995 9.98267 18.4486 9.12663 19.0602C8.84702 19.2579 8.48987 19.5104 8.26983 19.8874Z'
                fill='currentColor'
              />
            </svg>
            {t('Your information and documents are under review!')}
            <CardDescription className='text-center'>
              {t(
                'We will notify you once the review is complete. You will be able to access all features of our platform once approved.',
              )}
            </CardDescription>
          </div>
        )}
        {currentStep !== 4 && (
          <div className='flex justify-between'>
            <Button
              className={cn('w-32')}
              variant='outline'
              onClick={() => setCurrentStep(currentStep - 1)}
              disabled={currentStep === 0}
            >
              {t('Previous')}
            </Button>
            <Button
              className={cn('w-32')}
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
              {currentStep === steps.length - 2
                ? t('Submit for review')
                : t('Next')}
            </Button>
          </div>
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
                <Label htmlFor='professionDetails'>
                  {t('Please describe your profession in detail')}
                </Label>
                <Textarea
                  id='professionDetails'
                  placeholder={t('Tell customers about your experience')}
                  name='professionDetails'
                  defaultValue={
                    (stateProfession?.errors
                      ? stateProfession?.data?.professionDetails
                      : undefined) ??
                    selectedProfession?.professionDetails ??
                    ''
                  }
                  className={
                    stateProfession?.errors?.professionDetails &&
                    'border-red-500'
                  }
                />
                {stateProfession?.errors?.professionDetails && (
                  <p className='text-xs text-red-500'>
                    {stateProfession.errors.professionDetails}
                  </p>
                )}
              </div>

              <div className='space-y-1 relative'>
                <Label htmlFor='yearsExperience'>
                  {t('How many years of experience do you have?')}
                </Label>
                <Select
                  defaultValue={
                    stateProfession?.data?.yearsExperience ||
                    (selectedProfession?.yearsExperience &&
                      selectedProfession?.yearsExperience.length > 0)
                      ? selectedProfession?.yearsExperience
                      : undefined
                  }
                  name='yearsExperience'
                >
                  <SelectTrigger
                    className={cn(
                      'w-full',
                      stateProfession?.errors?.yearsExperience &&
                        'border-red-500',
                    )}
                    name='yearsExperience'
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
                {stateProfession?.errors?.yearsExperience && (
                  <p className='text-xs text-red-500'>
                    {stateProfession.errors.yearsExperience?.[0]}
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
                <Label htmlFor='pricePerHour'>{t('Price Per Hour')}</Label>
                <NumberInput
                  id='pricePerHour'
                  placeholder={t('e.g., 15 000 HUF')}
                  name='pricePerHour'
                  type='string'
                  defaultValue={
                    (stateProfession?.errors
                      ? stateProfession?.data?.pricePerHour
                      : undefined) ??
                    selectedProfession?.pricePerHour?.amount ??
                    ''
                  }
                  className={
                    stateProfession?.errors?.pricePerHour && 'border-red-500'
                  }
                />
                {stateProfession?.errors?.pricePerHour && (
                  <p className='text-xs text-red-500'>
                    {stateProfession.errors.pricePerHour}
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
                className='w-32'
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
    </Card>
  );
};

export default ExpertOnboardingForm;
