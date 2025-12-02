'use client';
import { UserRole } from '@/app/generated/prisma/client';
import React from 'react';
import { useRolesIcon } from './icon-renderer';

const RoleCom = ({
  role,
  iconClassName = 'h-6 w-6',
}: {
  role: UserRole;
  iconClassName?: string;
}) => {
  const rolesIcon = useRolesIcon();
  const foundRole = rolesIcon.find(item => item.value === role)!;

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

export default RoleCom;
