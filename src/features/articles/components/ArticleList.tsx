import { List } from "@chakra-ui/react";
import { ArticleCard } from "./ArticleCard";
import type { Article } from "../api/types";

type ArticleListProps = {
  articles: Article[];
};

export const ArticleList = ({ articles }: ArticleListProps) => {
  return (
    <List.Root unstyled>
      {articles.map((article) => (
        <List.Item key={article.id} mb="5">
          <ArticleCard article={article} />
        </List.Item>
      ))}
    </List.Root>
  );
};
