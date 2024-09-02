import React from "react";
import { BookReview } from "../types/bookReview";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";

interface Props {
  review: BookReview;
  showEditButton: boolean | undefined;
}

const BookReviewCard: React.FC<Props> = ({ review, showEditButton }) => {
  return (
    <Link
      to={`/detail/${review.id}`}
      className="rounded-lg shadow-md p-4 space-y-1 bg-card hover:shadow-lg transition-shadow duration-300"
    >
      <div className="p-2 flex flex-col h-48">
        <div className="flex-grow space-y-3">
          <h2 className="truncate text-lg font-bold border-slate-400">
            {review.title}
          </h2>
          <p className="text-gray-600">{review.reviewer}</p>
          <p className="line-clamp-2  text-gray-600">{review.review}</p>
        </div>

        <div className="flex justify-between items-center h-10">
          <Link
            to={review.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sky-800 hover:text-red-400"
            onClick={(e) => e.stopPropagation()}
          >
            書籍リンク
          </Link>
          <div>
            {showEditButton && (
              <Button
                variant="ghost"
                className="text-gray-600 hover:bg-accent"
                asChild
              >
                <Link
                  to={`/edit/${review.id}`}
                  onClick={(e) => e.stopPropagation()}
                >
                  edit
                </Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BookReviewCard;
