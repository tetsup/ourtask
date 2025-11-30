'use client';
import { useContext, useEffect, useState } from 'react';
import { alertContext } from '@/contexts/Alert';
import { backdropContext } from '@/contexts/BackDrop';

class FetchError extends Error {}

type UseCommonFetchOptions = {
  useBackdrop: boolean;
  useSuccessAlert: boolean;
  useFailAlert: boolean;
  successMessage?: string;
};

const onlyFetch: UseCommonFetchOptions = {
  useBackdrop: false,
  useSuccessAlert: false,
  useFailAlert: false,
};

const useCommonFetch = (options?: UseCommonFetchOptions) => {
  const { withBackdrop } = useContext(backdropContext);
  const { add } = useContext(alertContext);
  return (
    url: string,
    params?: RequestInit,
    callback?: (data: any) => Promise<void>
  ) => {
    const commonFetch = async () => {
      try {
        const res = await fetch(url, params);
        if (res.ok) {
          const data = await res.json();
          callback && (await callback(data));
          if (options?.useSuccessAlert ?? true)
            add({
              severity: 'success',
              message: options?.successMessage,
            });
        } else throw new FetchError(res.statusText);
      } catch (e) {
        if (options?.useFailAlert ?? true)
          add({
            severity: 'error',
            message: e instanceof FetchError ? e.message : String(e),
          });
      }
    };
    if (options?.useBackdrop ?? true) withBackdrop(commonFetch);
    else commonFetch();
  };
};

export const usePostOrPut = (
  endpoint: string,
  _id?: string,
  callback?: (res: Response) => Promise<void>
) => {
  const fetch = useCommonFetch();
  return (data: any) => {
    fetch(
      `${endpoint}/${_id ?? ''}`,
      {
        method: _id ? 'PUT' : 'POST',
        body: JSON.stringify({ data }),
      },
      callback
    );
  };
};

export const useQuery = <T extends any, Q extends object>(
  endpoint: string,
  initData: T,
  initQuery?: Q
) => {
  const fetch = useCommonFetch(onlyFetch);
  const [query, setQuery] = useState<Q | undefined>(initQuery);
  const [data, setData] = useState<T>(initData);
  useEffect(() => {
    if (!query) return;
    const q = JSON.stringify(query);
    fetch(
      `${endpoint}?${new URLSearchParams({ q })}`,
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
