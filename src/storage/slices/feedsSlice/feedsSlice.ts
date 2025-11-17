import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RequestStatus, TOrder, TOrdersData } from '@utils-types';
import { FEEDS_SLICE_NAME } from '@slices/sliceNames';
import { fetchFeed, fetchProfileOrders } from '@thunks/feedsThunk';
import {
  isActionFulfilled,
  isActionPending,
  isActionRejected
} from '@utils-redux';

interface FeedsState {
  feeds: TOrdersData | null;
  ordersAuth: TOrder[];
  requestStatus: RequestStatus;
}

const initialState: FeedsState = {
  feeds: null,
  ordersAuth: [],
  requestStatus: RequestStatus.Idle
};

const feedsSlice = createSlice({
  name: FEEDS_SLICE_NAME,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(
        fetchFeed.fulfilled,
        (state, action: PayloadAction<TOrdersData>) => {
          state.feeds = action.payload;
          state.requestStatus = RequestStatus.Success;
        }
      )
      .addCase(
        fetchProfileOrders.fulfilled,
        (state, action: PayloadAction<TOrder[]>) => {
          state.ordersAuth = action.payload;
          state.requestStatus = RequestStatus.Success;
        }
      )
      .addMatcher(isActionPending(FEEDS_SLICE_NAME), (state) => {
        state.requestStatus = RequestStatus.Loading;
      })
      .addMatcher(isActionRejected(FEEDS_SLICE_NAME), (state) => {
        state.requestStatus = RequestStatus.Failed;
      });
  },
  selectors: {
    feedSelect: (state) => state.feeds,
    feedOrdersSelect: (state) => state.ordersAuth,
    feedIsLoadingSelect: (state) =>
      state.requestStatus === RequestStatus.Loading
  }
});

export const feedsSelectors = feedsSlice.selectors;
export default feedsSlice;
