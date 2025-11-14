import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { useSelector } from '@store';
import { userSelectors } from '@slices/userSlice/userSlice';

export const AppHeader: FC = () => {
  const userName = useSelector(userSelectors.userSelect);
  return <AppHeaderUI userName={userName?.name || ''} />;
};
