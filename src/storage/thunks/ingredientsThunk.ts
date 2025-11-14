import { createAsyncThunk } from '@reduxjs/toolkit';
import { getIngredientsApi } from '@api';
import { INGREDIENTS_SLICE_NAME } from '@slices/sliceNames';

export const fetchIngredients = createAsyncThunk(
  `${INGREDIENTS_SLICE_NAME}/fetchIngredients`,
  async () => {
    const res = await getIngredientsApi();
    return res;
  }
);
