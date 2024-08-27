import { configureStore } from "@reduxjs/toolkit";
import bookReviewsReducer from "../features/bookReviews/bookReviewsSlice";

export const store = configureStore({
  reducer: {
    bookReviews: bookReviewsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
