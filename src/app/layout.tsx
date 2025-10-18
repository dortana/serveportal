import type { Metadata, Viewport } from 'next';
import { Roboto } from 'next/font/google';
// @ts-ignore: side-effect CSS import has no type declarations
import './globals.css';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getTranslations } from 'next-intl/server';
import { Toaster } from 'sonner';
import { app_name } from '@/lib/data';

const roboto = Roboto({
  weight: ['100', '300', '400', '500', '700', '900'],
  subsets: ['latin'],
  display: 'swap',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations();
  return {
    title: app_name,
    description: t('Your gateway to reliable expert'),
    icons: {
      icon: '/app_logo.png',
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  return (
    <html lang={locale}>
      <body className={roboto.className}>
        <NextIntlClientProvider>{children}</NextIntlClientProvider>
        <Toaster richColors position='top-right' expand={true} closeButton />
      </body>
    </html>
  );
}
