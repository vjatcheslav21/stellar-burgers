import { getFeedsApi, getOrdersApi } from '@api';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { FEEDS_SLICE_NAME } from '@slices/sliceNames';

export const fetchFeed = createAsyncThunk(
  `${FEEDS_SLICE_NAME}/fetchFeed`,
  async () => {
    const res = await getFeedsApi();
    return res;
  }
);

export const fetchProfileOrders = createAsyncThunk(
  `${FEEDS_SLICE_NAME}/fetchProfileOrders`,
  async () => {
    const res = await getOrdersApi();
    return res;
  }
);
