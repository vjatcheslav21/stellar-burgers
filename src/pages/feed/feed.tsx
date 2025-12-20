import { FC, useEffect } from 'react';
import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { useDispatch, useSelector } from '@hooks';
import { fetchFeed } from '@thunks/feedsThunk';
import { feedsSelectors } from '@slices/feedsSlice/feedsSlice';

export const Feed: FC = () => {
  const dispatch = useDispatch();
  const feeds = useSelector(feedsSelectors.feedSelect)?.orders;
  const feedsIsLoading = useSelector(feedsSelectors.feedIsLoadingSelect);

  useEffect(() => {
    dispatch(fetchFeed());
  }, [dispatch]);

  if (feedsIsLoading || !feeds) {
    return <Preloader />;
  }

  return <FeedUI orders={feeds} handleGetFeeds={() => dispatch(fetchFeed())} />;
};
