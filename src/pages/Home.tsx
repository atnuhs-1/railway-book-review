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

  if (status === "loading") return <LoadingSpinner />;
  if (status === "failed")
    return <ErrorMessage message={error || "エラーが発生しました"} />;

  return (
    <div className="px-10 py-5 bg-white">
      <div className="flex justify-between py-4">
        <h1 className="text-xl">書籍レビュー一覧</h1>
        <Pagination
          onPrevious={handlePrevious}
          onNext={handleNext}
          hasPrevious={currentOffset > 0}
          hasNext={hasMore}
        />
      </div>

      <div className="grid grid-cols-2 gap-4 pb-4">
        {reviews.map((review) => (
          <BookReviewCard key={review.id} review={review} />
        ))}
      </div>
      <Pagination
        onPrevious={handlePrevious}
        onNext={handleNext}
        hasPrevious={currentOffset > 0}
        hasNext={hasMore}
      />
    </div>
  );
};

export default BookReviewListPage;
