import { Box, Button, Flex, Heading, Text } from "@chakra-ui/react";
import React from "react";
import Link from "next/link";

export default function NoQuestion() {
  return (
    <Box>
      <Heading mb={8} as="h1" textAlign="center">
        Sorry we don't have any questions!
      </Heading>
      <Flex flexDir="column" justifyContent="center" mt={8}>
        <Text textAlign="center">
          Click below to add questions for your friends
        </Text>
      </Flex>
      <Flex mt={8} justifyContent="center">
        <Link href="/create" passHref>
          <Button width="50%" as="a">
            Create
          </Button>
        </Link>
      </Flex>
    </Box>
  );
}
