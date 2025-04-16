import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

interface AdminRouteProps {
  children: React.ReactNode;
}

export default function AdminRoute({ children }: AdminRouteProps) {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  
  // Allow access only if user is admin
  if (currentUser?.role === "ADMIN") {
    return <>{children}</>;
  } else {
    // Redirect to dashboard if not admin
    return <Navigate to="/Kambaz/Dashboard" replace />;
  }
} 