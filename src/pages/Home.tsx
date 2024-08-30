import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../app/store";
import {
  fetchBookReviews,
  setCurrentOffset,
} from "../features/bookReviews/bookReviewsSlice";
import BookReviewCard from "../components/BookReviewCard";
import Pagination from "../components/Pagination";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorMessage from "../components/ErrorMessage";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const BookReviewListPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { reviews, status, error, currentOffset, hasMore } = useSelector(
    (state: RootState) => state.bookReviews,
  );

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchBookReviews(currentOffset));
    }
  }, [status, dispatch, currentOffset]);

  const handleNext = () => {
    const newOffset = currentOffset + 10;
    dispatch(setCurrentOffset(newOffset));
    dispatch(fetchBookReviews(newOffset));
  };

  const handlePrevious = () => {
    if (currentOffset >= 10) {
      const newOffset = currentOffset - 10;
      dispatch(setCurrentOffset(newOffset));
      dispatch(fetchBookReviews(newOffset));
    }
  };

  if (status === "loading")
    return <LoadingSpinner style="px-10 py-9 text-2xl font-bold" />;
  if (status === "failed")
    return <ErrorMessage message={error || "エラーが発生しました"} />;

  return (
    <div className="px-10 py-10 bg-white">
      <div className="flex justify-between pb-4">
        <h1 className="text-2xl font-bold">書籍レビュー一覧</h1>
        <div className="flex space-x-24">
          <Pagination
            onPrevious={handlePrevious}
            onNext={handleNext}
            hasPrevious={currentOffset > 0}
            hasNext={hasMore}
          />
          <Button asChild>
            <Link to={`/new`} className="">
              レビュー投稿
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pb-4">
        {reviews.map((review) => (
          <BookReviewCard key={review.id} review={review} />
        ))}
      </div>
    </div>
  );
};

export default BookReviewListPage;
