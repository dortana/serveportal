'use client';

import { UserRole, UserStatus } from '@/app/generated/prisma/client';
import { useTranslations } from 'next-intl';
import AdminIcon from '@/components/icons/AdminIcon';
import ActiveStatusIcon from '@/components/icons/ActiveStatusIcon';
import CustomerIcon from '@/components/icons/CustomerIcon';
import EmployeeIcon from '@/components/icons/EmployeeIcon';
import UserIdVerificationIcon from '@/components/icons/UserIdVerificationIcon';
import CancelCircleIcon from '@/components/icons/CancelCircleIcon';
import StopCircleIcon from '@/components/icons/StopCircleIcon';
import HelpCircleIcon from '@/components/icons/HelpCircleIcon';

export const useRolesIcon = () => {
  const t = useTranslations();

  return [
    {
      value: UserRole.ADMIN,
      label: t('Admin'),
      icon: <AdminIcon />,
    },
    {
      value: UserRole.EXPERT,
      label: t('Expert'),
      icon: <UserIdVerificationIcon variant='bulk' />,
    },
    {
      value: UserRole.USER,
      label: t('Customer'),
      icon: <CustomerIcon />,
    },
    {
      value: UserRole.EMPLOYEE,
      label: t('Employee'),
      icon: <EmployeeIcon />,
    },
  ];
};

export const useStatusesIcon = () => {
  const t = useTranslations();

  return [
    {
      value: UserStatus.ACTIVE,
      label: t('Active'),
      icon: <ActiveStatusIcon />,
    },
    {
      value: UserStatus.BANNED,
      label: t('Banned'),
      icon: <CancelCircleIcon />,
    },
    {
      value: UserStatus.BLOCKED,
      label: t('Blocked'),
      icon: <StopCircleIcon />,
    },
    {
      value: UserStatus.DISABLED,
      label: t('Disabled'),
      icon: <HelpCircleIcon />,
    },
  ];
};
