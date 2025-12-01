'use client';

import CashIcon from '@/components/icons/CashIcon';
import TransferIcon from '@/components/icons/TransferIcon';
import { JournalDocumentType } from '@/app/generated/prisma/client';
import { useTranslations } from 'next-intl';
import BankIcon from '@/components/icons/BankIcon';

export const useJournalDocumentTypes = () => {
  const t = useTranslations();

  return [
    {
      value: JournalDocumentType.KA,
      label: t('Cash (Kassa)'),
      icon: <CashIcon />,
    },
    {
      value: JournalDocumentType.BA,
      label: t('Bank Austria'),
      icon: <BankIcon />,
    },
    {
      value: JournalDocumentType.RB,
      label: t('Raiffeisen Bank'),
      icon: <BankIcon />,
    },
    {
      value: JournalDocumentType.VB,
      label: t('Volksbank'),
      icon: <BankIcon />,
    },
    {
      value: JournalDocumentType.BK,
      label: t('Other Banks'),
      icon: <BankIcon />,
    },
    {
      value: JournalDocumentType.UM,
      label: t('Transfer / Rebooking'),
      icon: <TransferIcon />,
    },
  ];
};
