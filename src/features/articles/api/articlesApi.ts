import { supabase } from "@/lib/supabaseClient";
import type { Article, ArticleRow } from "./types";

export const articlesApi = async (): Promise<Article[]> => {
  const { data, error } = await supabase
    .from("articles")
    .select(`*, users(*), article_tag(tags(*))`);

  if (error) throw error;

  const rows = (data ?? []) as ArticleRow[];
  return rows.map((row) => ({
    id: row.id,
    title: row.title,
    content: row.content,
    created_at: row.created_at,
    user_name: row.users?.name ?? "不明",
    tags:
      row.article_tag?.map((tag) => ({
        id: tag.tags.id,
        name: tag.tags.name,
      })) ?? [],
  }));
};
