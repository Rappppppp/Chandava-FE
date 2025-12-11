import { AxiosError, request } from "@services/api";
import { ApiResponse, SuccessResponse, ErrorResponse } from "@/types/apiTypes";
import api from "@services/api";

interface LoginResponse {
  token: string;
  role: string;
}

interface RegisterResponse {
  message: string;
}

export const AuthService = {
  login: async (email: string, password: string) => {
    const response = await api.post("/login", { email, password });
    return response.data;
  }
}

export const login = async (
  email: string,
  password: string
): Promise<SuccessResponse<LoginResponse> | ErrorResponse> => {
  try {
    const response = await request<ApiResponse<LoginResponse>>({
      method: "POST",
      url: "/login",
      data: { email, password },
    });

    const token = response.data.token; // <-- matches backend
    if (token) {
      localStorage.setItem("token", token); // store JWT
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`; // attach for future requests
    }

    return {
      success: true,
      response: response.data,
    };
  } catch (error) {
    const axiosError = error as AxiosError<ApiResponse<unknown>>;
    return {
      success: false,
      message: axiosError.response?.data?.message || "Login failed",
    };
  }
};



export const register = async (formData: Record<string, { value: any }>): Promise<SuccessResponse<RegisterResponse> | ErrorResponse> => {
  try {
    const response = await request<ApiResponse<RegisterResponse>>({
      method: "POST",
      url: "/register",
      data: {
        first_name: formData.first_name.value,
        last_name: formData.last_name.value,
        nickname: formData.nickname.value,
        birthdate: formData.birthdate.value,
        contact_number: formData.contact_number.value,
        email: formData.email.value,
        address: formData.address.value,
        password: formData.password.value,
        password_confirmation: formData.password_confirmation.value,
        role: "user"
      },
    });

    return {
      success: true,
      response: response.data,
    };
  } catch (error) {
    const axiosError = error as AxiosError<ApiResponse<unknown>>;

    return {
      success: false,
      message: axiosError.response?.data?.message || "Registration failed",
    };
  }
};
