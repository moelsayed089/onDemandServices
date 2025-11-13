export interface IOrder {
  _id: string;
  customer: {
    _id: string;
    name: string;
    email: string;
    phone: string;
    image?: {
      secure_url: string;
      public_id: string;
    };
  };
  status: string;
  pickup: {
    address: string;
    coordinates: {
      type: string;
      coordinates: [number, number];
    };
  };
  delivery: {
    address: string;
    coordinates: {
      type: string;
      coordinates: [number, number];
    };
  };
  items: { name: string; quantity: number }[];
  vehicleType: string;
  scheduledFor: string | null;
  insurance: {
    isSelected: boolean;
    type: string;
  };
  pricing: {
    basePrice: number;
    distancePrice: number;
    totalPrice: number;
  };
  payment: {
    status: string;
  };
  createdAt: string;
  updatedAt: string;
  driver?: string;
  actualTime?: {
    pickup: string;
    delivery: string;
  };
}

export interface IGetAllOrdersResponse {
  data: IOrder[];
  total: number;
  page: number;
  limit: number;
}
