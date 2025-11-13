import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface DriverMove {
  move: {
    _id: string;
    customer: string;
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
  };
  pickupLocation: {
    address: string;
    coordinates: {
      type: string;
      coordinates: [number, number];
    };
  };
  deliveryLocation: {
    address: string;
    coordinates: {
      type: string;
      coordinates: [number, number];
    };
  };
  vehicleType: string;
  price: number;
}
interface DriverMoveState {
  currentMove: DriverMove | null;
}

const initialState: DriverMoveState = {
  currentMove: null,
};

const driverMoveSlice = createSlice({
  name: "driverMove",
  initialState,
  reducers: {
    setNewMove(state, action: PayloadAction<DriverMove>) {
      state.currentMove = action.payload;
    },
    clearMove(state) {
      state.currentMove = null;
    },
  },
});

export const { setNewMove, clearMove } = driverMoveSlice.actions;
export default driverMoveSlice.reducer;
