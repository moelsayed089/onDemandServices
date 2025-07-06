export interface UpdatePasswordProfileResponse {
  message: string;
  data: {
    name: string;
    email: string;
    phone: string;
    role: string;
    createdAt: string;
    updatedAt: string;
  };
}
