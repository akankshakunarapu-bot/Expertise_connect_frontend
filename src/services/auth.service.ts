import api from './api';
import { API_ENDPOINTS } from '@/constants/routes';
import type { LoginCredentials, SignupCredentials, OTPVerification, ForgotPasswordRequest, ResetPasswordRequest, AuthTokens, AuthUser } from '@/types';
import type { ApiResponse } from '@/types';

export const authService = {
  login: (credentials: LoginCredentials) =>
    api.post<ApiResponse<{ user: AuthUser; tokens: AuthTokens }>>(API_ENDPOINTS.AUTH.LOGIN, credentials),

  register: (data: SignupCredentials) =>
    api.post<ApiResponse<{ user: AuthUser }>>(API_ENDPOINTS.AUTH.REGISTER, data),

  verifyOTP: (data: OTPVerification) =>
    api.post<ApiResponse<{ user: AuthUser; tokens: AuthTokens }>>(API_ENDPOINTS.AUTH.VERIFY_OTP, data),

  resendOTP: (email: string) =>
    api.post<ApiResponse<null>>(API_ENDPOINTS.AUTH.RESEND_OTP, { email }),

  forgotPassword: (data: ForgotPasswordRequest) =>
    api.post<ApiResponse<null>>(API_ENDPOINTS.AUTH.FORGOT_PASSWORD, data),

  resetPassword: (data: ResetPasswordRequest) =>
    api.post<ApiResponse<null>>(API_ENDPOINTS.AUTH.RESET_PASSWORD, data),

  refreshToken: (refreshToken: string) =>
    api.post<ApiResponse<AuthTokens>>(API_ENDPOINTS.AUTH.REFRESH_TOKEN, { refreshToken }),

  logout: () =>
    api.post<ApiResponse<null>>(API_ENDPOINTS.AUTH.LOGOUT),

  socialLogin: (provider: string, token: string) =>
    api.post<ApiResponse<{ user: AuthUser; tokens: AuthTokens }>>(API_ENDPOINTS.AUTH.SOCIAL_LOGIN, { provider, token }),
};

export default authService;
