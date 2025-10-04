import { getTranslations } from 'next-intl/server';
import PanelHeader from './PanelHeader';
import PanelSidebar from './PanelSidebar';

export default async function PanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const t = await getTranslations();

  return (
    <section className='p-2 flex flex-col gap-2 h-screen'>
      <PanelHeader />
      <div className='flex gap-2 flex-1'>
        <PanelSidebar />
        <div className='flex-1'>{children}</div>
      </div>
    </section>
  );
}
