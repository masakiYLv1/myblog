import { Card, HStack, Tag, Text } from "@chakra-ui/react";

export const ArticleCard = () => {
  return (
    <Card.Root>
      <Card.Header>
        <Card.Title>Test React</Card.Title>
      </Card.Header>

      <Card.Body as="article">
        <HStack>
          <Tag.Root>
            <Tag.Label>React</Tag.Label>
          </Tag.Root>
        </HStack>
      </Card.Body>

      <Card.Footer>
        <Text>Test 太郎</Text>
        <Text>2025/12/13</Text>
      </Card.Footer>
    </Card.Root>
  );
};
