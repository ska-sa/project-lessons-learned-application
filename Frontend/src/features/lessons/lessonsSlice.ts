// src/features/lessons/lessonsSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../store/store";

export interface Lesson {
  id: number;
  title: string;
  description: string;
  project: string;
  category: string;
  date: string;
  impact: "positive" | "negative" | "neutral";
  status: "approved" | "pending" | "rejected";
  tags: string[];
}

interface LessonsState {
  lessons: Lesson[];
  filteredLessons: Lesson[];
  loading: boolean;
  error: string | null;
}

const initialState: LessonsState = {
  lessons: [],
  filteredLessons: [],
  loading: false,
  error: null,
};

const lessonsSlice = createSlice({
  name: "lessons",
  initialState,
  reducers: {
    setLessons: (state, action: PayloadAction<Lesson[]>) => {
      state.lessons = action.payload;
      state.filteredLessons = action.payload;
    },
    setFilteredLessons: (state, action: PayloadAction<Lesson[]>) => {
      state.filteredLessons = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
  },
});

export const { setLessons, setFilteredLessons, setLoading, setError } =
  lessonsSlice.actions;

export const selectAllLessons = (state: RootState) => state.lessons.filteredLessons;

export default lessonsSlice.reducer;
