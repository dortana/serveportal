import PanelHeader from './PanelHeader';
import PanelSidebar from './PanelSidebar';

export default async function PanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className='p-3 flex flex-col gap-3 h-screen bg-tertiary'>
      <PanelHeader />
      <div className='flex gap-3 flex-1'>
        <PanelSidebar />
        <div className='flex-1'>{children}</div>
      </div>
    </section>
  );
}
