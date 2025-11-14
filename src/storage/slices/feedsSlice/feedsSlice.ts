import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RequestStatus, TOrder, TOrdersData } from '@utils-types';
import { FEEDS_SLICE_NAME } from '@slices/sliceNames';
import { fetchFeed, fetchProfileOrders } from '@thunks/feedsThunk';

interface FeedsState {
  feed: TOrdersData | null;
  ordersAuth: TOrder[];
  requestStatus: RequestStatus;
}

const initialState: FeedsState = {
  feed: null,
  ordersAuth: [],
  requestStatus: RequestStatus.Idle
};

const feedsSlice = createSlice({
  name: FEEDS_SLICE_NAME,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeed.pending, (state) => {
        state.requestStatus = RequestStatus.Loading;
      })
      .addCase(
        fetchFeed.fulfilled,
        (state, action: PayloadAction<TOrdersData>) => {
          state.feed = action.payload;
          state.requestStatus = RequestStatus.Success;
        }
      )
      .addCase(fetchFeed.rejected, (state) => {
        state.requestStatus = RequestStatus.Failed;
      })
      .addCase(fetchProfileOrders.pending, (state) => {
        state.requestStatus = RequestStatus.Loading;
      })
      .addCase(
        fetchProfileOrders.fulfilled,
        (state, action: PayloadAction<TOrder[]>) => {
          state.ordersAuth = action.payload;
          state.requestStatus = RequestStatus.Success;
        }
      )
      .addCase(fetchProfileOrders.rejected, (state) => {
        state.requestStatus = RequestStatus.Failed;
      });
  },
  selectors: {
    feedSelect: (state) => state.feed,
    feedOrdersSelect: (state) => state.ordersAuth,
    feedIsLoadingSelect: (state) =>
      state.requestStatus === RequestStatus.Loading
  }
});

export const feedsSelectors = feedsSlice.selectors;
export default feedsSlice;
