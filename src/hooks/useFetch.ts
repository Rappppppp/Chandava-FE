import { useState, useEffect } from "react";
import { AxiosRequestConfig } from "axios";
import api from "@/services/api";

const useFetch = <T,>(url: string, config?: AxiosRequestConfig) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await api.get<T>(url, config);
        if (isMounted) setData(response.data);
      } catch (err) {
        if (isMounted) setError((err as Error).message);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchData();

    return () => {
      isMounted = false; // Prevents state updates after unmount
    };
  }, [url, config]);

  return { data, loading, error };
};

export default useFetch;
