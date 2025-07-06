export type CoordinatesType = {
  type: "Point";
  coordinates: [number, number];
};

export type AddressData = {
  address: string;
  coordinates: CoordinatesType;
};

export type EstimateRequest = {
  pickup: AddressData;
  delivery: AddressData;
  vehicleType: string;
};

export type EstimateResponse = {
  data: {
    basePrice: number;
    distancePrice: number;
    totalPrice: number;
    distance: number; // بالمتر
    duration: number; // بالثواني
    polyline: string;
  };
};

export type OrderItem = {
  name: string;
  quantity: number;
};

export type CreateOrderRequest = EstimateRequest & {
  items: OrderItem[];
};

export type CreateOrderResponse = {
  orderId: string;
  message: string;
};
