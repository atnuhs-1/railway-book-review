import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export interface AuthContextType {
  token: string | null;
  setToken: (token: string | null) => void;
  isAuthenticated: boolean;
  signUp: (name: string, email: string, password: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  registerIcon: (icon: File) => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token"),
  );

  // tokenが変更されるのはsetToken以外のいつ？
  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);

  const signUp = async (name: string, email: string, password: string) => {
    try {
      const response = await axios.post(
        "https://railway.bookreview.techtrain.dev/users",
        {
          name,
          email,
          password,
        },
      );
      const newToken = response.data.token;
      setToken(newToken);
    } catch (error) {
      console.error("Sign up failed:", error);
      throw error;
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const response = await axios.post(
        "https://railway.bookreview.techtrain.dev/signin",
        {
          email,
          password,
        },
      );
      const newToken = response.data.token;
      setToken(newToken);
    } catch (error) {
      console.error("Sign in failed:", error);
      throw error;
    }
  };

  const registerIcon = async (icon: File) => {
    if (!token) {
      throw new Error("認証されていません。");
    }

    const formData = new FormData();
    formData.append("icon", icon, icon.name); // icon.nameも一緒に送らないと拡張子が入らなかった

    try {
      await axios.post(
        "https://railway.bookreview.techtrain.dev/uploads",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        },
      );
    } catch (error) {
      console.error("Icon registration failed:", error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        setToken,
        isAuthenticated: !!token,
        signUp,
        signIn,
        registerIcon,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
