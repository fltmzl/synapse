"use client";

import { QUERIES } from "@/constants/queries.constant";
import { ArticleService } from "@/services/article.api";
import {
  Article,
  CreateArticleDto,
  UpdateArticleDto
} from "@/types/article.type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export default function useArticleMutation() {
  const queryClient = useQueryClient();

  const createArticleMutation = useMutation<
    { id: string } & CreateArticleDto,
    Error,
    CreateArticleDto
  >({
    mutationFn: ArticleService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERIES.ARTICLES] });
      toast.success("Article created successfully");
    },
    onError: (error) => {
      console.log({ error });
      toast.error(`Failed to create article: ${error.message}`);
    }
  });

  const updateArticleMutation = useMutation<
    void,
    Error,
    { id: string; data: UpdateArticleDto }
  >({
    mutationFn: ArticleService.update,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERIES.ARTICLES] });
      toast.success("Article updated successfully");
    },
    onError: (error) => {
      toast.error(`Failed to update article: ${error.message}`);
    }
  });

  const deleteArticleMutation = useMutation<void, Error, string>({
    mutationFn: ArticleService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERIES.ARTICLES] });
      toast.success("Article deleted successfully");
    },
    onError: (error) => {
      toast.error(`Failed to delete article: ${error.message}`);
    }
  });

  return {
    createArticleMutation,
    updateArticleMutation,
    deleteArticleMutation
  };
}
