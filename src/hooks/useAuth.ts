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
  const demoLogin = (role: 'learner' | 'expert' | 'admin' = 'learner') => {
    const mockUser = {
      ...CURRENT_USER,
      isVerified: true,
      role,
    };

    if (role === 'expert') {
      mockUser.fullName = 'John David';
      mockUser.email = 'john.david@example.com';
      mockUser.avatar = 'https://ui-avatars.com/api/?background=10B981&color=fff&name=John+David&size=128';
    } else if (role === 'admin') {
      mockUser.fullName = 'System Administrator';
      mockUser.email = 'admin@expertiseconnect.com';
      mockUser.avatar = 'https://ui-avatars.com/api/?background=6366F1&color=fff&name=Admin&size=128';
    }

    dispatch(setCredentials({
      user: mockUser,
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
