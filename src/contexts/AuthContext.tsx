import { createContext, useContext, useEffect, useState } from "react";
import { AuthService } from "@features/auth/services/AuthService";
import toast from "react-hot-toast";



// Define User type
interface User {
  id: string;
  email: string;
  role: string;
  first_name: string;
  last_name: string;
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

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [logoutLoading, setLogoutLoading] = useState(false);


  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await AuthService.me();
        setUser(response.data);
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
      await AuthService.logout();
      setUser(null);
      window.location.href = "/login";



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
