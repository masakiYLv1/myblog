export type Article = {
  id: string;
  title: string;
  content: string;
  created_at: string;
  user_name: string;
  tags: {
    id: string;
    name: string;
  }[];
};

export type ArticleRow = {
  id: string;
  title: string;
  content: string;
  created_at: string;
  users: {
    name: string;
  } | null;
  article_tag:
    | {
        tags: {
          id: string;
          name: string;
        };
      }[]
    | null;
};
