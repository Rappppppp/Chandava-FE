import { useState } from "react";
import { AxiosRequestConfig } from "axios";
import api, { AxiosError } from "@/services/api";

type ActionMethod = "POST" | "PUT" | "DELETE";

const useActionState = <T, D = undefined>(
  method: ActionMethod,
  url: string,
  config?: AxiosRequestConfig
) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const triggerAction = async (requestData?: D) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.request<T>({
        url,
        method,
        data: requestData,
        ...config,
      });
      setData(response.data);
    } catch (err) {
      setError((err as AxiosError).message);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, triggerAction };
};

export default useActionState;
