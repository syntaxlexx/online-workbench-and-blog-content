import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { Box, Flex, Heading, Button } from "@chakra-ui/react";

import { SUBMIT_ANSWER } from "@/utils/api";

export default function Question({ question, onNextClicked }) {
  const [answered, setAnswered] = useState(false);
  const [selectedOption, setSelectedOption] = useState({});
  const [submitAnswer] = useMutation(SUBMIT_ANSWER);

  const onOptionClicked = async (option) => {
    try {
      await submitAnswer({
        variables: {
          answer_id: option.id,
          question_id: question.id,
        },
      });
      setAnswered(true);
      setSelectedOption(option.answer);
    } catch (error) {
      console.log(error);
    }
  };

  const submitQuestion = async () => {
    setAnswered(false);
    setSelectedOption({});
    onNextClicked(selectedOption);
  };

  return (
    <Box>
      <Heading as="h1" textAlign="center">
        How many can you get right?
      </Heading>
      <Box>
        <Heading mt={8} as="h6" fontSize="lg" textAlign="center">
          Question: {question.question}
        </Heading>
      </Box>
      <Flex flexDir="column" justifyContent="center" flexShrink="1" mt={8} wrap>
        {question.question_answers.map((option, index) => (
          <Button
            key={index}
            onClick={() => {
              onOptionClicked(option);
            }}
            width="50%"
            minWidth="150px"
            variant="outline"
            mx="auto"
            mt={4}
          >
            {option.answer}
          </Button>
        ))}
      </Flex>
      {answered && (
        <Box mt={8} align="right">
          <Button width="25%" onClick={submitQuestion}>
            Next
          </Button>
        </Box>
      )}
    </Box>
  );
}
