export interface ResetPasswordPayload {
  email: string;
  newPassword: string;
  cNewPassword: string;
}

export interface ResetPasswordResponse {
  status: string;
  accessToken: string;
  accessTokenExpires: string;
}
