"use client";

import useArticleMutation from "@/mutations/use-article-mutation";
import { useRouter } from "next/navigation";
import { ArticleForm, ArticleFormValues } from "../components/article-form";

export default function NewArticlePage() {
  const router = useRouter();
  const { createArticleMutation } = useArticleMutation();

  const handleCreateArticle = async (
    data: ArticleFormValues,
    isPublished: boolean
  ) => {
    createArticleMutation.mutate(
      { ...data, isPublished },
      {
        onSuccess: () => {
          router.push("/dashboard/admin-panel/article");
        }
      }
    );
  };

  const onSubmitAndSaveDraft = (data: ArticleFormValues) => {
    handleCreateArticle(data, false);
  };

  const onSubmitAndPublish = (data: ArticleFormValues) => {
    handleCreateArticle(data, true);
  };

  return (
    <ArticleForm
      onSubmitAndSaveDraft={onSubmitAndSaveDraft}
      onSubmitAndPublish={onSubmitAndPublish}
      isMutationLoading={createArticleMutation.isPending}
      pageTitle="New Article"
      pageDescription="Create a new article"
    />
  );
}
