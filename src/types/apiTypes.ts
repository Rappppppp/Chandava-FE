import { type User } from "./myBooking";

// src/types/apiTypes.ts
export interface ApiResponse<T> {
    status: number;
    message: string;
    data: T;
  }
  
  export interface SuccessResponse<T> {
    success: true;
    response: T;
    user?: User;
  }
  
  export interface ErrorResponse {
    success: false;
    message: string;
  }
  