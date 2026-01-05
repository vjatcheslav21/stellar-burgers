import { fetchFeed, fetchProfileOrders } from '@thunks/feedsThunk';
import { RequestStatus, TOrder, TOrdersData } from '@utils-types';
import { FEEDS_SLICE_NAME } from '@slices/sliceNames';
import feedsSlice from './feedsSlice';

const mockFeedData: TOrdersData = {
  orders: [
    {
      _id: '1',
      status: 'done',
      name: 'Бургер 1',
      createdAt: '2023-01-01T00:00:00.000Z',
      updatedAt: '2023-01-01T00:01:00.000Z',
      number: 1001,
      ingredients: ['ing1', 'ing2']
    }
  ],
  total: 100,
  totalToday: 10
};

const mockProfileOrders: TOrder[] = [
  {
    _id: '2',
    status: 'pending',
    name: 'Бургер 2',
    createdAt: '2023-01-02T00:00:00.000Z',
    updatedAt: '2023-01-02T00:01:00.000Z',
    number: 1002,
    ingredients: ['ing3', 'ing4']
  }
];

describe('Проверяют редьюсеры feedsSlice', () => {
  it('должен возвращать начальное состояние', () => {
    const result = feedsSlice.reducer(undefined, { type: 'UNKNOWN_ACTION' });
    expect(result).toEqual(feedsSlice.getInitialState());
  });

  it('при вызове pending экшена устанавливает requestStatus в Loading', () => {
    const action = { type: `${FEEDS_SLICE_NAME}/someAction/pending` };

    const result = feedsSlice.reducer(feedsSlice.getInitialState(), action);

    expect(result.requestStatus).toBe(RequestStatus.Loading);
    expect(result.feeds).toBeNull();
    expect(result.ordersAuth).toEqual([]);
  });

  it('при вызове rejected экшена устанавливает requestStatus в Failed', () => {
    const action = { type: `${FEEDS_SLICE_NAME}/someAction/rejected` };

    const result = feedsSlice.reducer(feedsSlice.getInitialState(), action);

    expect(result.requestStatus).toBe(RequestStatus.Failed);
    expect(result.feeds).toBeNull();
    expect(result.ordersAuth).toEqual([]);
  });

  it('при успешном выполнении fetchFeed записывает данные в feeds и меняет статус', () => {
    const action = {
      type: fetchFeed.fulfilled.type,
      payload: mockFeedData
    };

    const result = feedsSlice.reducer(feedsSlice.getInitialState(), action);

    expect(result.feeds).toEqual(mockFeedData);
    expect(result.requestStatus).toBe(RequestStatus.Success);
    expect(result.ordersAuth).toEqual([]);
  });

  it('при успешном выполнении fetchProfileOrders записывает данные в ordersAuth и меняет статус', () => {
    const action = {
      type: fetchProfileOrders.fulfilled.type,
      payload: mockProfileOrders
    };

    const result = feedsSlice.reducer(feedsSlice.getInitialState(), action);

    expect(result.ordersAuth).toEqual(mockProfileOrders);
    expect(result.requestStatus).toBe(RequestStatus.Success);
    expect(result.feeds).toBeNull();
  });
});
