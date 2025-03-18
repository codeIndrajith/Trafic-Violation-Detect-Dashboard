import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store";

const PublicRoute = () => {
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);

  return userInfo ? <Navigate to="/dashboard" replace /> : <Outlet />;
};

export default PublicRoute;
