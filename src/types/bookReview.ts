export type BookReview = {
  id: string;
  title: string;
  url: string;
  detail: string;
  review: string;
  reviewer: string;
  isMine?: boolean;
};

export type BookReviewsState = {
  reviews: BookReview[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  currentOffset: number;
  hasMore: boolean;
};

export type BookReviewDetail = {
  review: BookReview | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
};
