'use client';

import { ColumnDef } from '@tanstack/react-table';
import { DataTableColumnHeader } from './data-table-column-header';
import { JournalEntry } from '@prisma/client';
import { formatCurrency } from '@/lib/utils';
import DocumentType from './DocumentType';

export type CustomColumnDef<T> = ColumnDef<T> & {
  accessorTitle?: string;
};

export const getJournalColumns = (t: any): CustomColumnDef<JournalEntry>[] => {
  return [
    {
      accessorKey: 'entrySort',
      accessorTitle: t('Entry No.'),
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t('Entry No.')} />
      ),
      cell: ({ row }) => (
        <div className='w-[80px] text-center font-medium'>
          {row.getValue('entrySort')}
        </div>
      ),
      enableSorting: false,
    },
    {
      accessorKey: 'date',
      accessorTitle: t('Date'),
      header: ({ column }) => (
        <DataTableColumnHeader
          className='w-20'
          column={column}
          title={t('Date')}
        />
      ),
      cell: ({ row }) => {
        const date: string = row.getValue('date');
        return <span className='text-sm text-gray-700'>{date}</span>;
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
            {formatCurrency(value.toString())}
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
            {formatCurrency(value.toString())}
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
            {formatCurrency(value.toString())}
          </span>
        ) : (
          '-'
        );
      },
    },
  ];
};
