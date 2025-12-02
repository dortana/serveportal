'use client';

import { ColumnDef } from '@tanstack/react-table';
import { DataTableColumnHeader } from './data-table-column-header';
import { User } from '@/app/generated/prisma/client';
import RoleCom from './RoleCom';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Link from 'next/link';
import EyeIcon from '@/components/icons/EyeIcon';
import StatusCom from './StatusCom';

export type CustomColumnDef<T> = ColumnDef<T> & {
  accessorTitle?: string;
};

export const getUsersColumns = (t: any): CustomColumnDef<User>[] => {
  return [
    {
      id: 'rowNumber',
      header: () => '#',
      cell: ({ row, table }) => {
        const pageIndex = table.getState().pagination.pageIndex;
        const pageSize = table.getState().pagination.pageSize;

        return (
          <div className='w-fit font-medium'>
            {pageIndex * pageSize + row.index + 1}
          </div>
        );
      },
    },
    {
      accessorKey: 'image',
      accessorTitle: t('Profile Image'),
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title={t('Profile Image')}
          className='w-24'
        />
      ),
      cell: ({ row }) => {
        return row.original.role === 'EXPERT' ? (
          <div className='w-fit flex items-center'>
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
          <div className='w-fit flex items-center'>
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
        <div className='w-32 font-medium capitalize'>
          {row.original.firstName + ' ' + row.original.lastName}
        </div>
      ),
      enableSorting: false,
    },
    {
      accessorKey: 'email',
      accessorTitle: t('Email Address'),
      header: ({ column }) => (
        <DataTableColumnHeader
          className='w-fit'
          column={column}
          title={t('Email Address')}
        />
      ),
      cell: ({ row }) => {
        return <div className='w-fit font-medium'>{row.getValue('email')}</div>;
      },
    },
    {
      accessorKey: 'phone',
      accessorTitle: t('Phone'),
      header: ({ column }) => (
        <DataTableColumnHeader
          className='w-fit'
          column={column}
          title={t('Phone')}
        />
      ),
      cell: ({ row }) => {
        return (
          <div className='w-fit font-medium'>
            {row.getValue('phone') ?? '-'}
          </div>
        );
      },
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
        return <RoleCom role={row.getValue('role')} />;
      },
      filterFn: (row, id, value) => {
        return value.includes(row.getValue(id));
      },
    },
    {
      accessorKey: 'status',
      accessorTitle: t('Status'),
      header: ({ column }) => (
        <DataTableColumnHeader
          className='w-20'
          column={column}
          title={t('Status')}
        />
      ),
      cell: ({ row }) => {
        return <StatusCom status={row.getValue('status')} />;
      },
      filterFn: (row, id, value) => {
        return value.includes(row.getValue(id));
      },
    },
    {
      id: 'actions',
      cell: ({ row }) => {
        return (
          <Link
            className='w-fit'
            href={`/admin-panel/users/${row.original.id}`}
          >
            <EyeIcon />
          </Link>
        );
      },
    },
  ];
};
