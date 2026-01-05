import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RequestStatus, TOrder } from '@utils-types';
import { ORDER_SLICE_NAME } from '@slices/sliceNames';
import { createOrder, fetchOrderByNumber } from '@thunks/orderThunk';

export type OrderState = {
  newOrder: TOrder | null;
  newOrderRequest: boolean;
  currentOrder: TOrder | null;
  currentOrderLoading: boolean;
  requestStatus: RequestStatus;
};

const initialState: OrderState = {
  newOrder: null,
  newOrderRequest: false,
  currentOrder: null,
  currentOrderLoading: false,
  requestStatus: RequestStatus.Idle
};

const orderSlice = createSlice({
  name: ORDER_SLICE_NAME,
  initialState,
  reducers: {
    clearNewOrder(state) {
      state.newOrder = null;
    },
    clearCurrentOrder(state) {
      state.currentOrder = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.newOrderRequest = true;
        state.requestStatus = RequestStatus.Loading;
      })
      .addCase(
        createOrder.fulfilled,
        (state, action: PayloadAction<TOrder>) => {
          state.newOrderRequest = false;
          state.newOrder = action.payload;
          state.requestStatus = RequestStatus.Success;
        }
      )
      .addCase(createOrder.rejected, (state) => {
        state.newOrderRequest = false;
        state.requestStatus = RequestStatus.Failed;
      })
      .addCase(fetchOrderByNumber.pending, (state) => {
        state.currentOrderLoading = true;
        state.requestStatus = RequestStatus.Loading;
      })
      .addCase(
        fetchOrderByNumber.fulfilled,
        (state, action: PayloadAction<TOrder>) => {
          state.currentOrderLoading = false;
          state.currentOrder = action.payload;
          state.requestStatus = RequestStatus.Success;
        }
      )
      .addCase(fetchOrderByNumber.rejected, (state) => {
        state.currentOrderLoading = false;
        state.requestStatus = RequestStatus.Failed;
      });
  },
  selectors: {
    newOrderSelect: (state) => state.newOrder,
    newOrderRequestSelect: (state) => state.newOrderRequest,
    currentOrderSelect: (state) => state.currentOrder,
    currentOrderLoadingSelect: (state) => state.currentOrderLoading,
    orderIsLoadingSelect: (state) =>
      state.requestStatus === RequestStatus.Loading
  }
});

export const orderActions = orderSlice.actions;
export const orderSelectors = orderSlice.selectors;
export default orderSlice;
