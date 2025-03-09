import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
  InternalAxiosRequestConfig, // ✅ Import this
} from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000, // 10 seconds timeout
  headers: {
    "Content-Type": "application/json",
  },
});

// ✅ FIX: Use `InternalAxiosRequestConfig` in the request interceptor
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor
// api.interceptors.response.use(
//   (response: AxiosResponse) => response,
//   (error: AxiosError) => {
//     if (error.response?.status === 401) {
//       localStorage.removeItem("token");
//     }
//     return Promise.reject(error);
//   }
// );

// Generic API request handler
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
