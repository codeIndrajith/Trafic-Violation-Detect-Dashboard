import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store";

interface AuthorizeProtectionProps {
  allowedRoles: string[];
}

const AuthorizeProtection: React.FC<AuthorizeProtectionProps> = ({
  allowedRoles,
}) => {
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);
  const role = userInfo?.role || null;

  if (!role) {
    return <Navigate to="/sign-in" replace />;
  }

  if (!allowedRoles.includes(role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};

export default AuthorizeProtection;
