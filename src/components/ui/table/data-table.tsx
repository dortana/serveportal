'use client';

import * as React from 'react';
import {
  ColumnDef,
  ColumnFiltersState,
  PaginationState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table/table';

import { DataTablePagination } from './data-table-pagination';
import { cn } from '@/lib/utils';
import { useTranslations } from 'next-intl';
import { PaginationType } from '@/types/app';
import { useQueryString } from '@/hooks/useQueryString';

interface DataTableProps<TData, TValue> {
  paginationData: PaginationType;
  columns: (t: any) => ColumnDef<TData, TValue>[];
  data: TData[];
  tableFiltersIds?: string[];
  toolbarComponent?: React.ComponentType<{ table: any }>;
  className?: string;
  allowSelection?: boolean;
}

export function DataTable<TData, TValue>({
  columns: fetchColumns,
  data,
  toolbarComponent: ToolbarComponent,
  paginationData,
  tableFiltersIds,
  allowSelection = true,
  className,
}: DataTableProps<TData, TValue>) {
  const t = useTranslations();
  const columns = fetchColumns(t);
  const { updateQueryString, searchParams } = useQueryString();
  const isFirstRender = React.useRef(true);
  const [rowSelection, setRowSelection] = React.useState({});
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});

  const initialColumnFilters: ColumnFiltersState = React.useMemo(() => {
    const result: any = [];
    if (tableFiltersIds) {
      tableFiltersIds.forEach(filterId => {
        const filterValue = searchParams.get(filterId);
        if (filterValue) {
          result.push({ id: filterId, value: filterValue.split(',') });
        }
      });
    }
    return result;
  }, [searchParams, tableFiltersIds]);

  const [columnFilters, setColumnFilters] =
    React.useState<ColumnFiltersState>(initialColumnFilters);
  const [sorting, setSorting] = React.useState<SortingState>([]);

  const [{ pageIndex, pageSize }, setPagination] =
    React.useState<PaginationState>({
      pageIndex: paginationData.page - 1,
      pageSize: paginationData.limit,
    });

  const pagination = React.useMemo(
    () => ({
      pageIndex,
      pageSize,
    }),
    [pageIndex, pageSize],
  );
  React.useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    // Pagination
    const paginationParams = {
      page: pageIndex + 1,
      limit: pageSize,
    };

    // Sorting
    const sortingParams = sorting[0]
      ? {
          sort: sorting[0].id,
          order: sorting[0].desc ? 'desc' : 'asc',
        }
      : {};

    // Filters
    const filterParams = columnFilters.reduce(
      (acc: Record<string, string>, { id, value }) => {
        acc[id] = Array.isArray(value) ? value.join(',') : String(value);
        return acc;
      },
      {},
    );

    const combinedParams: any = {
      ...paginationParams,
      ...sortingParams,
      ...{
        status: filterParams.status || null,
        action: filterParams.action || null,
        action_sub: filterParams.action_sub || null,
      },
    };
    updateQueryString(combinedParams);
  }, [pageIndex, pageSize, sorting, columnFilters, updateQueryString]);

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
      pagination,
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    pageCount: paginationData.totalPages,
    rowCount: paginationData.totalCount,
    manualPagination: true,
    manualFiltering: true,
    manualSorting: true,
    onPaginationChange: setPagination,
  });

  return (
    <div className={cn('space-y-4', className)}>
      {ToolbarComponent ? <ToolbarComponent table={table} /> : null}
      <div className='rounded-md border inline-grid w-full'>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map(headerGroup => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map(header => {
                  return (
                    <TableHead key={header.id} colSpan={header.colSpan}>
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
                  className='h-24 text-left md:text-center'
                >
                  {t('No results.')}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination table={table} allowSelection={allowSelection} />
      <br />
    </div>
  );
}
