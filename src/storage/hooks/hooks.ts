import {
  ActionCreatorsMapObject,
  AsyncThunk,
  bindActionCreators,
  createAsyncThunk
} from '@reduxjs/toolkit';
import { AppDispatch, RootState } from '../store';
import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import { useMemo } from 'react';

export const useDispatch: () => AppDispatch = () => dispatchHook();
// export const useAppSelect: TypedUseSelectorHook<RootState> = selectorHook;

// export const createAppAsyncThunk = createAsyncThunk.withTypes<{
//   state: RootState;
//   dispatch: AppDispatch;
//   extra: { s: string; n: number };
// }>();

// export const useActionsCreators = <Actions extends ActionCreatorsMapObject>(
//   actions: Actions
// ): BoundActions<Actions> => {
//   const dispatch = useDispatch();

//   return useMemo(() => bindActionCreators(actions, dispatch), []);

//   type BoundActions<Actions extends ActionCreatorsMapObject> = {
//     [key in keyof Actions]: Actions[key] extends AsyncThunk<any, any, any>
//       ? BoundAsynkThunk<Actions[key]>
//       : Actions[key];
//   };

//   type BoundAsynkThunk<Thunk extends AsyncThunk<any, any, any>> = (
//     ...args: Parameters<Thunk>
//   ) => ReturnType<ReturnType<Thunk>>;
// };

type BoundActions<Actions extends ActionCreatorsMapObject> = {
  [key in keyof Actions]: Actions[key] extends AsyncThunk<any, any, any>
    ? BoundAsyncThunk<Actions[key]>
    : Actions[key];
};

type BoundAsyncThunk<Thunk extends AsyncThunk<any, any, any>> = (
  ...args: Parameters<Thunk>
) => ReturnType<ReturnType<Thunk>>;

export const useActionsCreators = <Actions extends ActionCreatorsMapObject>(
  actions: Actions
): BoundActions<Actions> => {
  const dispatch = useDispatch();

  return useMemo(
    () => bindActionCreators(actions, dispatch),
    [actions, dispatch]
  );
};
