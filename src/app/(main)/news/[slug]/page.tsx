import { notFound } from "next/navigation";
import ExploreArticle from "./sections/eplore-article";
import { newsData } from "@/data/news-data";
import ArticleContent from "./sections/article-card";

export default async function ArticlePage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = newsData.find((a) => a.slug === slug);

  if (!article) return notFound();

  return (
    <section className="w-full min-h-screen p-4 flex flex-col gap-4">
      <ArticleContent />
      <ExploreArticle />
    </section>
  );
}
