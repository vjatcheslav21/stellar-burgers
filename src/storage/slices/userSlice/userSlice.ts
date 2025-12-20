import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  isActionFulfilled,
  isActionPending,
  isActionRejected
} from '@utils-redux';
import { RequestStatus, TUser } from '@utils-types';
import { USER_SLICE_NAME } from '@slices/sliceNames';
import { updateUser } from '@thunks/userThunk';

interface UserState {
  user: TUser | null;
  userCheck: boolean;
  requestStatus: RequestStatus;
}

const initialState: UserState = {
  user: null,
  userCheck: false,
  requestStatus: RequestStatus.Idle
};

const userSlice = createSlice({
  name: USER_SLICE_NAME,
  initialState,
  reducers: {
    setUserCheck: (state) => {
      state.userCheck = true;
    },
    userLogout: (state) => {
      state.user = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateUser.fulfilled, (state, action: PayloadAction<TUser>) => {
        state.user = action.payload;
        state.requestStatus = RequestStatus.Success;
      })
      .addMatcher(isActionPending(USER_SLICE_NAME), (state) => {
        state.requestStatus = RequestStatus.Loading;
      })
      .addMatcher(
        isActionFulfilled(USER_SLICE_NAME),
        (state, action: PayloadAction<TUser>) => {
          state.user = action.payload;
          state.userCheck = true;
          state.requestStatus = RequestStatus.Success;
        }
      )
      .addMatcher(isActionRejected(USER_SLICE_NAME), (state) => {
        state.requestStatus = RequestStatus.Failed;
      });
  },
  selectors: {
    userSelect: (state) => state.user,
    isAuthCheckedSelect: (state) => state.userCheck,
    userIsLoadingSelect: (state) =>
      state.requestStatus === RequestStatus.Loading
  }
});

export const userActions = userSlice.actions;
export const userSelectors = userSlice.selectors;
export default userSlice;
