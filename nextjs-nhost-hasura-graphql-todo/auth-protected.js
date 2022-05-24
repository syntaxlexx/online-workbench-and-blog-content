import { useRouter } from "next/router";
import { useAuthenticationStatus } from "@nhost/react";

export function authProtected(Comp) {
  return function AuthProtected(props) {
    const router = useRouter();
    const { isLoading, isAuthenticated } = useAuthenticationStatus();

    if (isLoading) {
      return <p>Loading...</p>;
    }

    if (!isAuthenticated) {
      router.push("/");
      return null;
    }

    return <Comp {...props} />;
  };
}
