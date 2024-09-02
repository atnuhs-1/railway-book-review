import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api";
import { BookReviewDetail } from "../../types/bookReview";

const initialState: BookReviewDetail = {
  review: null,
  status: "idle",
  error: null,
};

export const fetchReviewDetail = createAsyncThunk(
  "reviewDetail/fetchReviewDetail",
  async ({ id, token }: { id: string; token: string }, { rejectWithValue }) => {
    if (!token) {
      return rejectWithValue("認証が必要です");
    }

    try {
      // APIリクエストと遅延をシミュレート
      await new Promise((resolve) => setTimeout(resolve, 0));

      const response = await api.get(`/books/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      await api.post(
        `/logs`,
        { selectBookId: response.data.id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

const bookReviewDetailSlice = createSlice({
  name: "bookReviewDetail",
  initialState: initialState,
  reducers: {
    // EditReviewPageのid変更でreviewを管理しているから必要ない
    // updateReviewDetail: (state, action: PayloadAction<BookReview>) => {
    //   if (state.review && state.review.id === action.payload.id) {
    //     state.review = action.payload;
    //   }
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchReviewDetail.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchReviewDetail.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.review = action.payload;
      })
      .addCase(fetchReviewDetail.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || null;
      });
  },
});

// export const {updateReviewDetail} = bookReviewDetailSlice.actions;
export default bookReviewDetailSlice.reducer;
