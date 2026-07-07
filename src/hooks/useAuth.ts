import { useAppSelector, useAppDispatch } from '@/store';
import { setCredentials, logout as logoutAction, updateUser } from '@/store/slices/authSlice';
import type { AuthUser, AuthTokens } from '@/types';
import { CURRENT_USER } from '@/constants/dummy-data';

export function useAuth() {
  const dispatch = useAppDispatch();
  const { user, isAuthenticated, isLoading, error } = useAppSelector((state) => state.auth);

  const login = (user: AuthUser, tokens: AuthTokens) => {
    dispatch(setCredentials({ user, tokens }));
  };

  const logout = () => {
    dispatch(logoutAction());
  };

  const update = (data: Partial<AuthUser>) => {
    dispatch(updateUser(data));
  };

  // For demo purposes, simulate login with mock user
  const demoLogin = () => {
    dispatch(setCredentials({
      user: {
        ...CURRENT_USER,
        isVerified: true,
      },
      tokens: {
        accessToken: 'demo-access-token',
        refreshToken: 'demo-refresh-token',
        expiresIn: 3600,
      },
    }));
  };

  return {
    user,
    isAuthenticated,
    isLoading,
    error,
    login,
    logout,
    update,
    demoLogin,
  };
}
