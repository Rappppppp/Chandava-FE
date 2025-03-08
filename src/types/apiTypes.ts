// src/types/apiTypes.ts
export interface ApiResponse<T> {
    status: number;
    message: string;
    data: T;
  }
  
  export interface SuccessResponse<T> {
    success: true;
    response: T;
  }
  
  export interface ErrorResponse {
    success: false;
    message: string;
  }
  