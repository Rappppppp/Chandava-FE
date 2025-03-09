import { useNavigate } from "react-router-dom";
import { useAuth } from "@contexts/AuthContext";

const Unauthorized = () => {
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  console.log(user);
  if (loading) return <p>Loading...</p>;



  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold text-red-600">Access Denied</h1>
      <p className="text-gray-600">You don't have permission to access this page.</p>
      <button
        className="mt-4 px-5 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600"
        onClick={() => navigate(user?.role === "admin" ? "/admin" : "/users", { replace: true })}
      >
        Go Back
      </button>
    </div>
  );
};

export default Unauthorized;
