export interface signupPayload {
  email: string;
  password: string;
  name: string;
  phone: string;
  cPassword: string;
}

export interface SignupResponse {
  message: string;
  data: {
    _id: string;
    name: string;
    email: string;
    phone: string;
    provider: string;
    role: string;
    password: string;
    account_status: string;
    active: boolean;
    createdAt: string;
    updatedAt: string;
  };
  confirmationToken: string;
}
