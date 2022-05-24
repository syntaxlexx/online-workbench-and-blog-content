import React, { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

import nhost from "@/utils/nhost";

import {
  Text,
  Stack,
  Input,
  Button,
  Center,
  Heading,
  Box,
} from "@chakra-ui/react";
import { FaGoogle, FaFacebook, FaGithub } from "react-icons/fa";

import Container from "@/components/ContainerComponent";

export default function SignUp() {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();
  const GIHHUB_LOGIN = `${process.env.NEXT_PUBLIC_NHOST_BACKEND}/v1/auth/signin/provider/github`;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await nhost.auth.signUp({
        displayName,
        email,
        password,
      });
    } catch (error) {
      console.log(error);
      return alert("Error signing up");
    }
    router.push("/login");
  };

  return (
    <Container>
      <Heading as="h1" textAlign="center" fontSize="5xl" mb={8}>
        Sign Up
      </Heading>
      <Center>
        <form onSubmit={handleSubmit}>
          <Input
            placeholder="Display Name"
            value={displayName}
            type="text"
            onChange={(e) => setDisplayName(e.target.value)}
            autoFocus
            mt={[2, 4]}
          />
          <Input
            placeholder="Email"
            value={email}
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            mt={[2, 4]}
          />
          <Input
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            mt={[2, 4]}
          />
          <Box mx="auto" width="100%">
            <Button
              type="submit"
              colorScheme="green"
              width="45%"
              mt={[2, 4]}
              ml={4}
            >
              Sign Up
            </Button>

            <Button
              type="submit"
              colorScheme="red"
              width="45%"
              mt={[2, 4]}
              ml={4}
              as="a"
              href="/"
            >
              Cancel
            </Button>
          </Box>
        </form>
      </Center>

      <Center>
        <Stack isInline ml={4} mt={6} spacing={8} alignContent="center">
          <Button
            as="a"
            href=""
            arial-label="Google Login"
            leftIcon={<FaGoogle />}
          >
            Google
          </Button>
          <Button
            as="a"
            href={GIHHUB_LOGIN}
            arial-label="Github Login"
            leftIcon={<FaGithub />}
          >
            Github
          </Button>
          <Button
            as="a"
            href=""
            arial-label="Facebook Login"
            leftIcon={<FaFacebook />}
          >
            Facebook
          </Button>
        </Stack>
      </Center>
      <Text mt={4} textAlign="center">
        Already have an account? <Link href="/login">Sign In Here</Link>
      </Text>
    </Container>
  );
}
