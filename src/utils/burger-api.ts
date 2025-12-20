import { setCookie, getCookie } from './cookie';
import { TIngredient, TOrder, TOrdersData, TUser } from './types';

const BASE_URL = process.env.BURGER_API_URL;

const request = async <T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> => {
  const res = await fetch(`${BASE_URL}${endpoint}`, options);

  if (!res.ok) {
    const err = await res.json();
    return Promise.reject(err);
  }

  const data = await res.json();

  if (data && typeof data === 'object' && 'success' in data && !data.success) {
    return Promise.reject(data);
  }

  return data;
};

// Функция для запросов с обновлением токена
const requestWithRefresh = async <T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> => {
  try {
    return await request<T>(endpoint, options);
  } catch (err) {
    if ((err as { message: string }).message === 'jwt expired') {
      const refreshData = await refreshToken();

      // Убедимся, что headers существует и является объектом
      if (!options.headers) {
        options.headers = {};
      }

      // Приведение типа к Record<string, string> для безопасного присваивания
      (options.headers as Record<string, string>).authorization =
        refreshData.accessToken;

      return await request<T>(endpoint, options);
    }
    return Promise.reject(err);
  }
};

const refreshToken = async (): Promise<TRefreshResponse> => {
  const refreshData = await request<TRefreshResponse>('/auth/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({
      token: localStorage.getItem('refreshToken')
    })
  });
  localStorage.setItem('refreshToken', refreshData.refreshToken);
  setCookie('accessToken', refreshData.accessToken);
  return refreshData;
};

// Вспомогательная функция для создания заголовков с авторизацией
const createAuthHeaders = (
  additionalHeaders: Record<string, string> = {}
): Record<string, string> => {
  const token = getCookie('accessToken');
  const headers: Record<string, string> = { ...additionalHeaders };

  if (token) {
    headers.authorization = token;
  }

  return headers;
};

type TServerResponse<T> = {
  success: boolean;
} & T;

type TRefreshResponse = TServerResponse<{
  refreshToken: string;
  accessToken: string;
}>;

type TIngredientsResponse = TServerResponse<{
  data: TIngredient[];
}>;

type TFeedsResponse = TServerResponse<{
  orders: TOrder[];
  total: number;
  totalToday: number;
}>;

type TNewOrderResponse = TServerResponse<{
  order: TOrder;
  name: string;
}>;

type TOrderResponse = TServerResponse<{
  orders: TOrder[];
}>;

type TAuthResponse = TServerResponse<{
  refreshToken: string;
  accessToken: string;
  user: TUser;
}>;

type TUserResponse = TServerResponse<{
  user: TUser;
}>;

// API функции
export const getIngredientsApi = () =>
  request<TIngredientsResponse>('/ingredients').then((data) => data.data);

export const getFeedsApi = () => request<TFeedsResponse>('/orders/all');

export const getOrdersApi = () =>
  requestWithRefresh<TFeedsResponse>('/orders', {
    headers: createAuthHeaders()
  }).then((data) => data.orders);

export const orderBurgerApi = (data: string[]) =>
  requestWithRefresh<TNewOrderResponse>('/orders', {
    method: 'POST',
    headers: createAuthHeaders({
      'Content-Type': 'application/json;charset=utf-8'
    }),
    body: JSON.stringify({
      ingredients: data
    })
  });

export const getOrderByNumberApi = (number: number) =>
  request<TOrderResponse>(`/orders/${number}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  });

export type TRegisterData = {
  email: string;
  name: string;
  password: string;
};

export const registerUserApi = (data: TRegisterData) =>
  request<TAuthResponse>('/auth/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(data)
  });

export type TLoginData = {
  email: string;
  password: string;
};

export const loginUserApi = (data: TLoginData) =>
  request<TAuthResponse>('/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(data)
  });

export const forgotPasswordApi = (data: { email: string }) =>
  request<{ success: boolean }>('/password-reset', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(data)
  });

export const resetPasswordApi = (data: { password: string; token: string }) =>
  request<{ success: boolean }>('/password-reset/reset', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(data)
  });

export const getUserApi = () =>
  requestWithRefresh<TUserResponse>('/auth/user', {
    headers: createAuthHeaders()
  });

export const updateUserApi = (user: Partial<TRegisterData>) =>
  requestWithRefresh<TUserResponse>('/auth/user', {
    method: 'PATCH',
    headers: createAuthHeaders({
      'Content-Type': 'application/json;charset=utf-8'
    }),
    body: JSON.stringify(user)
  });

export const logoutApi = () =>
  request<{ success: boolean }>('/auth/logout', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({
      token: localStorage.getItem('refreshToken')
    })
  });
