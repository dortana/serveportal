import { app_name } from '@/lib/data';
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { DataTable } from '@/components/ui/table/data-table';
import { getUsersColumns } from '@/components/tables/admin-users/columns';
import { DataTableToolbar } from '@/components/tables/admin-users/data-table-toolbar';
import { DataFilterType } from '@/types/app';
import { getUsers } from '@/actions/admin';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations();
  return {
    title: app_name + ' - ' + t('Users'),
  };
}

interface PageProps {
  searchParams: Promise<DataFilterType>;
}

const UsersPage = async ({ searchParams }: PageProps) => {
  const t = await getTranslations();
  const filterData = await searchParams;
  const usersData = await getUsers(filterData);
  if ('error' in usersData) {
    return null;
  }
  return (
    <div className='p-4 rounded-lg h-full bg-white'>
      <CardHeader className='px-0 pt-1'>
        <CardTitle>{t('Users Data')}</CardTitle>
        <CardDescription>
          {t(
            'You can view all your users data here. Use the filters to narrow down your search.',
          )}
        </CardDescription>
      </CardHeader>
      <br />

      <DataTable
        columns={getUsersColumns}
        // @ts-ignore
        data={usersData.users}
        toolbarComponent={DataTableToolbar}
        allowSelection={false}
        paginationData={usersData.pagination}
        tableFiltersIds={['role', 'status']}
      />
    </div>
  );
};

export default UsersPage;
