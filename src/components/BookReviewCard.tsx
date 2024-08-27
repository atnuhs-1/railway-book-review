import React from "react";
import { BookReview } from "../types/bookReview";

interface Props {
  review: BookReview;
}

const BookReviewCard: React.FC<Props> = ({ review }) => (
  <div className="border rounded-lg shadow-md p-4 space-y-1 bg-slate-50">
    <h2 className="truncate font-semibold border-b mb-2">{review.title}</h2>
    <p>投稿者: {review.reviewer}</p>
    <p className="truncate">詳細: {review.detail}</p>
    <p className="truncate">レビュー: {review.review}</p>
    <a
      href={review.url}
      target="_blank"
      rel="noopener noreferrer"
      className="text-sky-600 hover:text-red-400"
    >
      書籍リンク
    </a>
  </div>
);

export default BookReviewCard;
