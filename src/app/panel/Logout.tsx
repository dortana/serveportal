// 'use client';
import ExitIcon from '@/components/icons/ExitIcon';
import Link from 'next/link';
// import { signOut } from 'next-auth/react';
import React from 'react';

const Logout = () => {
  return (
    <Link
      href='/'
      className='bg-tertiary size-10 rounded-full flex items-center justify-center cursor-pointer'
      // onClick={() => signOut({ callbackUrl: '/auth/login' })}
    >
      <ExitIcon className='size-5' />
    </Link>
  );
};

export default Logout;
