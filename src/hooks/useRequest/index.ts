import useSWR, { SWRConfiguration } from 'swr';
import { AxiosRequestConfig, AxiosError } from 'axios';
import { axiosInstance } from './axiosInstance';

interface StandardResponse<Data> {
  code: number;
  data: Data;
  message: string;
}

export function useRequest<Data = unknown, Error = unknown>(request: AxiosRequestConfig, config?: SWRConfiguration) {
  const { data, error, mutate, isValidating } = useSWR<StandardResponse<Data>, AxiosError<Error>>(
    request.url,
    () => axiosInstance.request(request),
    config,
  );

  return {
    ...data,
    error,
    mutate,
    isValidating,
  };
}
