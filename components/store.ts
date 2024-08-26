import { configureStore } from "@reduxjs/toolkit";
import ridesReducer from "../features/rides/ridesSlice";

export const store = configureStore({
  reducer: {
    rides: ridesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
