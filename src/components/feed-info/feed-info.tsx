import { FC } from 'react';
import { TOrder } from '@utils-types';
import { FeedInfoUI } from '@components/ui';
import { useSelector } from '@store';
import { feedsSelectors } from '@slices/feedsSlice/feedsSlice';

const getOrders = (orders: TOrder[], status: string): number[] =>
  orders
    .filter((item) => item.status === status)
    .map((item) => item.number)
    .slice(0, 20);

export const FeedInfo: FC = () => {
  const feed = useSelector(feedsSelectors.feedSelect);
  const orders: TOrder[] = feed?.orders || [];
  const readyOrders = getOrders(orders, 'done');
  const pendingOrders = getOrders(orders, 'pending');
  return (
    <FeedInfoUI
      readyOrders={readyOrders}
      pendingOrders={pendingOrders}
      feed={feed || { orders: [], total: 0, totalToday: 0 }}
    />
  );
};
