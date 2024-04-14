import { Navigate, Outlet } from 'react-router-dom';
import useStore from '../store';

const ProtectedRoute = ({ element: Element }) => {
  const data = useStore((state) => state.user);

  // Check if 'data' is an object and has an 'id' property
  const isAuthenticated = typeof data === 'object' && data.id;

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute