import { createContext, useContext, useEffect, useState } from "react";
import request from "@services/api"; // Axios API instance
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { ApiResponse } from "@/types/apiTypes";


// Define User type
interface User {
  id: string;
  email: string;
  role: string;
  first_name: string;
  last_name: string;
  iat: number;
  exp: number;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  logout: () => void;
  logoutLoading: boolean;
}

// Create Context
const AuthContext = createContext<AuthContextType | null>(null);

// Provider Component
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [logoutLoading, setLogoutLoading] = useState(false);


  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await request<ApiResponse<User>>({
          method: "GET",
          url: "/auth/me",
        });
        setUser(response.data.data);
      } catch (error) {
        setUser(null);

      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);



  const logout = async () => {
    try {
      setLogoutLoading(true);

      await request<ApiResponse<unknown>>({
        method: "POST",
        url: "/auth/logout",
      });

      localStorage.removeItem("token");
      setUser(null);
      navigate("/login");


    } catch (error) {
      toast.error("Logout failed");
    } finally {
      setLogoutLoading(false);
    }


  };

  return (
    <AuthContext.Provider value={{ user, loading, logout, logoutLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom Hook
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
