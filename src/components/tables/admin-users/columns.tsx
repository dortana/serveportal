'use client';

import { ColumnDef } from '@tanstack/react-table';
import { DataTableColumnHeader } from './data-table-column-header';
import { User } from '@/app/generated/prisma/client';
import { formatCurrencyHuf } from '@/lib/utils';
import DocumentType from './DocumentType';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export type CustomColumnDef<T> = ColumnDef<T> & {
  accessorTitle?: string;
};

export const getUsersColumns = (t: any): CustomColumnDef<User>[] => {
  return [
    {
      accessorKey: 'image',
      accessorTitle: t('Profile Image'),
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t('Profile Image')} />
      ),
      cell: ({ row }) => {
        return row.original.role === 'EXPERT' ? (
          <div className='w-32 flex items-center justify-center'>
            <Avatar className='size-14'>
              <AvatarImage
                src={
                  row.original.docsUrls?.profilePhoto ??
                  'https://github.com/shadcn.png'
                }
              />
              <AvatarFallback>
                {row.original.firstName.charAt(0).toUpperCase() +
                  row.original.lastName.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </div>
        ) : (
          <div className='w-32 flex items-center justify-center'>
            <Avatar className='size-14'>
              <AvatarImage
                src={row.original.image ?? 'https://github.com/shadcn.png'}
              />
              <AvatarFallback>
                {row.original.firstName.charAt(0).toUpperCase() +
                  row.original.lastName.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </div>
        );
      },
      enableSorting: false,
    },
    {
      accessorFn: row => `${row.firstName} ${row.lastName}`,
      accessorKey: 'fullName',
      accessorTitle: t('Full Name'),
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t('Full Name')} />
      ),
      cell: ({ row }) => (
        <div className='w-32 text-center font-medium capitalize'>
          {row.original.firstName + ' ' + row.original.lastName}
        </div>
      ),
      enableSorting: false,
    },
    {
      accessorKey: 'role',
      accessorTitle: t('Role'),
      header: ({ column }) => (
        <DataTableColumnHeader
          className='w-20'
          column={column}
          title={t('Role')}
        />
      ),
      cell: ({ row }) => {
        return (
          <div className='w-20 text-center font-medium'>
            {row.getValue('role')}
          </div>
        );
      },
    },
    {
      accessorKey: 'phone',
      accessorTitle: t('Phone'),
      header: ({ column }) => (
        <DataTableColumnHeader
          className='w-20'
          column={column}
          title={t('Phone')}
        />
      ),
      cell: ({ row }) => {
        return (
          <div className='w-20 text-center font-medium'>
            {row.getValue('phone') ?? '-'}
          </div>
        );
      },
    },
    {
      accessorKey: 'documentType',
      accessorTitle: t('Document Type'),
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t('Document Type')} />
      ),
      cell: ({ row }) => {
        return <DocumentType type={row.getValue('documentType')} />;
      },
      filterFn: (row, id, value) => {
        return value.includes(row.getValue(id));
      },
    },
    {
      accessorKey: 'account',
      accessorTitle: t('Account'),
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t('Account')} />
      ),
      cell: ({ row }) => (
        <span className='truncate block'>{row.getValue('account')}</span>
      ),
    },
    {
      accessorKey: 'description',
      accessorTitle: t('Description'),
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t('Description')} />
      ),
      cell: ({ row }) => (
        <span className='max-w-[300px] truncate text-gray-800 block'>
          {row.getValue('description')}
        </span>
      ),
    },
    {
      accessorKey: 'expenseGross',
      accessorTitle: t('Expense'),
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t('Expense')} />
      ),
      cell: ({ row }) => {
        const value = row.getValue('expenseGross') as number | null;
        return value ? (
          <span className='text-red-600 font-medium text-center block'>
            {formatCurrencyHuf(value.toString())}
          </span>
        ) : (
          ''
        );
      },
    },
    {
      accessorKey: 'incomeGross',
      accessorTitle: t('Income'),
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t('Income')} />
      ),
      cell: ({ row }) => {
        const value = row.getValue('incomeGross') as number | null;
        return value ? (
          <span className='text-green-600 font-medium text-center block'>
            {formatCurrencyHuf(value.toString())}
          </span>
        ) : (
          ''
        );
      },
    },
    {
      accessorKey: 'taxCode',
      accessorTitle: t('Tax Code'),
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t('Tax Code')} />
      ),
      cell: ({ row }) => (
        <span className='text-gray-700 text-center block'>
          {row.getValue('taxCode')}
        </span>
      ),
    },
    {
      accessorKey: 'vatRate',
      accessorTitle: t('VAT Rate'),
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t('VAT Rate')} />
      ),
      cell: ({ row }) => {
        const value = row.getValue('vatRate') as number | null;
        return value ? <span className='text-center block'>{value}%</span> : '';
      },
    },
    {
      accessorKey: 'inputVat',
      accessorTitle: t('Input VAT'),
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t('Input VAT')} />
      ),
      cell: ({ row }) => {
        const value = row.getValue('inputVat') as number | null;
        return value ? (
          <span className='text-center block'>
            {formatCurrencyHuf(value.toString())}
          </span>
        ) : (
          '-'
        );
      },
    },
  ];
};
