import { app_name } from '@/lib/data';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: app_name + ' - Payments',
};

const PaymentsPage = () => {
  return <div className='p-4 rounded-lg h-full bg-white'>Payments</div>;
};

export default PaymentsPage;
