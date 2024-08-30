import React from "react";
import { BookReview } from "../types/bookReview";
import { Link } from "react-router-dom";

interface Props {
  review: BookReview;
}

const BookReviewCard: React.FC<Props> = ({ review }) => (
  <Link
    to={`/detail/${review.id}`}
    className="rounded-lg shadow-md p-4 space-y-1 hover:shadow-lg transition-shadow duration-300"
  >
    <div className="p-2 flex flex-col space-y-3">
      <h2 className="truncate text-lg font-bold border-slate-400">
        {review.title}
      </h2>
      <p className="text-gray-600">{review.reviewer}</p>
      <Link to={`/detail/${review.id}`}>
        <p className="line-clamp-3  text-gray-600">{review.review}</p>
      </Link>
      <div className="inline-block">
        <Link
          to={review.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sky-600 hover:text-red-400"
          onClick={(e) => e.stopPropagation()}
        >
          書籍リンク
        </Link>
      </div>
    </div>
  </Link>
);

export default BookReviewCard;
