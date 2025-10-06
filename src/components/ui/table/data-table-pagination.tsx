import { Table } from '@tanstack/react-table';
import { Button } from '../button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../select';
import { cn } from '@/lib/utils';
import { useTranslations } from 'next-intl';

interface DataTablePaginationProps<TData> {
  table: Table<TData>;
  allowSelection?: boolean;
}

export function DataTablePagination<TData>({
  table,
  allowSelection,
}: DataTablePaginationProps<TData>) {
  const t = useTranslations();
  return (
    <div className='flex items-center justify-between px-2 max-md:flex-col gap-4 max-md:items-start'>
      {allowSelection && (
        <div className='flex-1 text-sm text-muted-foreground'>
          {t('{number} of {total} row(s) selected.', {
            number: table.getFilteredSelectedRowModel().rows.length,
            total: table.getFilteredRowModel().rows.length,
          })}
        </div>
      )}

      <div
        className={cn(
          'flex items-center flex-wrap max-md:items-start gap-4 max-md:w-full',
          !allowSelection && 'w-full justify-between',
        )}
      >
        <div className='flex items-center space-x-2 max-md:w-full'>
          <p className='text-sm font-medium'>{t('Rows per page')}</p>
          <Select
            value={`${table.getState().pagination.pageSize}`}
            onValueChange={value => {
              table.setPageSize(Number(value));
            }}
          >
            <SelectTrigger className='h-8 w-[70px]'>
              <SelectValue placeholder={table.getState().pagination.pageSize} />
            </SelectTrigger>
            <SelectContent side='top'>
              {[10, 20, 30, 40, 50].map(pageSize => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className='flex items-center gap-2'>
          <div className='flex w-[100px] items-center justify-center text-sm font-medium max-md:block'>
            {t('Page {pageNo} of {totalPages}', {
              pageNo: table.getState().pagination.pageIndex + 1,
              totalPages: table.getPageCount(),
            })}
          </div>
          <div className='flex items-center space-x-2 max-md:flex-1 justify-end'>
            <Button
              variant='outline'
              className='h-8 w-8 p-0 flex'
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
            >
              <span className='sr-only'>{t('Go to first page')}</span>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 24 24'
                width='24'
                height='24'
                color='#000000'
                fill='none'
              >
                <path
                  d='M11.5 18C11.5 18 5.50001 13.5811 5.5 12C5.49999 10.4188 11.5 6 11.5 6'
                  stroke='currentColor'
                  strokeWidth='1.5'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                ></path>
                <path
                  d='M18.5 18C18.5 18 12.5 13.5811 12.5 12C12.5 10.4188 18.5 6 18.5 6'
                  stroke='currentColor'
                  strokeWidth='1.5'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                ></path>
              </svg>
            </Button>
            <Button
              variant='outline'
              className='h-8 w-8 p-0'
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <span className='sr-only'>{t('Go to previous page')}</span>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 24 24'
                width='24'
                height='24'
                color='#000000'
                fill='none'
              >
                <path
                  d='M15 6L9 12.0001L15 18'
                  stroke='#141B34'
                  strokeWidth='1.5'
                  strokeMiterlimit='16'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </svg>
            </Button>
            <Button
              variant='outline'
              className='h-8 w-8 p-0'
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              <span className='sr-only'>{t('Go to next page')}</span>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 24 24'
                width='24'
                height='24'
                color='#000000'
                fill='none'
              >
                <path
                  d='M9.00005 6C9.00005 6 15 10.4189 15 12C15 13.5812 9 18 9 18'
                  stroke='currentColor'
                  strokeWidth='1.5'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                ></path>
              </svg>
            </Button>
            <Button
              variant='outline'
              className='h-8 w-8 p-0 flex'
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
            >
              <span className='sr-only'>{t('Go to last page')}</span>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 24 24'
                width='24'
                height='24'
                color='#000000'
                fill='none'
              >
                <path
                  d='M12.5 18C12.5 18 18.5 13.5811 18.5 12C18.5 10.4188 12.5 6 12.5 6'
                  stroke='currentColor'
                  strokeWidth='1.5'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                ></path>
                <path
                  d='M5.50005 18C5.50005 18 11.5 13.5811 11.5 12C11.5 10.4188 5.5 6 5.5 6'
                  stroke='currentColor'
                  strokeWidth='1.5'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                ></path>
              </svg>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
