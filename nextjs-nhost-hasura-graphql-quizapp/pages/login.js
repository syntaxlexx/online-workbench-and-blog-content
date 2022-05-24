import React, { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

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
import nhost from "@/utils/nhost";

import Container from "@/components/ContainerComponent";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();
  const GIHHUB_LOGIN = `${process.env.NEXT_PUBLIC_NHOST_BACKEND}/v1/auth/signin/provider/github`;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await nhost.auth.signIn({
        email,
        password,
      });
      console.log("response", response);
    } catch (error) {
      console.log(error);
      return alert("Error signing in");
    }
    router.push("/");
  };

  return (
    <Container>
      <Heading as="h1" textAlign="center" fontSize="5xl" mb={8}>
        Sign In
      </Heading>
      <Center>
        <form onSubmit={handleSubmit}>
          <Input
            placeholder="Email"
            value={email}
            type="email"
            name="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            mt={[2, 4]}
          />
          <Input
            placeholder="Password"
            type="password"
            name="password"
            id="password"
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
              Sign In
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
        Don't have an account? <Link href="/signup">Sign Up Here</Link>
      </Text>
    </Container>
  );
}
