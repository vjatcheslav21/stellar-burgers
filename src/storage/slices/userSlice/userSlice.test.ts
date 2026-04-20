import userSlice, { userActions } from './userSlice';
import { updateUser } from '@thunks/userThunk';
import { RequestStatus, TUser } from '@utils-types';
import { USER_SLICE_NAME } from '@slices/sliceNames';

const mockUser: TUser = {
  email: 'test@example.com',
  name: 'test'
};

describe('Проверяют редьюсеры userSlice', () => {
  it('должен возвращать начальное состояние', () => {
    const result = userSlice.reducer(undefined, { type: 'UNKNOWN_ACTION' });
    expect(result).toEqual(userSlice.getInitialState());
  });

  describe('синхронные редьюсеры', () => {
    it('должен установить userCheck в true', () => {
      const action = userActions.setUserCheck();
      const result = userSlice.reducer(userSlice.getInitialState(), action);

      expect(result.userCheck).toBe(true);
      expect(result.user).toBeNull();
      expect(result.requestStatus).toBe(RequestStatus.Idle);
    });

    it('должен очистить пользователя при logout', () => {
      const stateWithUser = {
        ...userSlice.getInitialState(),
        user: mockUser,
        userCheck: true
      };
      const action = userActions.userLogout();
      const result = userSlice.reducer(stateWithUser, action);

      expect(result.user).toBeNull();
      expect(result.userCheck).toBe(true);
      expect(result.requestStatus).toBe(RequestStatus.Idle);
    });
  });

  describe('асинхронные редьюсеры (extraReducers)', () => {
    it('при вызове pending экшена устанавливает requestStatus в Loading', () => {
      const action = { type: `${USER_SLICE_NAME}/someAction/pending` };
      const result = userSlice.reducer(userSlice.getInitialState(), action);

      expect(result.requestStatus).toBe(RequestStatus.Loading);
      expect(result.user).toBeNull();
      expect(result.userCheck).toBe(false);
    });

    it('при вызове rejected экшена устанавливает requestStatus в Failed', () => {
      const action = { type: `${USER_SLICE_NAME}/someAction/rejected` };
      const result = userSlice.reducer(userSlice.getInitialState(), action);

      expect(result.requestStatus).toBe(RequestStatus.Failed);
      expect(result.user).toBeNull();
      expect(result.userCheck).toBe(false);
    });

    it('при успешном выполнении updateUser обновляет пользователя, устанавливает userCheck и меняет статус', () => {
      const action = {
        type: updateUser.fulfilled.type,
        payload: mockUser
      };
      const result = userSlice.reducer(userSlice.getInitialState(), action);

      expect(result.user).toEqual(mockUser);
      expect(result.userCheck).toBe(true);
      expect(result.requestStatus).toBe(RequestStatus.Success);
    });

    it('при вызове любого другого fulfilled экшена обновляет пользователя и устанавливает userCheck', () => {
      const fakeFulfilledAction = {
        type: `${USER_SLICE_NAME}/login/fulfilled`,
        payload: mockUser
      };
      const result = userSlice.reducer(
        userSlice.getInitialState(),
        fakeFulfilledAction
      );

      expect(result.user).toEqual(mockUser);
      expect(result.userCheck).toBe(true);
      expect(result.requestStatus).toBe(RequestStatus.Success);
    });
  });
});
