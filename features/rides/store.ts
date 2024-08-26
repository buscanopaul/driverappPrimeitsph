import { configureStore } from "@reduxjs/toolkit";
import ridesReducer from "./ridesSlice";

export const store = configureStore({
  reducer: {
    rides: ridesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
