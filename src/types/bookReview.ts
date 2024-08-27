export type BookReview = {
  id: string;
  title: string;
  url: string;
  detail: string;
  review: string;
  reviewer: string;
};

export type BookReviewsState = {
  reviews: BookReview[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  currentOffset: number;
  hasMore: boolean;
};
