import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import api from "../../utils/api";
import { BookReview, BookReviewsState } from "../../types/bookReview";

const initialState: BookReviewsState = {
  reviews: [],
  status: "idle",
  error: null,
  currentOffset: 10,
  hasMore: true,
};

export const fetchBookReviews = createAsyncThunk(
  "bookReviews/fetchBookReviews",
  async (offset: number) => {
    const response = await api.get(`/public/books?offset=${offset}`);
    return response.data;
  },
);

const bookReviewsSlice = createSlice({
  name: "bookReviews",
  initialState,
  reducers: {
    setCurrentOffset: (state, action) => {
      state.currentOffset = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBookReviews.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchBookReviews.fulfilled,
        (state, action: PayloadAction<BookReview[]>) => {
          state.status = "succeeded";
          state.reviews = action.payload;
          state.hasMore = action.payload.length === 10;
        },
      )
      .addCase(fetchBookReviews.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || null;
      });
  },
});

export const { setCurrentOffset } = bookReviewsSlice.actions;
export default bookReviewsSlice.reducer;
