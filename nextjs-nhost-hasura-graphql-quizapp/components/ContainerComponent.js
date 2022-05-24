import React from "react";
import Link from "next/link";
import { Button, Flex, Box } from "@chakra-ui/react";
import styled from "@emotion/styled";
import { useAuthenticationStatus, useUserData } from "@nhost/react";
import nhost from "@/utils/nhost";
import { useRouter } from "next/router";

const StickyNav = styled(Flex)`
  position: sticky;
  z-index: 10;
  top: 0;
  backdrop-filter: saturate(180%) blur(20px);
  transition: background-color 0.1s ease-in-out;
`;

export default function Container({ children }) {
  const authenticationStatus = useAuthenticationStatus();
  const userData = useUserData();
  const router = useRouter();

  const handleLogout = async () => {
    if (confirm("Are you sure you want to log out?")) {
      try {
        await nhost.auth.signOut({ all: false });
      } catch (error) {
        console.log(error);
        return alert("Error signing out");
      }
      router.push("/login");
    }
  };

  return (
    <Box height="100%" width="100%">
      <StickyNav
        flexDirection="row"
        maxWidth="1200px"
        width="100%"
        as="nav"
        p={8}
        mt={[0, 8]}
        mb={8}
        mx="auto"
      >
        {!authenticationStatus.isAuthenticated && (
          <Box>
            <Link href="/" passHref>
              <Button as="a" variant="ghost" p={[1, 4]}>
                Home
              </Button>
            </Link>
            <Link href="/login" passHref>
              <Button as="a" variant="ghost" p={[1, 4]}>
                Login
              </Button>
            </Link>
            <Link href="/signup" passHref>
              <Button as="a" variant="ghost" p={[1, 4]}>
                Sign Up
              </Button>
            </Link>
          </Box>
        )}

        {authenticationStatus.isAuthenticated && (
          <Box>
            <Link href="/" passHref>
              <Button as="a" variant="ghost" p={[1, 4]}>
                Home
              </Button>
            </Link>
            <Link href="/create" passHref>
              <Button as="a" variant="ghost" p={[1, 4]}>
                Create Question
              </Button>
            </Link>
            <Link href="/quiz" passHref>
              <Button as="a" variant="ghost" p={[1, 4]}>
                Take a Quiz
              </Button>
            </Link>
            <Button colorScheme="red" p={[1, 4]} onClick={handleLogout}>
              Logout, {userData.displayName}
            </Button>
          </Box>
        )}
      </StickyNav>
      <Flex
        direction="column"
        alignContent="center"
        justifyContent="center"
        width="75%"
        mx="auto"
        height="70vh"
      >
        {children}
      </Flex>
    </Box>
  );
}
