'use client';

import { useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export function useQueryString() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (params: Record<string, string | number | null>) => {
      const newSearchParams = new URLSearchParams(searchParams?.toString());

      for (const [key, value] of Object.entries(params)) {
        if (value === null) {
          newSearchParams.delete(key);
        } else {
          newSearchParams.set(key, String(value));
        }
      }

      return newSearchParams.toString();
    },
    [searchParams],
  );

  const updateQueryString = useCallback(
    (
      params: Record<string, string | number | null>,
      options = { scroll: false },
    ) => {
      const queryString = createQueryString(params);
      router.push(`?${queryString}`, options);
    },
    [createQueryString, router],
  );

  return { createQueryString, updateQueryString, searchParams };
}
