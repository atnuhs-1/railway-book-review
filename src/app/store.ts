import { configureStore } from "@reduxjs/toolkit";
import bookReviewsReducer from "../features/bookReviews/bookReviewsSlice";
import bookReviewDetail from "../features/bookReviewDetail/bookReviewDetailSlice";

export const store = configureStore({
  reducer: {
    bookReviews: bookReviewsReducer,
    bookReviewDetail: bookReviewDetail,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
