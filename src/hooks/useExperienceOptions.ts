'use client';

import { useMemo } from 'react';
import { useTranslations } from 'next-intl';

export function useExperienceOptions() {
  const t = useTranslations();

  return useMemo(
    () => [
      {
        id: 1,
        label: t('Less than 1 year'),
        value: 'less_1',
      },
      {
        id: 2,
        label: t('1 to 3 years'),
        value: '1_3',
      },
      {
        id: 3,
        label: t('3 to 6 years'),
        value: '3_6',
      },
      {
        id: 4,
        label: t('6 to 10 years'),
        value: '6_10',
      },
      {
        id: 5,
        label: t('More than 10 years'),
        value: 'more_10',
      },
    ],
    [t],
  );
}
