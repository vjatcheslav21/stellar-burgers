import { FC, useEffect } from 'react';
import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { useDispatch, useSelector } from '@store';
import { fetchFeed } from '@thunks/feedsThunk';
import { feedsSelectors } from '@slices/feedsSlice/feedsSlice';

export const Feed: FC = () => {
  const dispatch = useDispatch();
  const orders = useSelector(feedsSelectors.feedSelect);
  const feedsIsLoading = useSelector(feedsSelectors.feedIsLoadingSelect);

  useEffect(() => {
    dispatch(fetchFeed());
  }, [dispatch]);

  if (feedsIsLoading || !orders) {
    return <Preloader />;
  }

  return (
    <FeedUI
      orders={orders.orders}
      handleGetFeeds={() => dispatch(fetchFeed())}
    />
  );
};
