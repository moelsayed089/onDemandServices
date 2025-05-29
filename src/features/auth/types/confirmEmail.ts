export interface ConfirmEmailPayload {
  email: string;
}

export interface ConfirmEmailResponse {
  message: string;
  confirmationToken: string;
}
