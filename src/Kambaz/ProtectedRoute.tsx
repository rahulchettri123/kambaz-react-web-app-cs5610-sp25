import { Navigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { cid } = useParams();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const enrollments = useSelector((state: any) => state.enrollmentsReducer.enrollments);

  // Allow access if user is faculty
  if (currentUser?.role === 'FACULTY') {
    return <>{children}</>;
  }

  // Check if student is enrolled in the course
  const isEnrolled = enrollments.some(
    (enrollment: any) =>
      enrollment.user === currentUser?._id && enrollment.course === cid
  );

  // Redirect to dashboard if not enrolled
  if (!isEnrolled) {
    return <Navigate to="/Kambaz" replace />;
  }

  return <>{children}</>;
} 