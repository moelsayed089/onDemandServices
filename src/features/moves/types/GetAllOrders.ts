export interface Order {
  _id: string;
  customer: string;
  status:
    | "no_drivers_available"
    | "pending"
    | "in_progress"
    | "delivered"
    | string;
  pickup: {
    address: string;
    coordinates: {
      type: "Point";
      coordinates: [number, number];
    };
  };
  delivery: {
    address: string;
    coordinates: {
      type: "Point";
      coordinates: [number, number];
    };
  };
  items: {
    name: string;
    quantity: number;
  }[];
  vehicleType: "bike" | "car" | "truck" | string;
  scheduledFor: string | null;
  insurance: {
    isSelected: boolean;
    type: "basic" | "premium" | string;
  };
  pricing: {
    basePrice: number;
    distancePrice: number;
    totalPrice: number;
  };
  payment: {
    status: "pending" | "completed" | "failed" | string;
  };
  createdAt: string;
  updatedAt: string;
  __v: number;
}
export interface GetAllOrdersResponse {
  status: "success" | string;
  totalPages: number;
  page: number;
  results: number;
  data: Order[];
}
