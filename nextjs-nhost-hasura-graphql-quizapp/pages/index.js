import Head from "next/head";
import Image from "next/image";
import Lottie from "react-lottie";

import { Text, Heading, Box } from "@chakra-ui/react";

import Container from "@/components/ContainerComponent";

import * as animationData from "../public/quiz-bump.json";

export default function Home() {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <Container>
      <Head>
        <title>Quiz App</title>
        <meta name="description" content="Welcome to our Quiz App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Heading as="h1" textAlign="center">
        Welcome to Our Quiz
      </Heading>
      <Box mt={8} mx="auto">
        <Text textAlign="center" fontSize="lg">
          Test your knowledge!
        </Text>

        <Lottie options={defaultOptions} height={300} width={300} />
      </Box>
    </Container>
  );
}
