import {} from "@/actions/reviewActions";
import { AppDispatch, RootState } from "@/app/store";
import ErrorMessage from "@/components/ErrorMessage";
import LoadingSpinner from "@/components/LoadingSpinner";
import { fetchReviewDetail } from "@/features/bookReviewDetail/bookReviewDetailSlice";
import {} from "@/features/bookReviews/bookReviewsSlice";
import { useAuth } from "@/hooks/useAuth";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

type EditReviewInputs = {
  title: string;
  url: string;
  detail: string;
  review: string;
};

export default function EditReviewPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { token } = useAuth();
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const { review, status, error } = useSelector(
    (state: RootState) => state.bookReviewDetail,
  );
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    reset,
  } = useForm<EditReviewInputs>({
    defaultValues: {
      title: review?.title,
      url: review?.url,
      detail: review?.detail,
      review: review?.review,
    },
  });

  useEffect(() => {
    if (id && token) {
      dispatch(fetchReviewDetail({ id, token }));
    }
  }, [dispatch, id, token]);

  useEffect(() => {
    if (review) {
      reset({
        title: review.title,
        url: review.url,
        detail: review.detail,
        review: review.review,
      });
    }
  }, [review, reset]);

  if (isDirty && submitError) {
    setSubmitError(null);
  }

  const deleteReview = async () => {
    setIsLoading(true);

    try {
      await axios.delete(
        `https://railway.bookreview.techtrain.dev/books/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      navigate("/");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          setSubmitError(error.response.data.message);
        }
      } else {
        // 非Axiosエラー
        setSubmitError("予期せぬエラーが発生しました。");
      }
      console.error("Delete Failed: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit: SubmitHandler<EditReviewInputs> = useCallback(
    async (data) => {
      setIsLoading(true);
      setSubmitError(null);

      if (!isDirty) {
        setSubmitError(
          "変更が検出されませんでした。レビューを更新するには、少なくとも1つの項目を変更してください。",
        );
        setIsLoading(false);
        return;
      }

      try {
        await axios.put(
          `https://railway.bookreview.techtrain.dev/books/${id}`,
          data,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        // dispatch(updateReviewInBothSlices(response.data));
        navigate("/");
      } catch (error) {
        if (axios.isAxiosError(error)) {
          if (error.response) {
            setSubmitError(error.response.data.message);
          }
        } else {
          // 非Axiosエラー
          setSubmitError("予期せぬエラーが発生しました。");
        }
        console.error("Post Failed: ", error);
      } finally {
        setIsLoading(false);
      }
    },
    [id, token, navigate, isDirty],
  );

  if (status === "loading")
    return <LoadingSpinner style="mx-auto mt-6 max-w-xl" />;
  if (status === "failed")
    return <ErrorMessage message={error || "エラーが発生しました"} />;
  if (!review) return null;

  return (
    <div className="max-w-xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">レビュー投稿</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            タイトル：
          </label>
          <input
            id="title"
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            {...register("title", {
              required: "タイトルは必須です",
            })}
          />
          {errors.title && (
            <span className="text-red-500 text-xs mt-1">
              {errors.title.message}
            </span>
          )}
        </div>
        <div>
          <label
            htmlFor="url"
            className="block text-sm font-medium text-gray-700"
          >
            URL：
          </label>
          <input
            id="url"
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            {...register("url", {
              required: "URLは必須です",
            })}
          />
          {errors.url && (
            <span className="text-red-500 text-xs mt-1">
              {errors.url.message}
            </span>
          )}
        </div>
        <div>
          <label
            htmlFor="detail"
            className="block text-sm font-medium text-gray-700"
          >
            詳細：
          </label>
          <textarea
            id="detail"
            rows={4}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            {...register("detail", {
              required: "詳細は必須です",
            })}
          />
          {errors.detail && (
            <span className="text-red-500 text-xs mt-1">
              {errors.detail.message}
            </span>
          )}
        </div>
        <div>
          <label
            htmlFor="review"
            className="block text-sm font-medium text-gray-700"
          >
            レビュー：
          </label>
          <textarea
            id="review"
            rows={4}
            placeholder=""
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            {...register("review", {
              required: "レビューは必須です",
            })}
          />
          {errors.review && (
            <span className="text-red-500 text-xs mt-1">
              {errors.review.message}
            </span>
          )}
        </div>
        {submitError && (
          <div className="text-red-500 text-sm">{submitError}</div>
        )}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? "送信中..." : "レビューを更新"}
        </button>
      </form>
      <button
        onClick={deleteReview}
        className="w-full mt-2 px-4 py-2 bg-red-500 text-white rounded-md"
      >
        削除
      </button>
    </div>
  );
}
