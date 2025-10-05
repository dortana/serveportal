'use client';
import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import DashboardIcon from '@/components/icons/DashboardIcon';
import InvoiceIcon from '@/components/icons/InvoiceIcon';
import { useTranslations } from 'next-intl';

const PanelSidebar = ({
  onLinkClick,
  className,
}: {
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
    { id: 2, title: t('Invoices'), icon: InvoiceIcon, href: '/panel/invoices' },
  ];
  return (
    <div
      className={clsx('h-full w-2xs bg-white rounded-lg space-y-4', className)}
    >
      <div className='p-4 flex gap-2 items-center'>
        <Avatar className='size-14'>
          <AvatarImage src='https://github.com/shadcn.png' />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className='flex flex-col justify-center'>
          <span>Kapas User</span>
          <span className='text-muted-foreground text-sm'>
            info@dortana.com
          </span>
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
              'flex gap-2 rounded-tl-sm rounded-bl-sm px-4 border-l-6 w-full items-center',
              isActive
                ? 'border-black'
                : 'border-white hover:text-brand transform transition-all duration-300',
            )}
            href={item.href}
            onClick={onLinkClick}
          >
            <Icon
              className={clsx(
                'size-7',
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
