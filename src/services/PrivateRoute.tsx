// PrivateRoute.tsx

import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "@/store/useAuthStore"; 

const PrivateRoute = () => {
  const token = useAuthStore((state) => state.token);

  if (!token) {
    return <Navigate to="/signin" />;
  }

  return <Outlet />;
};

export default PrivateRoute;  
