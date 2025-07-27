// /src/services/api.ts
import { getCookie } from "@helpers/cookieHelper";
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
  xsrfCookieName: "XSRF-TOKEN",       // Laravel default
  xsrfHeaderName: "X-XSRF-TOKEN",     // Laravel expects this header
});

api.interceptors.request.use((config) => {
  const token = getCookie("XSRF-TOKEN");
  if (token && config.headers) {
    config.headers["X-XSRF-TOKEN"] = decodeURIComponent(token);
  }
  return config;
});



const request = async <T>(config: AxiosRequestConfig): Promise<T> => {
  try {
    const response: AxiosResponse<T> = await api.request<T>(config);
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    throw axiosError;
  }
};


export { request, AxiosError };
export default api;
