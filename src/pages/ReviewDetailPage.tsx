import { AppDispatch } from "@/app/store";
import { useAuth } from "@/hooks/useAuth";
import { RootState } from "../app/store";
import { fetchReviewDetail } from "@/features/bookReviewDetail/bookReviewDetailSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";
import LoadingSpinner from "@/components/LoadingSpinner";
import ErrorMessage from "@/components/ErrorMessage";

export default function ReviewDetailPage() {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const { token } = useAuth();
  const { review, status, error } = useSelector(
    (state: RootState) => state.bookReviewDetail,
  );

  useEffect(() => {
    if (id && token) {
      dispatch(fetchReviewDetail({ id, token }));
    }
  }, [dispatch, id, token]);

  if (status === "loading")
    return <LoadingSpinner style="mx-auto mt-6 max-w-xl" />;
  if (status === "failed")
    return <ErrorMessage message={error || "エラーが発生しました"} />;
  if (!review) return null;

  return (
    <div className="mx-auto my-10 max-w-2xl flex flex-col space-y-8 text-lg">
      <div className="border-b pb-4">
        <h2 className="font-bold text-3xl mb-4">{review.title}</h2>
        <div className="flex justify-end">
          <Link
            to={review.url}
            className="py-2 px-4 rounded-xl bg-blue-400 text-white hover:bg-blue-600"
          >
            書籍リンク
          </Link>
        </div>
      </div>
      <div>
        <h2 className="font-bold text-xl mb-2">本の詳細</h2>
        <p className="text-muted-foreground">{review.detail}</p>
      </div>

      <div>
        <h2 className="font-bold text-xl mb-6">感想・レビュー・書評</h2>
        <div className="shadow-lg rounded-lg p-4 bg-slate-100 space-y-4">
          <p>
            <span className="font-bold">{review.reviewer}</span>さんの投稿
          </p>
          <p className="text-muted-foreground">{review.review}</p>
        </div>
      </div>
    </div>
  );
}
