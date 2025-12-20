import {
  ActionCreatorsMapObject,
  AsyncThunk,
  bindActionCreators
} from '@reduxjs/toolkit';
import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import { useMemo, useState } from 'react';
import store, { RootState } from '@store';

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

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

export function useForm<T>(initialValues: T) {
  const [values, setValues] = useState<T>(initialValues);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setValues({ ...values, [name]: value });
  };

  return { values, handleChange, setValues };
}
