"use client";

import useArticleMutation from "@/mutations/use-article-mutation";
import { useRouter } from "next/navigation";
import { ArticleForm, ArticleFormValues } from "../components/article-form";

export default function NewLatestPublicationPage() {
  const router = useRouter();
  const { createArticleMutation } = useArticleMutation();

  const handleCreateArticle = async (
    data: ArticleFormValues,
    isPublished: boolean
  ) => {
    createArticleMutation.mutate(
      {
        ...data,
        isPublished,
        sectionCategory: "latest_publication",
        viewCount: 0,
        shareCount: 0,
        bookmarkCount: 0,
        readTimeAvg: 0,
        engagementScore: 0
      },
      {
        onSuccess: () => {
          router.push("/dashboard/admin-panel/article/latest-publication");
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
      pageTitle="New Latest Publication"
      pageDescription="Create a new latest publication"
    />
  );
}
