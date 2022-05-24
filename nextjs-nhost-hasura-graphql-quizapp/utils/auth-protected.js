import { useRouter } from "next/router";
import { useAuthenticationStatus } from "@nhost/react";
import { Center } from "@chakra-ui/react";

export function authProtected(Comp) {
  return function AuthProtected(props) {
    const router = useRouter();
    const { isLoading, isAuthenticated } = useAuthenticationStatus();

    if (isLoading) {
      return <Center>Loading...</Center>;
    }

    if (!isAuthenticated) {
      router.push("/login");
      return <Center>Redirecting...</Center>;
    }

    return <Comp {...props} />;
  };
}
