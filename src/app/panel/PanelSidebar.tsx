'use client';
import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import DashboardIcon from '@/components/icons/DashboardIcon';
import JournalIcon from '@/components/icons/JournalIcon';
import { useTranslations } from 'next-intl';
import { User } from '@prisma/client';
import ProfileIcon from '@/components/icons/ProfileIcon';
import SettingIcon from '@/components/icons/SettingIcon';

const PanelSidebar = ({
  user,
  onLinkClick,
  className,
}: {
  user: User;
  className?: string;
  onLinkClick?: () => void;
}) => {
  const pathname = usePathname();
  const t = useTranslations();
  const sidebarLinks = [
    {
      id: 1,
      title: t('Dashboard'),
      icon: DashboardIcon,
      href: '/panel/dashboard',
    },
    {
      id: 2,
      title: t('Profile'),
      icon: ProfileIcon,
      href: '/panel/profile',
    },
    { id: 3, title: t('Journals'), icon: JournalIcon, href: '/panel/journals' },
    { id: 4, title: t('Settings'), icon: SettingIcon, href: '/panel/settings' },
  ];

  return (
    <div
      className={clsx('h-full w-2xs bg-white rounded-lg space-y-4', className)}
    >
      <div className='p-4 flex gap-2 items-center'>
        <Avatar className='size-14'>
          <AvatarImage src={user.image ?? 'https://github.com/shadcn.png'} />
          <AvatarFallback>
            {user.firstName.charAt(0).toUpperCase() +
              user.lastName.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div className='flex flex-col justify-center'>
          <span>{user.firstName + ' ' + user.lastName}</span>
          <span className='text-muted-foreground text-sm'>{user.email}</span>
        </div>
      </div>
      <hr className='-mt-4' />

      {sidebarLinks.map(item => {
        const Icon = item.icon;
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.id}
            className={clsx(
              'flex gap-2 rounded-tl-sm rounded-bl-sm border-l-6 w-full items-center',
              isActive
                ? 'border-black'
                : 'border-white hover:text-brand transform transition-all duration-300',
            )}
            href={item.href}
            onClick={onLinkClick}
          >
            <Icon
              className={clsx(
                'size-7 ml-4',
                !isActive &&
                  'hover:stroke-brand transform transition-all duration-300',
              )}
              variant={isActive ? 'bulk' : 'stroke'}
            />
            <span
              className={clsx(
                'w-full py-2 rounded-tr-sm rounded-br-sm',
                isActive
                  ? 'font-semibold bg-gradient-to-r from-white to-gray-300'
                  : 'hover:text-brand transform transition-all duration-300',
              )}
            >
              {item.title}
            </span>
          </Link>
        );
      })}
    </div>
  );
};

export default PanelSidebar;
