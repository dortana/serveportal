'use client';

import { DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';
import { Table } from '@tanstack/react-table';

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { useTranslations } from 'next-intl';

interface DataTableViewOptionsProps<TData> {
  table: Table<TData>;
}

export function DataTableViewOptions<TData>({
  table,
}: DataTableViewOptionsProps<TData>) {
  const t = useTranslations();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='outline' size='sm' className='h-8'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 24 24'
            width='24'
            height='24'
            color='#000000'
            fill='none'
          >
            <path
              d='M19.5 2.5C20.6046 2.5 21.5 3.39543 21.5 4.5V19.5C21.5 20.6046 20.6046 21.5 19.5 21.5H4.5C3.39543 21.5 2.5 20.6046 2.5 19.5L2.5 4.5C2.5 3.39543 3.39543 2.5 4.5 2.5L19.5 2.5Z'
              stroke='currentColor'
              strokeWidth='1.5'
              strokeLinejoin='round'
            ></path>
            <path
              d='M16 14C16.5523 14 17 14.4477 17 15L17 16C17 16.5523 16.5523 17 16 17L15 17C14.4477 17 14 16.5523 14 16L14 15C14 14.4477 14.4477 14 15 14L16 14Z'
              stroke='currentColor'
              strokeWidth='1.5'
            ></path>
            <path
              d='M9 7C9.55228 7 10 7.44772 10 8L10 9C10 9.55228 9.55228 10 9 10L8 10C7.44772 10 7 9.55228 7 9L7 8C7 7.44772 7.44772 7 8 7L9 7Z'
              stroke='currentColor'
              strokeWidth='1.5'
            ></path>
            <path
              d='M7.5 15.5H14'
              stroke='currentColor'
              strokeWidth='1.5'
              strokeLinecap='round'
              strokeLinejoin='round'
            ></path>
            <path
              d='M10.5 8.5H17'
              stroke='currentColor'
              strokeWidth='1.5'
              strokeLinecap='round'
              strokeLinejoin='round'
            ></path>
          </svg>
          {t('View')}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end' className='w-[150px]'>
        <DropdownMenuLabel>{t('Toggle columns')}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {table
          .getAllColumns()
          .filter(
            column =>
              typeof column.accessorFn !== 'undefined' && column.getCanHide(),
          )
          .map(column => {
            return (
              <DropdownMenuCheckboxItem
                key={column.id}
                className='capitalize'
                checked={column.getIsVisible()}
                onCheckedChange={value => column.toggleVisibility(!!value)}
              >
                {/* @ts-ignore */}
                {column?.columnDef?.accessorTitle}
              </DropdownMenuCheckboxItem>
            );
          })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
