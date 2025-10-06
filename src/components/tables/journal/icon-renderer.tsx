'use client';
import BankCardIcon from '@/components/icons/BankCardIcon';
import CashIcon from '@/components/icons/CashIcon';
import { JournalDocumentType } from '@prisma/client';
import { useTranslations } from 'next-intl';

export const JournalDocumentTypes = () => {
  const t = useTranslations();
  return [
    {
      value: JournalDocumentType.BA,
      label: t('Bank Card'),
      icon: <BankCardIcon />,
    },
    {
      value: JournalDocumentType.KA,
      label: t('Cash'),
      icon: <CashIcon />,
    },
  ];
};
