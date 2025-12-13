export const articlesApi = jest.fn().mockResolvedValue([
  {
    id: "1",
    title: "テスト1",
    content: "テスト本文1",
    created_at: "2025/12/13",
    user_name: "テスト太郎",
    tags: [
      { id: "t1", name: "React" },
      { id: "t2", name: "TypeScript" },
    ],
  },
]);
