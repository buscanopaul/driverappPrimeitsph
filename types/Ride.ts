export interface Ride {
  id: string;
  userId: string;
  driverId: string;
  pickupLocation: {
    latitude: number;
    longitude: number;
  };
  destination: {
    latitude: number;
    longitude: number;
  };
  status:
    | "pending"
    | "accepted"
    | "declined"
    | "started"
    | "picked-up"
    | "dropped-off";
  pickupTime: string;
  timestamp: string;
  timeArrived: string;
  originAddress: string;
  destinationAddress: string;
  farePrice: string;
  userName: string;
  userPhone: string;
}
