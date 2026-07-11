import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  username: string | null;
  isNewUser: boolean;
}

import { storage } from '../storage';

const initialToken = storage.getString('jwt_token') || null;
const initialIsNewUser = storage.getBoolean('isNewUser') || false;
const initialUsername = storage.getString('username') || null;

const initialState: AuthState = {
  token: initialToken,
  isAuthenticated: !!initialToken,
  username: initialUsername,
  isNewUser: initialIsNewUser,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ token: string; username?: string; isNewUser?: boolean }>
    ) => {
      state.token = action.payload.token;
      state.isAuthenticated = true;
      if (action.payload.username) {
        state.username = action.payload.username;
      }
      if (action.payload.isNewUser !== undefined) {
        state.isNewUser = action.payload.isNewUser;
      }
    },
    setUsername: (state, action: PayloadAction<string>) => {
      state.username = action.payload;
    },
    completeOnboarding: (state) => {
      state.isNewUser = false;
    },
    logout: (state) => {
      state.token = null;
      state.isAuthenticated = false;
      state.username = null;
      state.isNewUser = false;
    },
  },
});

export const { setCredentials, setUsername, completeOnboarding, logout } = authSlice.actions;

import { baseApi } from '../api/baseApi';

export const logoutUser = () => (dispatch: any) => {
  storage.remove('jwt_token');
  storage.remove('username');
  storage.remove('isNewUser');
  dispatch(logout());
  dispatch(baseApi.util.resetApiState());
};

export default authSlice.reducer;
