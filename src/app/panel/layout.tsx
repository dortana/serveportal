import { auth } from '@/lib/auth';
import PanelHeader from './PanelHeader';
import PanelSidebar from './PanelSidebar';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { User, UserRole } from '@/app/generated/prisma/client';
export default async function PanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const user = session?.user as unknown as User;
  if (!user) {
    return redirect('/auth/login');
  }
  if (user.role === UserRole.EXPERT) {
    return redirect('/expert-panel/dashboard');
  }
  if (user.role === UserRole.ADMIN) {
    return redirect('/admin-panel/dashboard');
  }
  return (
    <section className='p-3 flex flex-col gap-3 min-h-screen bg-tertiary'>
      <PanelHeader user={user} />
      <div className='flex gap-3 flex-1'>
        <PanelSidebar
          className='!h-[calc(100vh-100px)] hidden md:block'
          user={user}
        />
        <div className='flex-1'>{children}</div>
      </div>
    </section>
  );
}
