import React, { useState } from "react";
import Link from "next/link";

import { CREATE_NEW_QUESTION } from "@/utils/api";

import { useMutation } from "@apollo/client";
import { authProtected } from "@/utils/auth-protected";
import Container from "@/components/ContainerComponent";

import {
  Input,
  Button,
  Heading,
  Box,
  Radio,
  Stack,
  Center,
} from "@chakra-ui/react";

function CreateQuestion() {
  const [questionForm, setQuestionForm] = useState({
    question: "",
    answer_1: "",
    answer_2: "",
    answer_3: "",
    answer_4: "",
    correct: "",
  });

  const handleInputChange = (e) => {
    const {
      target: { name, value },
    } = e;

    setQuestionForm({
      ...questionForm,
      [name]: value,
    });
  };

  const [createQuiz] = useMutation(CREATE_NEW_QUESTION);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createQuiz({
        variables: {
          question: questionForm.question,
          question_answers: {
            data: [
              {
                answer: questionForm.answer_1,
                is_correct: questionForm.answer_1 === questionForm.correct,
              },
              {
                answer: questionForm.answer_2,
                is_correct: questionForm.answer_2 === questionForm.correct,
              },
              {
                answer: questionForm.answer_3,
                is_correct: questionForm.answer_3 === questionForm.correct,
              },
              {
                answer: questionForm.answer_4,
                is_correct: questionForm.answer_4 === questionForm.correct,
              },
            ],
          },
        },
      });
    } catch (error) {
      console.log(error);
      return alert("Error creating question");
    }

    setQuestionForm({
      question: "",
      answer_1: "",
      answer_2: "",
      answer_3: "",
      answer_4: "",
      correct: "",
    });
  };

  return (
    <Container>
      <Box p={8} mx="auto" width="75%" boxShadow="dark-lg" rounded="md">
        <Heading as="h1" textAlign="center" mb={8}>
          Create a new quiz Question
        </Heading>
        <form onSubmit={handleSubmit}>
          <Input
            type="text"
            name="question"
            placeholder="Enter your question"
            onChange={handleInputChange}
            value={questionForm.question}
            mt={[2, 4]}
          />

          <Stack isInline mt={[2, 4]}>
            <Input
              type="text"
              name="answer_1"
              placeholder="First answer"
              onChange={handleInputChange}
              value={questionForm.answer_1}
            />
            <Input
              type="text"
              name="answer_2"
              placeholder="Second answer"
              onChange={handleInputChange}
              value={questionForm.answer_2}
            />
            <Input
              type="text"
              name="answer_3"
              placeholder="Third answer"
              onChange={handleInputChange}
              value={questionForm.answer_3}
            />
            <Input
              type="text"
              name="answer_4"
              placeholder="Fourth answer"
              onChange={handleInputChange}
              value={questionForm.answer_4}
            />
          </Stack>
          <Center mt={4}>
            <Stack spacing={[0, 4]} direction="row">
              <Radio
                name="correct"
                onChange={handleInputChange}
                value={questionForm.answer_1}
                isChecked={
                  questionForm.correct !== "" &&
                  questionForm.correct === questionForm.answer_1
                }
              >
                {questionForm.answer_1 ? questionForm.answer_1 : "Answer 1"}
              </Radio>

              <Radio
                name="correct"
                onChange={handleInputChange}
                value={questionForm.answer_2}
                isChecked={
                  questionForm.correct !== "" &&
                  questionForm.correct === questionForm.answer_2
                }
              >
                {questionForm.answer_2 ? questionForm.answer_2 : "Answer 2"}
              </Radio>
              <Radio
                name="correct"
                onChange={handleInputChange}
                value={questionForm.answer_3}
                isChecked={
                  questionForm.correct !== "" &&
                  questionForm.correct === questionForm.answer_3
                }
              >
                {questionForm.answer_3 ? questionForm.answer_3 : "Answer 3"}
              </Radio>
              <Radio
                name="correct"
                onChange={handleInputChange}
                value={questionForm.answer_4}
                isChecked={
                  questionForm.correct !== "" &&
                  questionForm.correct === questionForm.answer_4
                }
              >
                {questionForm.answer_4 ? questionForm.answer_4 : "Answer 4"}
              </Radio>
            </Stack>
          </Center>
          <Stack isInline mt={[2, 4]} mx="auto">
            <Button type="submit" colorScheme="green" width="50%">
              Create Question
            </Button>
            <Link passHref href="/">
              <Button colorScheme="red" width="50%" as="a">
                Cancel
              </Button>
            </Link>
          </Stack>
        </form>
      </Box>
    </Container>
  );
}

export default authProtected(CreateQuestion);
