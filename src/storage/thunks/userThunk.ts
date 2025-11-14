import {
  forgotPasswordApi,
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  resetPasswordApi,
  TLoginData,
  TRegisterData,
  updateUserApi
} from '@api';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { deleteCookie, getCookie, setCookie } from '../../utils/cookie';
import { userActions } from '@slices/userSlice/userSlice';
import { USER_SLICE_NAME } from '@slices/sliceNames';

export const fetchUser = createAsyncThunk(
  `${USER_SLICE_NAME}/fetchUser`,
  async () => {
    const res = await getUserApi();
    return res.user;
  }
);

export const registerUser = createAsyncThunk(
  `${USER_SLICE_NAME}/register`,
  async (data: TRegisterData) => {
    const res = await registerUserApi(data);
    setCookie('accessToken', res.accessToken);
    setCookie('refreshToken', res.refreshToken);
    localStorage.setItem('refreshToken', res.refreshToken);
    return res.user;
  }
);

export const loginUser = createAsyncThunk(
  `${USER_SLICE_NAME}/login`,
  async (data: TLoginData) => {
    const res = await loginUserApi(data);
    setCookie('accessToken', res.accessToken);
    localStorage.setItem('refreshToken', res.refreshToken);
    return res.user;
  }
);

export const updateUser = createAsyncThunk(
  '${USER_SLICE_NAME}/update',
  async (data: Partial<TRegisterData>) => {
    const res = await updateUserApi(data);
    return res.user;
  }
);

export const forgotPassword = createAsyncThunk(
  `${USER_SLICE_NAME}/forgot-password`,
  async (email: string) => {
    const res = await forgotPasswordApi({ email });
    return res;
  }
);

export const resetPassword = createAsyncThunk(
  `${USER_SLICE_NAME}/resetPassword`,
  async ({ password, token }: { password: string; token: string }) => {
    const res = await resetPasswordApi({ password, token });
    return res;
  }
);

export const checkUserAuth = createAsyncThunk(
  `${USER_SLICE_NAME}/checkUser`,
  (_, { dispatch }) => {
    if (getCookie('accessToken')) {
      dispatch(fetchUser()).finally(() => {
        dispatch(userActions.setUserCheck());
      });
    } else {
      dispatch(userActions.setUserCheck());
    }
  }
);

export const logoutUser = createAsyncThunk(
  `${USER_SLICE_NAME}/logout`,
  (_, { dispatch }) => {
    logoutApi().then(() => {
      localStorage.clear();
      deleteCookie('accessToken');
      dispatch(userActions.userLogout());
    });
  }
);
