import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import api from "../../utils/api";
import { BookReview, BookReviewsState } from "../../types/bookReview";

const initialState: BookReviewsState = {
  reviews: [],
  status: "idle",
  error: null,
  currentOffset: 0,
  hasMore: true,
};

export const fetchBookReviews = createAsyncThunk(
  "bookReviews/fetchBookReviews",
  async (
    { offset, token }: { offset: number; token?: string | null },
    { rejectWithValue },
  ) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 0));
      const endpoint = token ? "/books" : "/public/books";
      const response = await api.get(`${endpoint}?offset=${offset}`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      return { data: response.data, offset };
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

const bookReviewsSlice = createSlice({
  name: "bookReviews",
  initialState,
  reducers: {
    // editしたときに再フェッチせずに変更されたreviewだけを更新するアクション（いまはHomeがマウントされるたびにデータをフェッチするようにしているから意味ない）
    updateReviewInList: (state, action: PayloadAction<BookReview>) => {
      const index = state.reviews.findIndex(
        (review) => review.id === action.payload.id,
      );
      if (index !== -1) {
        state.reviews[index] = action.payload;
      }
    },
    setStatus: (state, action) => {
      state.status = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBookReviews.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchBookReviews.fulfilled,
        (
          state,
          action: PayloadAction<{ data: BookReview[]; offset: number }>,
        ) => {
          state.status = "succeeded";
          state.reviews = action.payload.data;
          state.currentOffset = action.payload.offset;
          state.hasMore = action.payload.data.length === 10;
        },
      )
      .addCase(fetchBookReviews.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || null;
      });
  },
});

export const { updateReviewInList, setStatus } = bookReviewsSlice.actions;
export default bookReviewsSlice.reducer;
