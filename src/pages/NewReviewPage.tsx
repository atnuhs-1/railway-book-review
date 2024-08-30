import { useAuth } from "@/hooks/useAuth";
import axios from "axios";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

type PostReviewInputs = {
  title: string;
  url: string;
  detail: string;
  review: string;
};

export default function NewReviewPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { token } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PostReviewInputs>();

  const onSubmit: SubmitHandler<PostReviewInputs> = async (data) => {
    setIsLoading(true);
    setSubmitError(null);

    try {
      const response = await axios.post(
        "https://railway.bookreview.techtrain.dev/books",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      navigate("/");
      console.log(response);
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
  };
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
          {isLoading ? "送信中..." : "レビューを投稿"}
        </button>
      </form>
    </div>
  );
}
