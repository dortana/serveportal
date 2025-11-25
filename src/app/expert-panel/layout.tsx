import { auth } from '@/lib/auth';
import PanelHeader from './PanelHeader';
import PanelSidebar from './PanelSidebar';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { User, UserRole, UserStatus } from '@prisma/client';
import ExpertOnboardingForm from '@/components/forms/ExpertOnboardingForm';
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
  if (user.role === UserRole.USER) {
    return redirect('/panel/dashboard');
  }
  const needsOnboarding =
    user.status === UserStatus.DISABLED && user.role === UserRole.EXPERT;
  return (
    <section className='p-3 flex flex-col gap-3 min-h-screen bg-tertiary'>
      <PanelHeader user={user} />
      <div className='flex gap-3 flex-1'>
        {needsOnboarding ? (
          <div className='w-fit mx-auto bg-white h-fit flex justify-center rounded-lg p-4 shadow max-md:w-full'>
            <ExpertOnboardingForm />
          </div>
        ) : (
          <>
            <PanelSidebar
              className='!h-[calc(100vh-100px)] hidden md:block'
              user={user}
            />
            <div className='flex-1'>{children}</div>
          </>
        )}
      </div>
    </section>
  );
}
