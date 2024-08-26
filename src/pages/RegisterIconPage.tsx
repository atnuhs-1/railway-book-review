import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Compressor from "compressorjs";
import { useAuth } from "../hooks/useAuth";

type IconUploadForm = {
  icon: FileList;
};

const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png"];

export default function IconRegistrationPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IconUploadForm>();
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const { registerIcon } = useAuth();
  const navigate = useNavigate();

  const validateImageType = (fileList: FileList) => {
    if (fileList.length === 0) return "ファイルを選択してください";
    const file = fileList[0];
    if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
      return "JPG、JPEG、またはPNG形式の画像のみ許可されています";
    }
    return true;
  };

  const compressImage = (file: File): Promise<File> => {
    return new Promise((resolve, reject) => {
      new Compressor(file, {
        quality: 1, // 圧縮品質 (0 to 1)
        maxWidth: 600, // 最大幅
        maxHeight: 600, // 最大高さ
        success(result) {
          resolve(result as File);
        },
        error(err) {
          console.error("Image compression error:", err);
          reject(err);
        },
      });
    });
  };

  const onSubmit = async (data: IconUploadForm) => {
    setIsLoading(true);
    setApiError(null);

    try {
      const compressedFile = await compressImage(data.icon[0]);

      await registerIcon(compressedFile);

      navigate("/");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setApiError(
          error.response?.data?.message ||
            "アイコンのアップロードに失敗しました。",
        );
      } else {
        setApiError("予期せぬエラーが発生しました。");
      }
      console.error("Icon upload error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">アイコン登録</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label
            htmlFor="icon"
            className="block text-sm font-medium text-gray-700"
          >
            アイコン画像:
          </label>
          <input
            id="icon"
            type="file"
            accept=".jpg,.jpeg,.png"
            {...register("icon", {
              required: "アイコン画像は必須です",
              validate: validateImageType,
            })}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
          {errors.icon && (
            <span className="text-red-500 text-xs mt-1">
              {errors.icon.message}
            </span>
          )}
        </div>
        {apiError && <div className="text-red-500 text-sm">{apiError}</div>}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? "アップロード中..." : "アイコンを登録"}
        </button>
      </form>
    </div>
  );
}
