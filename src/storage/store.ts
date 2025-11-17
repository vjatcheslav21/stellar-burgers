import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import ingredientsSlice from '@slices/ingredientsSlice/ingredientsSlice';
import feedsSlice from '@slices/feedsSlice/feedsSlice';
import constructorSlice from '@slices/constructorSlice/constructorSlice';
import userSlice from '@slices/userSlice/userSlice';
import orderSlice from '@slices/orderSlice/orderSlice';

const rootReducer = combineReducers({
  [userSlice.name]: userSlice.reducer,
  [ingredientsSlice.name]: ingredientsSlice.reducer,
  [constructorSlice.name]: constructorSlice.reducer,
  [feedsSlice.name]: feedsSlice.reducer,
  [orderSlice.name]: orderSlice.reducer
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
