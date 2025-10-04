import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import './globals.css';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale } from 'next-intl/server';

const roboto = Roboto({
  weight: ['100', '300', '400', '500', '700', '900'],
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'KAPAS - Accounting',
  description: 'KAPAS Software Accounting Application',
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
        {/* <Toaster richColors position='top-right' expand={true} closeButton /> */}
      </body>
    </html>
  );
}
