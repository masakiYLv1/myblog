import { Card, HStack, Tag, Text } from "@chakra-ui/react";
import type { Article } from "../api/types";

type ArticleCardProps = {
  article: Article;
};

export const ArticleCard = ({ article }: ArticleCardProps) => {
  return (
    <Card.Root>
      <Card.Header>
        <Card.Title>{article.title}</Card.Title>
      </Card.Header>

      <Card.Body as="article">
        <HStack>
          {article.tags.map((tag) => (
            <Tag.Root key={tag.id}>
              <Tag.Label>{tag.name}</Tag.Label>
            </Tag.Root>
          ))}
        </HStack>
      </Card.Body>

      <Card.Footer>
        <Text>{article.user_name}</Text>
        <Text>{article.created_at}</Text>
      </Card.Footer>
    </Card.Root>
  );
};
