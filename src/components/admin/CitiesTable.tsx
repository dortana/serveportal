'use client';

import * as React from 'react';
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from '@tanstack/react-table';
import { ChevronDown } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import AnimatedNumber from '../AnimatedNumber';
import { useTranslations } from 'next-intl';

const data: CityStat[] = [
  {
    id: 'budapest',
    city: 'Budapest',
    experts: 1224,
    customers: 430,
    orders: 654,
  },
  {
    id: 'debrecen',
    city: 'Debrecen',
    experts: 310,
    customers: 140,
    orders: 220,
  },
  {
    id: 'szeged',
    city: 'Szeged',
    experts: 260,
    customers: 120,
    orders: 180,
  },
  {
    id: 'miskolc',
    city: 'Miskolc',
    experts: 240,
    customers: 100,
    orders: 160,
  },
  {
    id: 'pecs',
    city: 'Pécs',
    experts: 230,
    customers: 95,
    orders: 150,
  },
  {
    id: 'gyor',
    city: 'Győr',
    experts: 280,
    customers: 110,
    orders: 175,
  },
  {
    id: 'nyiregyhaza',
    city: 'Nyíregyháza',
    experts: 200,
    customers: 88,
    orders: 135,
  },
  {
    id: 'kecskemet',
    city: 'Kecskemét',
    experts: 190,
    customers: 82,
    orders: 125,
  },
  {
    id: 'szekesfehervar',
    city: 'Székesfehérvár',
    experts: 220,
    customers: 90,
    orders: 140,
  },
  {
    id: 'szombathely',
    city: 'Szombathely',
    experts: 170,
    customers: 70,
    orders: 115,
  },
  {
    id: 'eger',
    city: 'Eger',
    experts: 160,
    customers: 65,
    orders: 105,
  },
];

export type CityStat = {
  id: string;
  city: string;
  experts: number;
  customers: number;
  orders: number;
};

export function CitiesTable() {
  const t = useTranslations();

  const columns: ColumnDef<CityStat>[] = [
    {
      accessorKey: 'city',
      header: t('City'),
      cell: ({ row }) => (
        <div className='capitalize'>{row.getValue('city')}</div>
      ),
    },
    {
      accessorKey: 'experts',
      header: t('Experts'),
      cell: ({ row }) => (
        <div className='capitalize'>
          <AnimatedNumber
            end={row.getValue('experts')}
            separator=','
            duration={2}
          />
        </div>
      ),
    },
    {
      accessorKey: 'customers',
      header: t('Customers'),
      cell: ({ row }) => (
        <div className='capitalize'>
          <AnimatedNumber
            end={row.getValue('customers')}
            separator=','
            duration={2}
          />
        </div>
      ),
    },
    {
      accessorKey: 'orders',
      header: t('Orders'),
      cell: ({ row }) => (
        <div className='capitalize'>
          <AnimatedNumber
            end={row.getValue('orders')}
            separator=','
            duration={2}
          />
        </div>
      ),
    },
  ];

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className='w-full'>
      <div className='flex items-center pb-4'>
        <Input
          placeholder={t('Filter by city...')}
          value={(table.getColumn('city')?.getFilterValue() as string) ?? ''}
          onChange={event =>
            table.getColumn('city')?.setFilterValue(event.target.value)
          }
          className='w-full md:max-w-sm'
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild className='hidden md:flex'>
            <Button variant='outline' className='ml-auto'>
              {t('Columns')} <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            {table
              .getAllColumns()
              .filter(column => column.getCanHide())
              .map(column => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className='capitalize'
                    checked={column.getIsVisible()}
                    onCheckedChange={value => column.toggleVisibility(!!value)}
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className='overflow-hidden rounded-md border'>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map(headerGroup => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map(header => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map(row => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                  className='even:bg-tertiary'
                >
                  {row.getVisibleCells().map(cell => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className='h-24 text-center'
                >
                  {t('No results.')}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className='flex items-center justify-end space-x-2 py-4'>
        <div className='space-x-2'>
          <Button
            variant='outline'
            size='sm'
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            {t('Previous')}
          </Button>
          <Button
            variant='outline'
            size='sm'
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            {t('Next')}
          </Button>
        </div>
      </div>
    </div>
  );
}
