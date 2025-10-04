import { getRequestConfig } from 'next-intl/server';
import { cookies } from 'next/headers';
import { set } from 'lodash';

export default getRequestConfig(async () => {
  const cookieStore = await cookies();
  const locale = cookieStore.get('lang')?.value || 'en-US';
  const messages = (await import(`../messages/${locale}.json`)).default;

  const output = Object.entries(messages).reduce(
    (acc, [key, value]) => set(acc, key, value),
    {},
  );

  return {
    locale,
    messages: output,
  };
});
