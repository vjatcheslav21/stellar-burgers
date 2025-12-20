import { getOrderByNumberApi, orderBurgerApi } from '@api';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { ORDER_SLICE_NAME } from '@slices/sliceNames';

export const createOrder = createAsyncThunk(
  `${ORDER_SLICE_NAME}/create`,
  async (ingredientIds: string[]) => {
    const data = await orderBurgerApi(ingredientIds);
    return data.order;
  }
);

export const fetchOrderByNumber = createAsyncThunk(
  `${ORDER_SLICE_NAME}/fetchByNumber`,
  async (number: number) => {
    const data = await getOrderByNumberApi(number);
    return data.orders[0];
  }
);
