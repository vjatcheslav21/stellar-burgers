import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RequestStatus, TOrder } from '@utils-types';
import { ORDER_SLICE_NAME } from '@slices/sliceNames';
import { createOrder, fetchOrderByNumber } from '@thunks/orderThunk';

export type OrderState = {
  orderRequest: boolean;
  orderData: TOrder | null;
  requestStatus: RequestStatus;
};

const initialState: OrderState = {
  orderRequest: false,
  orderData: null,
  requestStatus: RequestStatus.Idle
};

const orderSlice = createSlice({
  name: ORDER_SLICE_NAME,
  initialState,
  reducers: {
    clearOrder(state) {
      state.orderData = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.orderRequest = true;
        state.requestStatus = RequestStatus.Loading;
      })
      .addCase(
        createOrder.fulfilled,
        (state, action: PayloadAction<TOrder>) => {
          state.orderRequest = false;
          state.orderData = action.payload;

          state.requestStatus = RequestStatus.Success;
        }
      )
      .addCase(createOrder.rejected, (state) => {
        state.orderRequest = false;
        state.requestStatus = RequestStatus.Failed;
      })
      .addCase(fetchOrderByNumber.pending, (state) => {
        state.requestStatus = RequestStatus.Loading;
      })
      .addCase(
        fetchOrderByNumber.fulfilled,
        (state, action: PayloadAction<TOrder>) => {
          state.orderData = action.payload;
          state.requestStatus = RequestStatus.Success;
        }
      )
      .addCase(fetchOrderByNumber.rejected, (state) => {
        state.requestStatus = RequestStatus.Failed;
      });
  },
  selectors: {
    orderRequestSelect: (state) => state.orderRequest,
    orderDataSelect: (state) => state.orderData,
    orderIsLoadingSelect: (state) =>
      state.requestStatus === RequestStatus.Loading
  }
});

export const orderActions = orderSlice.actions;
export const orderSelectors = orderSlice.selectors;
export default orderSlice;
