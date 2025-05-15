// src/store/store.ts
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import lessonsReducer from "../features/lessons/lessonsSlice";
import projectsReducer from "../features/projects/projectsSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    lessons: lessonsReducer,
    projects: projectsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
