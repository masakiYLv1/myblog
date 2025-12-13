import { Box, Card, Heading, HStack, List, Tag, Text } from "@chakra-ui/react";

export const ArticleList = () => {
  return (
    <Box className="container">
      <Box p="5" mb="5" borderBottom="sm" borderColor="#fff">
        <Heading as="h2">新着記事一覧</Heading>
      </Box>
      <List.Root unstyled>
        <List.Item mb="5">
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
        </List.Item>
        <List.Item>
          <Card.Root>
            <Card.Header>
              <Card.Title>Test TypeScript</Card.Title>
            </Card.Header>
            <Card.Body as="article">
              <HStack>
                <Tag.Root>
                  <Tag.Label>React</Tag.Label>
                </Tag.Root>
                <Tag.Root>
                  <Tag.Label>TypeScript</Tag.Label>
                </Tag.Root>
              </HStack>
            </Card.Body>
            <Card.Footer>
              <Text>Test 太郎</Text>
              <Text>2025/12/13</Text>
            </Card.Footer>
          </Card.Root>
        </List.Item>
      </List.Root>
    </Box>
  );
};
