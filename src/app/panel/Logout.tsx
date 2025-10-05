'use client';
import ExitIcon from '@/components/icons/ExitIcon';
// import { signOut } from 'next-auth/react';
import React from 'react';

const Logout = () => {
  return (
    <button
      className='bg-tertiary size-[42px] rounded-full flex items-center justify-center cursor-pointer'
      // onClick={() => signOut({ callbackUrl: '/auth/login' })}
    >
      <ExitIcon className='size-5' />
    </button>
  );
};

export default Logout;
