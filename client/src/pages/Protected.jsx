import { Outlet, Navigate, useLocation } from 'react-router-dom';
import Loader from '../components/Loader';
import { useAuthStore } from '../store';

const Protected = () => {
  const location = useLocation();
  const { verifyLoading, verifySuccess } = useAuthStore();

  if (verifyLoading === null || verifyLoading) {
    return <Loader />;
  }

  if (!verifySuccess && location.pathname !== "/auth") {
    localStorage.setItem('prevPath', location.pathname);
    return <Navigate to="/auth" />;
  }

  return <Outlet />;
};

export default Protected;