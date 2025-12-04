'use client';
import type { HTTP_METHOD } from 'next/dist/server/web/http';
import { useContext, useEffect, useState } from 'react';
import { alertContext } from '@/contexts/Alert';
import { backdropContext } from '@/contexts/BackDrop';

class FetchError extends Error {}

type UseCommonFetchOptions = {
  useBackdrop?: boolean;
  useFailAlert?: boolean;
} & (
  | {
      useSuccessAlert: true;
      successMessage: string;
    }
  | { useSuccessAlert?: false }
);
type UseCommonFetchParams = {
  endpoint: string;
  method: HTTP_METHOD;
  callback?: (data: any) => void | Promise<void>;
  options?: UseCommonFetchOptions;
};
type UsePostOrPutParams = {
  endpoint: string;
  _id?: string;
  callback?: (res: any) => Promise<void>;
};
type UseQueryParams<T, Q> = {
  endpoint: string;
  initData: T;
  initQuery?: Q;
};

const useCommonFetch = ({
  endpoint,
  method,
  callback,
  options,
}: UseCommonFetchParams) => {
  const { withBackdrop } = useContext(backdropContext);
  const { addAlert } = useContext(alertContext);
  const commonFetch = async (queryData: any) => {
    try {
      const url =
        method === 'GET'
          ? `${endpoint}?${new URLSearchParams({ q: JSON.stringify(queryData) })}`
          : endpoint;
      const params = {
        method,
        ...(method !== 'GET' && { body: JSON.stringify(queryData) }),
      };
      const res = await fetch(url, params);
      if (res.ok) {
        const resData = await res.json();
        callback && (await callback(resData));
        if (options?.useSuccessAlert)
          addAlert({
            severity: 'success',
            message: options?.successMessage,
          });
      } else throw new FetchError(res.statusText);
    } catch (e) {
      if (options?.useFailAlert)
        addAlert({
          severity: 'error',
          message: e instanceof FetchError ? e.message : String(e),
        });
    }
  };
  return options?.useBackdrop
    ? async (queryData: any) =>
        withBackdrop(async () => await commonFetch(queryData))
    : commonFetch;
};

export const usePostOrPut = ({ endpoint, _id, callback }: UsePostOrPutParams) =>
  useCommonFetch({
    endpoint: _id ? `${endpoint}/${_id}` : endpoint,
    method: _id ? 'PUT' : 'POST',
    callback,
    options: {
      useSuccessAlert: true,
      useFailAlert: true,
      successMessage: 'succeeded',
    },
  });

export const useQuery = <T extends any, Q extends object>({
  endpoint,
  initData,
  initQuery,
}: UseQueryParams<T, Q>) => {
  const [query, setQuery] = useState<Q | undefined>(initQuery);
  const [data, setData] = useState<T>(initData);
  const fetch = useCommonFetch({
    endpoint,
    method: 'GET',
    callback: async (resData: T) => {
      setData(resData);
    },
  });

  useEffect(() => {
    if (!query) return;
    fetch(query);
  }, [query]);
  return { data, setQuery };
};
