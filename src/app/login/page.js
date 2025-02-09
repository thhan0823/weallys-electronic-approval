"use client";

import React, { useEffect } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const Login = () => {
  const router = useRouter();

  useEffect(() => {
    signIn("azure-ad", { callbackUrl: "/dashboard", prompt: "consent" }).catch(
      (error) => console.error("Login failed:", error)
    );
  }, []);

  return <div>로그인 중...</div>;
};

export default Login;
