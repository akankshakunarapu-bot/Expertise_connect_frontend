import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { AuthState, AuthUser, AuthTokens } from '@/types';
import { storage } from '@/utils';
import { TOKEN_KEY, REFRESH_TOKEN_KEY, USER_KEY } from '@/constants';

const initialState: AuthState = {
  user: storage.get<AuthUser>(USER_KEY),
  tokens: storage.get<AuthTokens>(TOKEN_KEY) ? {
    accessToken: storage.get<string>(TOKEN_KEY) || '',
    refreshToken: storage.get<string>(REFRESH_TOKEN_KEY) || '',
    expiresIn: 3600,
  } : null,
  isAuthenticated: !!storage.get<string>(TOKEN_KEY),
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setCredentials: (state, action: PayloadAction<{ user: AuthUser; tokens: AuthTokens }>) => {
      state.user = action.payload.user;
      state.tokens = action.payload.tokens;
      state.isAuthenticated = true;
      state.isLoading = false;
      state.error = null;
      storage.set(TOKEN_KEY, action.payload.tokens.accessToken);
      storage.set(REFRESH_TOKEN_KEY, action.payload.tokens.refreshToken);
      storage.set(USER_KEY, action.payload.user);
    },
    updateUser: (state, action: PayloadAction<Partial<AuthUser>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
        storage.set(USER_KEY, state.user);
      }
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    clearError: (state) => {
      state.error = null;
    },
    logout: (state) => {
      state.user = null;
      state.tokens = null;
      state.isAuthenticated = false;
      state.isLoading = false;
      state.error = null;
      storage.remove(TOKEN_KEY);
      storage.remove(REFRESH_TOKEN_KEY);
      storage.remove(USER_KEY);
    },
  },
});

export const { setLoading, setCredentials, updateUser, setError, clearError, logout } = authSlice.actions;
export default authSlice.reducer;
