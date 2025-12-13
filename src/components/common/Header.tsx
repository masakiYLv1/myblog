import { Box, Button, Flex, Heading, HStack, Link } from "@chakra-ui/react";

export const Header = () => {
  return (
    <Box px="10" py="5" mx="auto" mb="5" borderBottom="sm" borderColor="#fff">
      <Flex align="center" justifyContent="space-between">
        <Link>
          <Heading as="h1">myBlog</Heading>
        </Link>
        <HStack>
          <Button size="xs" bg="blue.500">
            ログイン
          </Button>
          <Button size="xs" bg="blue.500">
            投稿
          </Button>
        </HStack>
      </Flex>
    </Box>
  );
};
