import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

type UpdateFormInputs = {
  name: string;
};

export default function ProfilePage() {
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { userInfo, updateUserProfile } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<UpdateFormInputs>({
    defaultValues: {
      name: userInfo?.name || "",
    },
  });

  if (isDirty && apiError) {
    setApiError(null);
  }

  const onSubmit: SubmitHandler<UpdateFormInputs> = async (data) => {
    setIsLoading(true);
    setApiError(null);

    if (data.name === userInfo?.name) {
      setApiError("新しい名前を入力してください");
      setIsLoading(false);
      return;
    }

    try {
      await updateUserProfile(data.name);
      navigate("/");
    } catch (error) {
      console.error("Update error: ", error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            ユーザー名：
          </label>
          <input
            id="name"
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            {...register("name", {
              required: "名前は必須です",
              minLength: {
                value: 2,
                message: "名前は2文字以上で入力してください",
              },
            })}
          />
          {errors.name && (
            <span className="text-red-500 text-xs mt-1">
              {errors.name.message}
            </span>
          )}
        </div>
        {apiError && <div className="text-red-500 text-sm">{apiError}</div>}
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
