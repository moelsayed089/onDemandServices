export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  data: {
    _id: string;
    name: string;
    email: string;
    phone: string;
    role: string;
    provider: string;
    image: {
      secure_url: string;
      public_id: string;
    };
  };
  accessToken: string;
  accessTokenExpires: string;
}
