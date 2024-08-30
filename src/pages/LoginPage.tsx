import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useAuth } from "../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

type SignInFormInputs = {
  email: string;
  password: string;
};

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormInputs>();
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<SignInFormInputs> = async (data) => {
    setIsLoading(true);
    setApiError(null);

    try {
      await signIn(data.email, data.password);
      navigate("/");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          // サーバーからのエラーレスポンス
          if (error.response.status === 404) {
            setApiError("そのユーザは存在しません");
            console.log(error.request);
          } else if (error.response.status === 403) {
            setApiError("パスワードが正しくありません");
            console.log(error.request);
          } else {
            setApiError(
              error.response.data.message || "ログインに失敗しました。",
            );
          }
        }
      } else {
        // 非Axiosエラー
        setApiError("予期せぬエラーが発生しました。");
      }
      console.error("Sign in error: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 ">
      <h2 className="text-2xl font-bold mb-4 text-center">ログイン</h2>
      <div className="p-6 bg-white rounded-lg shadow-md">
        <div className="flex justify-end mb-4 ">
          <Link to={`/signup`} className="text-sky-500 border-b border-sky-500">
            サインアップはこちら
          </Link>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6"
          noValidate
        >
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              メールアドレス:
            </label>
            <input
              id="email"
              type="email"
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              {...register("email", {
                required: "メールアドレスは必須です",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "有効なメールアドレスを入力してください",
                },
              })}
            />
            {errors.email && (
              <span className="text-red-500 text-xs mt-1">
                {errors.email.message}
              </span>
            )}
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              パスワード:
            </label>
            <input
              id="password"
              type="password"
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              {...register("password", {
                required: "パスワードは必須です",
              })}
            />
            {errors.password && (
              <span className="text-red-500 text-xs mt-1">
                {errors.password.message}
              </span>
            )}
          </div>
          {apiError && <div className="text-red-500 text-sm">{apiError}</div>}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "送信中..." : "ログイン"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
