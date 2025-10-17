import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
// @ts-ignore: side-effect CSS import has no type declarations
import './globals.css';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale } from 'next-intl/server';
import { Toaster } from 'sonner';
import { app_slogan } from '@/lib/data';

const roboto = Roboto({
  weight: ['100', '300', '400', '500', '700', '900'],
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'ServePortal',
  description: app_slogan,
  icons: {
    icon: '/app_logo.png',
  },
};

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
