import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { USER_SLICE_NAME } from '@slices/sliceNames';
import {
  fetchUser,
  loginUser,
  registerUser,
  updateUser
} from '@thunks/userThunk';
import { RequestStatus, TUser } from '@utils-types';

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
      .addCase(fetchUser.pending, (state) => {
        state.requestStatus = RequestStatus.Loading;
      })
      .addCase(fetchUser.fulfilled, (state, action: PayloadAction<TUser>) => {
        state.user = action.payload;
        state.userCheck = true;
        state.requestStatus = RequestStatus.Success;
      })
      .addCase(fetchUser.rejected, (state) => {
        state.userCheck = true;
        state.requestStatus = RequestStatus.Failed;
      })
      .addCase(loginUser.pending, (state) => {
        state.requestStatus = RequestStatus.Loading;
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<TUser>) => {
        state.user = action.payload;
        state.userCheck = true;
        state.requestStatus = RequestStatus.Success;
      })
      .addCase(loginUser.rejected, (state) => {
        state.userCheck = true;
        state.requestStatus = RequestStatus.Failed;
      })
      .addCase(registerUser.pending, (state) => {
        state.requestStatus = RequestStatus.Loading;
      })
      .addCase(
        registerUser.fulfilled,
        (state, action: PayloadAction<TUser>) => {
          state.user = action.payload;
          state.userCheck = true;
          state.requestStatus = RequestStatus.Success;
        }
      )
      .addCase(registerUser.rejected, (state) => {
        state.userCheck = true;
        state.requestStatus = RequestStatus.Failed;
      })
      .addCase(updateUser.pending, (state) => {
        state.requestStatus = RequestStatus.Loading;
      })
      .addCase(updateUser.fulfilled, (state, action: PayloadAction<TUser>) => {
        state.user = action.payload;
        state.requestStatus = RequestStatus.Success;
      })
      .addCase(updateUser.rejected, (state) => {
        state.userCheck = true;
        state.requestStatus = RequestStatus.Failed;
      });
    // .addMatcher(
    //   (action) => action.type === 'user/fetchUser/pending',
    //   (state) => {
    //     state.user = { email: 'test@ya.ru', name: 'test' };
    //   }
    // );
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
