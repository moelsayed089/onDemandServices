export type User = {
  _id: string;
  name: string;
  email: string;
  phone: string;
  provider: string;
  role: string;
  account_status: string;
  active: boolean;
  refreshTokens: {
    token: string;
    expiresAt: string;
    _id: string;
    createdAt: string;
  }[];
  createdAt: string;
  updatedAt: string;
  passwordChangedAT: string;
  image?: {
    secure_url: string;
    public_id: string;
  };
};

export type UserInfo = {
  message: string;
  data: User;
};
