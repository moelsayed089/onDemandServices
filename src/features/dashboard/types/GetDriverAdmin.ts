export interface DriverDocuments {
  id: {
    url: string;
    publicId: string;
  };
  carDrivingLicense: {
    url: string;
    publicId: string;
  };
  personalDrivingLicense: {
    url: string;
    publicId: string;
  };
}

export interface DriverReview {
  reviewerName: string;
  comment: string;
  rating: number;
  date: string;
}

export interface DriverRating {
  average: number;
  count: number;
  reviews: DriverReview[];
}

export interface DriverLocation {
  type: "Point";
  coordinates: [number, number];
}

export interface DriverVehicle {
  type: string;
  model: string;
  color: string;
  licensePlate: string;
}

export interface DriverUser {
  _id: string;
  name: string;
  email: string;
  phone: string;
}

export interface DriverData {
  _id: string;
  user: DriverUser;
  vehicle: DriverVehicle;
  currentLocation: DriverLocation;
  rating: DriverRating;
  documents: DriverDocuments;
  isAvailable: boolean;
  status: "pending" | "approved" | "rejected";
  history: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface DriversResponse {
  totalPages: number;
  page: number;
  results: number;
  data: DriverData[];
}
