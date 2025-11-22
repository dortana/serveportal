'use client';

import { useMemo } from 'react';
import { useTranslations } from 'next-intl';

import CarServiceIcon from '@/components/icons/services/CarServiceIcon';
import BarberIcon from '@/components/icons/services/BarberIcon';
import HomeIcon from '@/components/icons/services/HomeIcon';
import CookingIcon from '@/components/icons/services/CookingIcon';
import AssembleIcon from '@/components/icons/services/AssembleIcon';
import ElectricityIcon from '@/components/icons/services/ElectricityIcon';
import PipeIcon from '@/components/icons/services/PipeIcon';
import CleaningIcon from '@/components/icons/services/CleaningIcon';
import EraserIcon from '@/components/icons/services/EraserIcon';
import TreeIcon from '@/components/icons/services/TreeIcon';
import { PROFESSION_VALUES } from '@/lib/data';

export function useServices() {
  const t = useTranslations();

  return useMemo(
    () => [
      {
        id: 1,
        label: t('Renovation'),
        value: PROFESSION_VALUES[0],
        icon: HomeIcon,
        isPopular: true,
      },
      {
        id: 2,
        label: t('Electrical Services'),
        value: PROFESSION_VALUES[1],
        icon: ElectricityIcon,
        isPopular: true,
      },
      {
        id: 3,
        label: t('Cleaning'),
        value: PROFESSION_VALUES[2],
        icon: CleaningIcon,
        isPopular: true,
      },
      {
        id: 4,
        label: t('Auto Services'),
        value: PROFESSION_VALUES[3],
        icon: CarServiceIcon,
        isPopular: true,
      },
      {
        id: 5,
        label: t('Beauty'),
        value: PROFESSION_VALUES[4],
        icon: BarberIcon,
        isPopular: true,
      },
      {
        id: 6,
        label: t('Furniture Assembly'),
        value: PROFESSION_VALUES[5],
        icon: AssembleIcon,
        isPopular: true,
      },
      {
        id: 7,
        label: t('Private Chef'),
        value: PROFESSION_VALUES[6],
        icon: CookingIcon,
        isPopular: true,
      },
      {
        id: 8,
        label: t('Plumbing'),
        value: PROFESSION_VALUES[7],
        icon: PipeIcon,
        isPopular: true,
      },
      {
        id: 9,
        label: t('Car Wash'),
        value: PROFESSION_VALUES[8],
        icon: EraserIcon,
        isPopular: false,
      },
      {
        id: 10,
        label: t('Gardening'),
        value: PROFESSION_VALUES[9],
        icon: TreeIcon,
        isPopular: false,
      },
    ],
    [t],
  );
}
