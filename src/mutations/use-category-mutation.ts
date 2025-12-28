"use client";

import { QUERIES } from "@/constants/queries.constant";
import { CategoryService } from "@/services/category.api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export default function useCategoryMutation() {
  const queryClient = useQueryClient();

  const createCategoryMutation = useMutation({
    mutationFn: (name: string) => CategoryService.create({ name }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERIES.CATEGORIES] });
      toast.success("Category created successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to create category");
    }
  });

  const deleteCategoryMutation = useMutation({
    mutationFn: CategoryService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERIES.CATEGORIES] });
      toast.success("Category deleted successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to delete category");
    }
  });

  return {
    createCategoryMutation,
    deleteCategoryMutation
  };
}
