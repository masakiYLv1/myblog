import { useEffect, useState } from "react";
import { articlesApi } from "../api/articlesApi";
import { type Article } from "../api/types";

export const useArticles = () => {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await articlesApi();
        setArticles(data);
      } catch (error) {
        console.error(error);
      }
    };

    load();
  }, []);
  return articles;
};
