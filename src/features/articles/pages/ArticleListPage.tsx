import { Box, Heading } from "@chakra-ui/react";
import { ArticleList } from "../components/ArticleList";
import { useArticles } from "../hooks/useArticles";

export const ArticleListPage = () => {
  const articles = useArticles();

  return (
    <Box className="container">
      <Heading as="h2" pb="5" mb="5" borderBottom="sm" borderColor="#fff">
        新着記事一覧
      </Heading>
      <ArticleList articles={articles} />
    </Box>
  );
};
