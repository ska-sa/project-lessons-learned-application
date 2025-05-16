// src/store/store.ts
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import lessonsReducer from "../features/lessons/lessonsSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    lessons: lessonsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
