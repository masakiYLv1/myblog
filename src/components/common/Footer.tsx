import { Box, Link, Text } from "@chakra-ui/react";

export const Footer = () => {
  return (
    <Box py="5" my="5" textAlign="center" borderTop="sm" borderColor="#fff">
      <Link>
        <Text>@ 2025 myBlog</Text>
      </Link>
    </Box>
  );
};
