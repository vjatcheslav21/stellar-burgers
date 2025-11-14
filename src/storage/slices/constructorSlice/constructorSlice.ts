import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CONSTRUCTOR_SLICE_NAME } from '@slices/sliceNames';
import { TConstructorIngredient, TIngredient } from '@utils-types';
import { v4 as uuidv4 } from 'uuid';

export type ConstructorState = {
  bun: TConstructorIngredient | null;
  ingredients: TConstructorIngredient[];
};

export const constructorInitialState: ConstructorState = {
  bun: null,
  ingredients: []
};

const constructorSlice = createSlice({
  name: CONSTRUCTOR_SLICE_NAME,
  initialState: constructorInitialState,
  reducers: {
    addIngredient(state, action: PayloadAction<{ ingredient: TIngredient }>) {
      const { ingredient } = action.payload;
      const newIngredient: TConstructorIngredient = {
        ...ingredient,
        id: uuidv4()
      };

      if (ingredient.type === 'bun') {
        state.bun = newIngredient;
      } else {
        state.ingredients.push(newIngredient);
      }
    },
    removeIngredient(state, action: PayloadAction<{ id: string }>) {
      state.ingredients = state.ingredients.filter(
        (i) => i.id !== action.payload.id
      );
    },
    moveIngredient(state, action: PayloadAction<{ from: number; to: number }>) {
      const { from, to } = action.payload;
      const items = [...state.ingredients];
      const [moved] = items.splice(from, 1);
      items.splice(to, 0, moved);
      state.ingredients = items;
    },
    clearConstructor(state) {
      state.bun = null;
      state.ingredients = [];
    }
  },
  selectors: {
    constructorBurgerElement: (state) => state,
    constructorBurgerIsBun: (state) => state.bun,
    constructorBurgerIsIngredients: (state) => state.ingredients
  }
});

export const constructorActions = constructorSlice.actions;
export const constructorSelectors = constructorSlice.selectors;
export default constructorSlice;
