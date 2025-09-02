/*
 * @filename: alg-bug-engineer/geo-nexus/geo-nexus-c0022f76688310702ab7bc516010d393a92d80dc/src/components/LatestInsights.tsx
 */
// src/components/LatestInsights.tsx
import Link from 'next/link';
import { ArticleCard } from './ArticleCard';

// REVERTED: Using the original flat type definition that matches your API
interface StrapiArticle {
  id: number;
  title: string;
  slug: string;
  summary: string;
}

// REVERTED: Reverted data fetching to handle a flat API response
async function getLatestArticles(limit: number = 3): Promise<StrapiArticle[]> {
  const STRAPI_URL = `https://api.ai-knowledgepoints.cn/api/articles?sort=publishedAt:desc&pagination[limit]=${limit}`;
  
  try {
    // Using revalidation for better performance in Next.js
    const response = await fetch(STRAPI_URL, { next: { revalidate: 3600 } }); // Revalidate every hour
    if (!response.ok) return [];
    const data = await response.json();
    // The API returns the articles directly in data.data
    return data.data; 
  } catch (error) {
    console.error("Error fetching latest articles:", error);
    return [];
  }
}

export const LatestInsights = async () => {
  const articles = await getLatestArticles(3);

  if (!articles || articles.length === 0) {
    return null;
  }

  return (
    // Kept the new themed background
    <section className="py-20 bg-primary">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-4xl font-bold text-text-main">
            最新资讯
          </h2>
          {/* Using the new accent-blue for the link */}
          <Link href="/insights" className="text-accent-blue font-semibold hover:underline text-lg">
            查看全部 →
          </Link>
        </div>
        <div className="grid grid-cols-1 md-grid-cols-2 lg-grid-cols-3 gap-8">
          {articles.map((article) => (
            // The ArticleCard component remains the same and will now receive the correct data
            <ArticleCard
              key={article.id}
              title={article.title}
              summary={article.summary}
              slug={article.slug}
            />
          ))}
        </div>
      </div>
    </section>
  );
};