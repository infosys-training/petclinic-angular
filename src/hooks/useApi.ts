import { useState, useEffect, useCallback } from 'react';
import type { AxiosResponse } from 'axios';

interface UseApiResult<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useApi<T>(apiFn: () => Promise<AxiosResponse<T>>): UseApiResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetch = useCallback(() => {
    setLoading(true);
    setError(null);
    apiFn()
      .then((res) => {
        setData(res.data);
      })
      .catch((err: unknown) => {
        setError(err instanceof Error ? err.message : 'An unexpected error occurred');
      })
      .finally(() => {
        setLoading(false);
      });
  }, [apiFn]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return { data, loading, error, refetch: fetch };
}
