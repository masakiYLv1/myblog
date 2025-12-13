import { List } from "@chakra-ui/react";
import { ArticleCard } from "./ArticleCard";

export const ArticleList = () => {
  return (
    <List.Root unstyled>
      <List.Item mb="5">
        <ArticleCard />
      </List.Item>
    </List.Root>
  );
};
