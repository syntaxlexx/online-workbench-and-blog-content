"use client";

import { signIn } from "next-auth/react";
import { FC, useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/button";

interface Props {}

const LoginButton: FC<Props> = ({}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const loginWithGoogle = async () => {
    setIsLoading(true);

    try {
      await signIn("google");
      router.replace("/");
    } catch (error) {
      console.log("error", error);
      // toast notification
      alert("There was a problem.");
    } finally {
      setIsLoading(false);
    }
  };

  return <Button onClick={loginWithGoogle}>Login with Google</Button>;
};

export default LoginButton;
