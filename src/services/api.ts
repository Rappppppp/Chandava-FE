// /src/services/api.ts
import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
} from "axios";

const api: AxiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/${import.meta.env.VITE_API_VERSION}`,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
  xsrfCookieName: "XSRF-TOKEN",
  xsrfHeaderName: "X-XSRF-TOKEN",
});

const request = async <T>(config: AxiosRequestConfig): Promise<T> => {
  try {
    const response: AxiosResponse<T> = await api.request<T>(config);
    return response.data;
  } catch (error) {
    throw error as AxiosError;
  }
};

export { request, AxiosError };
export default api;
