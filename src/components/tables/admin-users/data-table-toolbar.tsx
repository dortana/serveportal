'use client';
import React, { useEffect } from 'react';
import { Table } from '@tanstack/react-table';

import { DataTableFacetedFilter } from './data-table-faceted-filter';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { DataTableViewOptions } from './data-table-view-options';
import { useDebounce } from '@/hooks/useDebounce';
import { useQueryString } from '@/hooks/useQueryString';
import { useTranslations } from 'next-intl';
import { useRolesIcon, useStatusesIcon } from './icon-renderer';
import SearchIcon from '@/components/icons/SearchIcon';
import ExportDataIcon from '@/components/icons/ExportDataIcon';
import AddData from './AddData';

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;
  const t = useTranslations();
  const { updateQueryString, searchParams } = useQueryString();
  const search = searchParams.get('search');
  const [searchValue, setSearchValue] = React.useState(search);
  const query = useDebounce(searchValue, 1000);
  const rolesIcon = useRolesIcon();
  const statusesIcon = useStatusesIcon();

  useEffect(() => {
    if (query) {
      updateQueryString({
        search: query,
      });
    } else {
      updateQueryString({
        search: null,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  return (
    <div className='flex items-center justify-between md:flex-row flex-col-reverse gap-4 flex-wrap'>
      <div className='flex flex-1 items-center gap-2 max-sm:flex-col w-full flex-wrap'>
        <div
          className='flex items-center gap-2 w-[180px] lg:w-[250px] max-sm:w-full
        border rounded-md px-3 bg-white shadow-sm cursor-text transition-colors
        hover:border-gray-400 focus-within:ring-2 focus-within:ring-ring'
        >
          <SearchIcon />
          <Input
            placeholder={t('Filter your list...')}
            value={searchValue ?? ''}
            onChange={event => setSearchValue(event.target.value)}
            className='w-full border-none bg-transparent shadow-none p-0 focus-visible:ring-0 focus-visible:ring-offset-0'
          />
        </div>

        <div className='flex items-start gap-2 max-sm:w-full'>
          {table.getColumn('role') && (
            <DataTableFacetedFilter
              column={table.getColumn('role')}
              title={t('Role')}
              options={rolesIcon}
            />
          )}
          {table.getColumn('status') && (
            <DataTableFacetedFilter
              column={table.getColumn('status')}
              title={t('Status')}
              options={statusesIcon}
            />
          )}
        </div>

        {isFiltered && (
          <Button
            variant='ghost'
            onClick={() => table.resetColumnFilters()}
            className='h-8 px-2 lg:px-3 max-md:self-end'
          >
            {t('Reset')}
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 24 24'
              width='24'
              height='24'
              color='#000000'
              fill='none'
            >
              <path
                d='M18 6L12 12M12 12L6 18M12 12L18 18M12 12L6 6'
                stroke='currentColor'
                strokeWidth='1.5'
                strokeLinecap='round'
                strokeLinejoin='round'
              ></path>
            </svg>
          </Button>
        )}
      </div>
      <div className='flex items-center gap-2 w-fit max-md:self-end'>
        <AddData />
        <Button variant='outline' size='sm' className='h-10'>
          <ExportDataIcon />
          {t('Export Data')}
        </Button>
        <DataTableViewOptions table={table} />
      </div>
    </div>
  );
}
