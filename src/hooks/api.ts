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
  useBackdrop?: boolean;
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
        method === 'GET' && queryData
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
  return options?.useBackdrop ? withBackdrop(commonFetch) : commonFetch;
};

export const usePostOrPut = ({ endpoint, _id, callback }: UsePostOrPutParams) =>
  useCommonFetch({
    endpoint: _id ? `${endpoint}/${_id}` : endpoint,
    method: _id ? 'PUT' : 'POST',
    callback,
    options: {
      useSuccessAlert: true,
      useFailAlert: true,
      useBackdrop: true,
      successMessage: 'succeeded',
    },
  });

export const useQuery = <T extends any, Q extends object | null>({
  endpoint,
  initData,
  initQuery,
  useBackdrop,
}: UseQueryParams<T, Q>) => {
  const [query, setQuery] = useState<Q | undefined>(initQuery);
  const [data, setData] = useState<T>(initData);
  const [reload, setReload] = useState(false);
  const fetch = useCommonFetch({
    endpoint,
    method: 'GET',
    callback: async (resData: T) => {
      setData(resData);
    },
    options: { useBackdrop },
  });

  const handleFetch = () => {
    if (query === undefined) setData(initData);
    else fetch(query);
  };
  useEffect(() => {
    handleFetch();
  }, [query]);
  useEffect(() => {
    if (!reload) return;
    handleFetch();
    setReload(false);
  }, [reload]);
  const handleReload = () => setReload(true);
  return { data, setQuery, handleReload };
};
