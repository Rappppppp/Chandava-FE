import { AxiosError, request } from "@services/api";
import { ApiResponse, SuccessResponse, ErrorResponse } from "@/types/apiTypes";

interface LoginResponse {
  token: string;
  role: string;
}

interface RegisterResponse {
  message: string;
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

    return {
      success: true,
      response: response.data, // ✅ Extracts `{ token, role }`
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
        confirm_password: formData.confirm_password.value,
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
