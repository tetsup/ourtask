'use client';
import { useContext, useEffect, useState } from 'react';
import { alertContext } from '@/contexts/Alert';
import { backdropContext } from '@/contexts/BackDrop';

class FetchError extends Error {}

const useCommonFetch = () => {
  const { withBackdrop } = useContext(backdropContext);
  const { add } = useContext(alertContext);
  return (
    url: string,
    params?: RequestInit,
    callback?: (data: any) => Promise<void>
  ) => {
    withBackdrop(async () => {
      try {
        const res = await fetch(url, params);
        if (res.ok) {
          const data = await res.json();
          callback && (await callback(data));
        } else throw new FetchError(res.statusText);
      } catch (e) {
        add({
          severity: 'error',
          message: e instanceof FetchError ? e.message : String(e),
        });
      }
    });
  };
};

export const usePostOrPut = (
  endpoint: string,
  _id?: string,
  callback?: (res: Response) => Promise<void>
) => {
  const fetch = useCommonFetch();
  return async (data: any) => {
    await fetch(
      `${endpoint}/${_id ?? ''}`,
      {
        method: _id ? 'PUT' : 'POST',
        body: JSON.stringify({ data }),
      },
      callback
    );
  };
};

export const useQuery = <T extends any>(endpoint: string, initData: T) => {
  const fetch = useCommonFetch();
  const [query, setQuery] = useState<string>('');
  const [data, setData] = useState<T>(initData);
  useEffect(() => {
    fetch(
      `${endpoint}?${new URLSearchParams(query)}`,
      {
        method: 'GET',
      },
      async (v) => {
        setData(v);
      }
    );
  }, [endpoint, query, setData]);
  return { data, setQuery };
};
