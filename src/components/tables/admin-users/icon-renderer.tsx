'use client';

import { UserRole, UserStatus } from '@/app/generated/prisma/client';
import { useTranslations } from 'next-intl';
import AdminIcon from '@/components/icons/AdminIcon';
import ExpertIcon from '@/components/icons/ExpertIcon';
import CustomerIcon from '@/components/icons/CustomerIcon';
import EmployeeIcon from '@/components/icons/EmployeeIcon';

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
      icon: <ExpertIcon />,
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
      icon: <AdminIcon />,
    },
    {
      value: UserStatus.BANNED,
      label: t('Banned'),
      icon: <ExpertIcon />,
    },
    {
      value: UserStatus.BLOCKED,
      label: t('Blocked'),
      icon: <CustomerIcon />,
    },
    {
      value: UserStatus.DISABLED,
      label: t('Disabled'),
      icon: <EmployeeIcon />,
    },
  ];
};
