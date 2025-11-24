'use client';

import { useMemo } from 'react';
import { useTranslations } from 'next-intl';

export function useWorkScheduleOptions() {
  const t = useTranslations();

  return useMemo(
    () => [
      {
        id: 1,
        label: t('Full-time'),
        value: 'full_time',
      },
      {
        id: 2,
        label: t('Part-time'),
        value: 'part_time',
      },
      {
        id: 3,
        label: t('Weekends only'),
        value: 'weekends_only',
      },
      {
        id: 4,
        label: t('Evenings'),
        value: 'evenings',
      },
      {
        id: 5,
        label: t('Custom schedule'),
        value: 'custom',
      },
    ],
    [t],
  );
}
