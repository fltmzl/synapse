import ArticleContent from "./sections/article-content";

export default async function ArticlePage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  // const article = newsData.find((a) => a.slug === slug);

  // if (!article) return notFound();

  return <ArticleContent slug={slug} />;
}
