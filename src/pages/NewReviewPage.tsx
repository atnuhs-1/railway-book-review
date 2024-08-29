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
  const [submitError, setSubmitError] = useState(null);
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
        }
      );
      navigate("/");
      console.log(response);
    } catch (error) {
      console.error("Post Failed: ", error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
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
              required: "名前は必須です",
              minLength: {
                value: 2,
                message: "名前は2文字以上で入力してください",
              },
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
              required: "名前は必須です",
              minLength: {
                value: 2,
                message: "名前は2文字以上で入力してください",
              },
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
          <input
            id="detail"
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            {...register("detail", {
              required: "名前は必須です",
              minLength: {
                value: 2,
                message: "名前は2文字以上で入力してください",
              },
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
          <input
            id="review"
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            {...register("review", {
              required: "名前は必須です",
              minLength: {
                value: 2,
                message: "名前は2文字以上で入力してください",
              },
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
          {isLoading ? "送信中..." : "ユーザー名を更新"}
        </button>
      </form>
    </div>
  );
}
