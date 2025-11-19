import { Navigate, useLocation } from 'react-router-dom';
import { Preloader } from '@ui';
import { useSelector } from '@hooks';
import { userSelectors } from '@slices/userSlice/userSlice';

type ProtectedRouteProps = { children: JSX.Element; isPublic?: boolean };

export const ProtectedRoute = ({ children, isPublic }: ProtectedRouteProps) => {
  const checkUser = useSelector(userSelectors.isAuthCheckedSelect);
  const user = useSelector(userSelectors.userSelect);
  const location = useLocation();

  if (!checkUser) {
    return <Preloader />;
  }

  if (isPublic && user) {
    const from = location.state?.from || { pathname: '/' };
    return (
      <Navigate to={from} state={{ background: from?.state?.background }} />
    );
  }

  if (!isPublic && !user) {
    return <Navigate to='/login' state={{ from: location }} />;
  }

  return children;
};
