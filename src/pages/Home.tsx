import React, { useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import api from "../utils/api";

interface BookReview {
  id: string;
  title: string;
  url: string;
  detail: string;
  review: string;
  reviewer: string;
}

const BookReviewListPage: React.FC = () => {
  const [bookReviews, setBookReviews] = useState<BookReview[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { token } = useAuth();

  useEffect(() => {
    const fetchBookReviews = async () => {
      setIsLoading(true);
      try {
        const response = await api.get("/public/books?offset=0");
        setBookReviews(response.data);
      } catch (err) {
        setError("書籍レビューの取得に失敗しました。");
        console.error("Error fetching book reviews:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBookReviews();
  }, [token]);

  if (isLoading) return <div>読み込み中...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="px-10 pt-5 bg-white">
      <h1 className="text-xl text-center">書籍レビュー一覧</h1>
      <div className="grid grid-cols-4 gap-4 mt-4">
        {bookReviews.map((review) => (
          <div key={review.id} className=" rounded-lg shadow-md p-4 bg-slate-50">
            <h2 className="truncate font-semibold border-b mb-2">{review.title}</h2>
            <p>レビュアー: {review.reviewer}</p>
            <p className="truncate">詳細: {review.detail}</p>
            <p className="truncate">レビュー: {review.review}</p>
            <a href={review.url} target="_blank" rel="noopener noreferrer" className="text-sky-600 hover:text-red-400">
              書籍リンク
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookReviewListPage;
