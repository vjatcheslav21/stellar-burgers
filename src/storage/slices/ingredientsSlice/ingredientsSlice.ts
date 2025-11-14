import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RequestStatus, TIngredient } from '@utils-types';
import { INGREDIENTS_SLICE_NAME } from '@slices/sliceNames';
import { fetchIngredients } from '@thunks/ingredientsThunk';

interface IngredientsState {
  ingredients: TIngredient[];
  requestStatus: RequestStatus;
}

const initialState: IngredientsState = {
  ingredients: [],
  requestStatus: RequestStatus.Idle
};

const ingredientsSlice = createSlice({
  name: INGREDIENTS_SLICE_NAME,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.requestStatus = RequestStatus.Loading;
      })
      .addCase(
        fetchIngredients.fulfilled,
        (state, action: PayloadAction<TIngredient[]>) => {
          state.ingredients = action.payload;
          state.requestStatus = RequestStatus.Success;
        }
      )
      .addCase(fetchIngredients.rejected, (state) => {
        state.requestStatus = RequestStatus.Failed;
      });
  },
  selectors: {
    ingredientsSelect: (state) => state.ingredients,
    ingredientsIsLoadingSelect: (state) =>
      state.requestStatus === RequestStatus.Loading,
    ingredientByIdSelect: (state: IngredientsState, id: string) =>
      state.ingredients.find((i) => i._id === id) ||
      (null as TIngredient | null)
  }
});

export const ingredientsActions = ingredientsSlice.actions;
export const ingredientsSelectors = ingredientsSlice.selectors;
export default ingredientsSlice;
