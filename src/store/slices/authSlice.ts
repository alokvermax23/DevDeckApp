import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  username: string | null;
}

const initialState: AuthState = {
  token: null,
  isAuthenticated: false,
  username: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ token: string; username?: string }>
    ) => {
      state.token = action.payload.token;
      state.isAuthenticated = true;
      if (action.payload.username) {
        state.username = action.payload.username;
      }
    },
    setUsername: (state, action: PayloadAction<string>) => {
      state.username = action.payload;
    },
    logout: (state) => {
      state.token = null;
      state.isAuthenticated = false;
      state.username = null;
    },
  },
});

export const { setCredentials, setUsername, logout } = authSlice.actions;
export default authSlice.reducer;
