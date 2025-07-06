export type User = {
  _id: string;
  name: string;
  email: string;
  phone: string;
  provider: string;
  role: string;
  account_status: string;
  active: boolean;
  enabledControls: string[];
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

export type UsersResponse = {
  totalPages: number;
  page: number;
  results: number;
  data: User[];
};
