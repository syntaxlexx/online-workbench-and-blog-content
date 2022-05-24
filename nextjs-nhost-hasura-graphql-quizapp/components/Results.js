import { Box, Heading } from "@chakra-ui/react";
import React from "react";

export default function Results({ score, numOfQuestions }) {
  return (
    <Box>
      <Heading mb={8} as="h1" textAlign="center">
        Results
      </Heading>
      <Heading as="h3" size="md" textAlign="center">
        The results are in. You scored {score} out of {numOfQuestions}
      </Heading>
    </Box>
  );
}
