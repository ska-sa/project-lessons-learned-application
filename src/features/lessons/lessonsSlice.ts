import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store/store";
import api from "../../api/api";

interface Lesson {
  id: string;
  title: string;
  description: string;
  project: string;
  category: string;
  impact: string;
  createdAt: string;
  isConfidential?: boolean;
}

interface LessonsState {
  lessons: Lesson[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: LessonsState = {
  lessons: [],
  status: "idle",
  error: null,
};

// Async thunks
export const fetchLessons = createAsyncThunk(
  "lessons/fetchLessons",
  async () => {
    const response = await api.get("/lessons");
    return response.data;
  },
);

export const addLesson = createAsyncThunk(
  "lessons/addLesson",
  async (lesson: Omit<Lesson, "id" | "createdAt">) => {
    const response = await api.post("/lessons", lesson);
    return response.data;
  },
);

export const updateLesson = createAsyncThunk(
  "lessons/updateLesson",
  async (lesson: Lesson) => {
    const response = await api.put(`/lessons/${lesson.id}`, lesson);
    return response.data;
  },
);

export const deleteLesson = createAsyncThunk(
  "lessons/deleteLesson",
  async (id: string) => {
    await api.delete(`/lessons/${id}`);
    return id;
  },
);

const lessonsSlice = createSlice({
  name: "lessons",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch lessons
      .addCase(fetchLessons.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchLessons.fulfilled,
        (state, action: PayloadAction<Lesson[]>) => {
          state.status = "succeeded";
          state.lessons = action.payload;
        },
      )
      .addCase(fetchLessons.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch lessons";
      })

      // Add lesson
      .addCase(addLesson.fulfilled, (state, action: PayloadAction<Lesson>) => {
        state.lessons.push(action.payload);
      })

      // Update lesson
      .addCase(
        updateLesson.fulfilled,
        (state, action: PayloadAction<Lesson>) => {
          const index = state.lessons.findIndex(
            (lesson) => lesson.id === action.payload.id,
          );
          if (index !== -1) {
            state.lessons[index] = action.payload;
          }
        },
      )

      // Delete lesson
      .addCase(
        deleteLesson.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.lessons = state.lessons.filter(
            (lesson) => lesson.id !== action.payload,
          );
        },
      );
  },
});

// Selectors
export const selectAllLessons = (state: RootState) => state.lessons.lessons;
export const selectLessonsStatus = (state: RootState) => state.lessons.status;
export const selectLessonsError = (state: RootState) => state.lessons.error;

export default lessonsSlice.reducer;
