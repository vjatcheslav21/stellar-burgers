import orderSlice, { orderActions } from './orderSlice';
import { createOrder, fetchOrderByNumber } from '@thunks/orderThunk';
import { RequestStatus, TOrder } from '@utils-types';

const mockOrder: TOrder = {
  _id: '1',
  status: 'done',
  name: 'Бургер 1',
  createdAt: '2023-01-01T00:00:00.000Z',
  updatedAt: '2023-01-01T00:01:00.000Z',
  number: 1001,
  ingredients: ['ing1', 'ing2']
};

describe('Проверяют редьюсеры orderSlice', () => {
  it('должен возвращать начальное состояние', () => {
    const result = orderSlice.reducer(undefined, { type: 'UNKNOWN_ACTION' });
    expect(result).toEqual(orderSlice.getInitialState());
  });

  describe('синхронные редьюсеры', () => {
    it('должен очистить newOrder', () => {
      const stateWithOrder = {
        ...orderSlice.getInitialState(),
        newOrder: mockOrder
      };
      const action = orderActions.clearNewOrder();
      const result = orderSlice.reducer(stateWithOrder, action);

      expect(result.newOrder).toBeNull();
      expect(result.currentOrder).toBeNull();
    });

    it('должен очистить currentOrder', () => {
      const stateWithOrder = {
        ...orderSlice.getInitialState(),
        currentOrder: mockOrder
      };
      const action = orderActions.clearCurrentOrder();
      const result = orderSlice.reducer(stateWithOrder, action);

      expect(result.currentOrder).toBeNull();
      expect(result.newOrder).toBeNull();
    });
  });

  describe('экшены createOrder', () => {
    it('при pending устанавливает newOrderRequest в true', () => {
      const action = { type: createOrder.pending.type };
      const result = orderSlice.reducer(orderSlice.getInitialState(), action);

      expect(result.newOrderRequest).toBe(true);
      expect(result.requestStatus).toBe(RequestStatus.Loading);
      expect(result.newOrder).toBeNull();
      expect(result.currentOrder).toBeNull();
      expect(result.currentOrderLoading).toBe(false);
    });

    it('при fulfilled записывает заказ и меняет статусы', () => {
      const action = {
        type: createOrder.fulfilled.type,
        payload: mockOrder
      };
      const result = orderSlice.reducer(orderSlice.getInitialState(), action);

      expect(result.newOrderRequest).toBe(false);
      expect(result.newOrder).toEqual(mockOrder);
      expect(result.requestStatus).toBe(RequestStatus.Success);
      expect(result.currentOrder).toBeNull();
      expect(result.currentOrderLoading).toBe(false);
    });

    it('при rejected устанавливает newOrderRequest в false и статус Failed', () => {
      const action = { type: createOrder.rejected.type };
      const result = orderSlice.reducer(orderSlice.getInitialState(), action);

      expect(result.newOrderRequest).toBe(false);
      expect(result.requestStatus).toBe(RequestStatus.Failed);
      expect(result.newOrder).toBeNull();
      expect(result.currentOrder).toBeNull();
      expect(result.currentOrderLoading).toBe(false);
    });
  });

  describe('экшены fetchOrderByNumber', () => {
    it('при pending устанавливает currentOrderLoading в true', () => {
      const action = { type: fetchOrderByNumber.pending.type };
      const result = orderSlice.reducer(orderSlice.getInitialState(), action);

      expect(result.currentOrderLoading).toBe(true);
      expect(result.requestStatus).toBe(RequestStatus.Loading);
      expect(result.newOrder).toBeNull();
      expect(result.newOrderRequest).toBe(false);
      expect(result.currentOrder).toBeNull();
    });

    it('при fulfilled записывает заказ и меняет статусы', () => {
      const action = {
        type: fetchOrderByNumber.fulfilled.type,
        payload: mockOrder
      };
      const result = orderSlice.reducer(orderSlice.getInitialState(), action);

      expect(result.currentOrderLoading).toBe(false);
      expect(result.currentOrder).toEqual(mockOrder);
      expect(result.requestStatus).toBe(RequestStatus.Success);
      expect(result.newOrder).toBeNull();
      expect(result.newOrderRequest).toBe(false);
    });

    it('при rejected устанавливает currentOrderLoading в false и статус Failed', () => {
      const action = { type: fetchOrderByNumber.rejected.type };
      const result = orderSlice.reducer(orderSlice.getInitialState(), action);

      expect(result.currentOrderLoading).toBe(false);
      expect(result.requestStatus).toBe(RequestStatus.Failed);
      expect(result.newOrder).toBeNull();
      expect(result.newOrderRequest).toBe(false);
      expect(result.currentOrder).toBeNull();
    });
  });
});
