'use client';
import { UserStatus } from '@/app/generated/prisma/client';
import React from 'react';
import { useStatusesIcon } from './icon-renderer';

const StatusCom = ({
  status,
  iconClassName = 'h-6 w-6',
}: {
  status: UserStatus;
  iconClassName?: string;
}) => {
  const statusesIcon = useStatusesIcon();
  const foundRole = statusesIcon.find(item => item.value === status)!;

  return (
    <div className='flex items-center gap-1'>
      {foundRole?.icon &&
        React.cloneElement(foundRole?.icon, {
          className: 'text-muted-foreground' + iconClassName,
        })}
      <span className='text-sm'>{foundRole?.label}</span>
    </div>
  );
};

export default StatusCom;
