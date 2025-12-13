import { Box, Heading } from "@chakra-ui/react";
import { ArticleList } from "../components/ArticleList";

export const ArticleListPage = () => {
  return (
    <Box className="container">
      <Heading as="h2" pb="5" mb="5" borderBottom="sm" borderColor="#fff">
        新着記事一覧
      </Heading>
      <ArticleList />
    </Box>
  );
};
