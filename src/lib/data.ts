import { getTranslations } from 'next-intl/server';
import CarServiceIcon from '@/components/icons/services/CarServiceIcon';
import BarberIcon from '@/components/icons/services/BarberIcon';
import HomeIcon from '@/components/icons/services/HomeIcon';
import CookingIcon from '@/components/icons/services/CookingIcon';
import AssembleIcon from '@/components/icons/services/AssembleIcon';
import ElectricityIcon from '@/components/icons/services/ElectricityIcon';
import PipeIcon from '@/components/icons/services/PipeIcon';
import CleaningIcon from '@/components/icons/services/CleaningIcon';

export const langs = [
  {
    lang: 'English',
    code: 'en-US',
  },
  {
    lang: 'Magyar',
    code: 'hu-HU',
  },
];

export const app_name = 'ServePortal';
export const app_slogan = 'Your gateway to reliable expert';
export const companyAddress = '1117 Budapest, Szerémi út 4.';
export const companyEmail = 'support@serveportal.com';
export const companyPhone = '+36 30 527 5249';

export const socialLinks = {
  facebook: 'https://www.facebook.com/serveportal',
  instagram: 'https://www.instagram.com/serveportal',
  youtube: 'https://www.youtube.com/@serveportal',
  linkedin: 'https://www.linkedin.com/company/serveportal',
};

export const operation_places = [
  {
    name: 'Hungary',
    code: 'HU',
    cities: [
      'Budapest',
      'Debrecen',
      'Szeged',
      'Miskolc',
      'Pécs',
      'Győr',
      'Nyíregyháza',
      'Kecskemét',
      'Székesfehérvár',
      'Szombathely',
      'Eger',
      'Tatabánya',
      'Veszprém',
      'Békéscsaba',
      'Zalaegerszeg',
    ],
  },
];

export const fetchServices = async () => {
  const t = await getTranslations();

  return [
    {
      id: 1,
      label: t('Renovation'),
      value: 'renovation',
      icon: HomeIcon,
      isPopular: true,
    },
    {
      id: 2,
      label: t('Electrical Services'),
      value: 'electrical_services',
      icon: ElectricityIcon,
      isPopular: true,
    },
    {
      id: 3,
      label: t('Cleaning'),
      value: 'cleaning',
      icon: CleaningIcon,
      isPopular: true,
    },
    {
      id: 4,
      label: t('Auto Services'),
      value: 'auto_services',
      icon: CarServiceIcon,
      isPopular: true,
    },
    {
      id: 5,
      label: t('Beauty'),
      value: 'beauty',
      icon: BarberIcon,
      isPopular: true,
    },
    {
      id: 6,
      label: t('Furniture Assembly'),
      value: 'furniture_assembly',
      icon: AssembleIcon,
      isPopular: true,
    },
    {
      id: 7,
      label: t('Private Chef'),
      value: 'private_chef',
      icon: CookingIcon,
      isPopular: true,
    },
    {
      id: 8,
      label: t('Plumbing'),
      value: 'plumbing',
      icon: PipeIcon,
      isPopular: true,
    },
    {
      id: 9,
      label: t('Test'),
      value: 'test',
      icon: PipeIcon,
      isPopular: false,
    },
    {
      id: 10,
      label: t('Ester'),
      value: 'ester',
      icon: PipeIcon,
      isPopular: false,
    },
  ];
};
