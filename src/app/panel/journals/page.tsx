// import { getUserHistory } from '@/actions/user';
import { CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { DataTable } from '@/components/ui/table/data-table';
import { getJournalColumns } from '@/components/tables/journal/columns';
import { DataTableToolbar } from '@/components/tables/journal/data-table-toolbar';
import { getTranslations } from 'next-intl/server';
import { DataFilterType } from '@/types/app';
import { sampleJournalEntries } from '@/components/tables/journal/data';

interface PageProps {
  searchParams: Promise<DataFilterType>;
}

const JournalsPage = async ({ searchParams }: PageProps) => {
  const t = await getTranslations();
  const filterData = await searchParams;
  console.log(filterData);
  const historyData = sampleJournalEntries; //await getUserHistory(filterData);
  if ('error' in historyData) {
    return null;
  }

  return (
    <div className='p-4 rounded-lg h-full bg-white'>
      <CardHeader className='px-0 pt-1'>
        <CardTitle>{t('Journal Entries')}</CardTitle>
        <CardDescription>
          {t(
            'You can view all your journal entries here. Use the filters to narrow down your search.',
          )}
        </CardDescription>
      </CardHeader>
      <br />
      <DataTable
        columns={getJournalColumns}
        // @ts-ignore
        data={sampleJournalEntries}
        toolbarComponent={DataTableToolbar}
        allowSelection={false}
        // paginationData={historyData.pagination}
        paginationData={{
          page: 1,
          limit: 10,
          totalCount: 200,
          totalPages: 5,
        }}
        tableFiltersIds={['status', 'action', 'action_sub']}
      />
    </div>
  );
};

export default JournalsPage;
