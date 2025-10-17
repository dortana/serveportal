import { app_name } from '@/lib/data';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: app_name + ' - Dashboard',
};

const DashboardPage = () => {
  return <div className='p-4 rounded-lg h-full bg-white'>Dashbaord</div>;
};

export default DashboardPage;
