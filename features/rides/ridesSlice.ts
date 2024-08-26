import { Ride } from "@/types/Ride";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import initialRides from "../../mocks/data/Rides";

interface RidesState {
  rides: Ride[];
}

const initialState: RidesState = {
  rides: initialRides,
};

const ridesSlice = createSlice({
  name: "rides",
  initialState,
  reducers: {
    updateRideStatus: (
      state,
      action: PayloadAction<{ id: string; status: Ride["status"] }>
    ) => {
      const ride = state.rides.find((r) => r.id === action.payload.id);
      if (ride) {
        ride.status = action.payload.status;
      }
    },
    updateRideTimeArrived: (
      state,
      action: PayloadAction<{ id: string; timeArrived: string }>
    ) => {
      const ride = state.rides.find((r) => r.id === action.payload.id);
      if (ride) {
        ride.timeArrived = action.payload.timeArrived;
      }
    },
  },
});

export const { updateRideStatus, updateRideTimeArrived } = ridesSlice.actions;

export default ridesSlice.reducer;
