import { FC, SyntheticEvent } from 'react';
import { useLocation } from 'react-router-dom';
import { ProfileMenuUI } from '@ui';
import { useDispatch } from '@hooks';
import { logoutUser } from '@thunks/userThunk';

export const ProfileMenu: FC = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <ProfileMenuUI handleLogout={handleLogout} pathname={location.pathname} />
  );
};
