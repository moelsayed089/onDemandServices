export interface Customer {
  _id: string;
  name: string;
  email: string;
  phone: string;
  role: "customer" | "admin" | string;
  refreshTokens: string[];
}
export interface OrderDetails {
  _id: string;
  customer: Customer;
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
      coordinates: [number, number]; // [longitude, latitude]
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
export interface OrderDetailsResponse {
  status: "success" | "fail" | "error";
  data: OrderDetails;
}
