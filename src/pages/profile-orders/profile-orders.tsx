import { FC, useEffect } from 'react';
import { ProfileOrdersUI } from '@ui-pages';
import { Preloader } from '@ui';
import { useDispatch, useSelector } from '@hooks';
import { fetchProfileOrders } from '@thunks/feedsThunk';
import { feedsSelectors } from '@slices/feedsSlice/feedsSlice';

export const ProfileOrders: FC = () => {
  const orders = useSelector(feedsSelectors.feedOrdersSelect);
  const orderIsLoading = useSelector(feedsSelectors.feedIsLoadingSelect);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProfileOrders());
  }, [dispatch]);

  if (orderIsLoading) {
    return <Preloader />;
  }

  return <ProfileOrdersUI orders={orders} />;
};
