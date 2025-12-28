"use client";

import useArticle from "@/queries/use-article";
import useArticleMutation from "@/mutations/use-article-mutation";
import { useParams, useRouter } from "next/navigation";
import { ArticleForm, ArticleFormValues } from "../../components/article-form";
import { Spinner } from "@/components/spinner";

export default function EditNewsPage() {
  const params = useParams();
  const id = params.id as string;
  const router = useRouter();

  const { data: article, isLoading } = useArticle(id);
  const { updateArticleMutation } = useArticleMutation();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-200px)]">
        <Spinner />
      </div>
    );
  }

  if (!article) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-200px)]">
        <p className="text-muted-foreground text-lg">Article not found</p>
      </div>
    );
  }

  const handleUpdateArticle = async (
    data: ArticleFormValues,
    isPublished: boolean
  ) => {
    updateArticleMutation.mutate(
      { id, data: { ...data, isPublished } },
      {
        onSuccess: () => {
          router.push("/dashboard/admin-panel/article/news");
        }
      }
    );
  };

  const onSubmitAndSaveDraft = (data: ArticleFormValues) => {
    handleUpdateArticle(data, false);
  };

  const onSubmitAndPublish = (data: ArticleFormValues) => {
    handleUpdateArticle(data, true);
  };

  return (
    <ArticleForm
      initialValues={{
        title: article.title,
        slug: article.slug,
        summary: article.summary,
        content: article.content,
        coverImage: article.coverImage,
        tags: article.tags || [],
        category: article.category
      }}
      onSubmitAndSaveDraft={onSubmitAndSaveDraft}
      onSubmitAndPublish={onSubmitAndPublish}
      isMutationLoading={updateArticleMutation.isPending}
      pageTitle="Edit News Post"
      pageDescription="Update your news post"
    />
  );
}
