// src/app/insights/[slug]/page.tsx (已修复 ESLint 警告)

import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { MarkdownRenderer } from './components/MarkdownRenderer';
import { ArticleCard } from '@/components/ArticleCard';
import { FloatingToc } from './components/FloatingToc';

// --- Type Definitions ---
interface Article {
  id: number;
  title: string;
  slug: string;
  summary: string;
  content: string;
  author?: string;
  publishedAt: string;
  updatedAt?: string;
  category?: string;
  tags?: string;
}

interface RelatedArticleFromAPI {
    id: number;
    title: string;
    slug: string;
    summary: string;
}

type ArticlePageProps = {
  params: Promise<{ slug: string }>;
};

// --- Data Fetching ---
async function getSingleArticle(slug: string): Promise<Article | null> {
    const STRAPI_URL = `https://api.ai-knowledgepoints.cn/api/articles?filters[slug][$eq]=${slug}`;
    try {
        const response = await fetch(STRAPI_URL, { cache: 'no-store' });
        if (!response.ok) return null;
        const data = await response.json();
        if (data.data && data.data.length > 0) {
            const articleData = data.data[0];
            return {
                id: articleData.id,
                title: articleData.title,
                slug: articleData.slug,
                summary: articleData.summary,
                content: articleData.content,
                author: articleData.author,
                publishedAt: articleData.publishedAt || articleData.publish_time,
                updatedAt: articleData.updatedAt || articleData.publishedAt || articleData.publish_time,
                category: articleData.category,
                tags: articleData.tags,
            };
        }
        return null;
    } catch (error) {
        // 【修复】: 使用 error 变量，解决 no-unused-vars 警告
        console.error("Error fetching single article:", error);
        return null;
    }
}

async function getRelatedArticles(category?: string, currentArticleSlug?: string): Promise<Article[]> {
  if (!category || !currentArticleSlug) return [];
  const params = new URLSearchParams({
    'filters[category][$eq]': category,
    'filters[slug][$ne]': currentArticleSlug,
    'sort[0]': 'publishedAt:desc',
    'pagination[limit]': '3',
    'fields[0]': 'title',
    'fields[1]': 'slug',
    'fields[2]': 'summary'
  });
  const STRAPI_URL = `https://api.ai-knowledgepoints.cn/api/articles?${params.toString()}`;
  try {
    const response = await fetch(STRAPI_URL, { next: { revalidate: 3600 } });
    if (!response.ok) return [];
    const data = await response.json();
    return (data.data || []).map((item: RelatedArticleFromAPI) => ({
      id: item.id,
      title: item.title,
      slug: item.slug,
      summary: item.summary,
      content: '', 
      publishedAt: new Date().toISOString(), 
    }));
  } catch (error) {
    // 【修复】: 使用 error 变量，解决 no-unused-vars 警告
    console.error("Error fetching related articles:", error);
    return [];
  }
}

// --- Metadata ---
export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await getSingleArticle(slug);
  if (!article) return { title: '未找到文章' };
  return {
    title: `${article.title} | GEO Nexus`,
    description: article.summary,
    authors: article.author ? [{ name: article.author }] : [{ name: 'GEO Nexus Team' }],
    keywords: article.tags ? article.tags.split(',').map(tag => tag.trim()) : undefined,
  };
}

// --- Helper Components ---
const AuthorBio = ({ authorName }: { authorName?: string }) => {
  const name = authorName || "GEO Nexus Team";
  return (
    <div className="mt-12 p-6 bg-secondary border border-border-secondary rounded-2xl">
      <h3 className="text-xl font-bold text-accent mb-4">关于作者</h3>
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 bg-tertiary rounded-full flex-shrink-0 flex items-center justify-center">
            <svg className="w-8 h-8 text-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
        </div>
        <div>
          <p className="font-semibold text-text-main">{name}</p>
          <p className="text-sm text-text-light mt-1">
            GEO Nexus 资深内容贡献者，专注于AI技术与搜索引擎优化的交叉领域研究。
            <Link href="/about" className="text-accent hover:underline ml-1">了解更多</Link>。
          </p>
        </div>
      </div>
    </div>
  );
};

const RelatedReading = async ({ category, currentArticleSlug }: { category?: string, currentArticleSlug?: string }) => {
  const relatedArticles = await getRelatedArticles(category, currentArticleSlug);
  if (relatedArticles.length === 0) return null;
  return (
    <section className="mt-16 pt-8 border-t border-accent/20">
      <h2 className="text-3xl font-bold text-accent mb-8 text-center">相关阅读</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {relatedArticles.map((article) => (
          <ArticleCard
            key={article.id}
            title={article.title}
            summary={article.summary}
            slug={article.slug}
          />
        ))}
      </div>
    </section>
  );
};

// --- Main Page Component ---
export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = await getSingleArticle(slug);
  
  if (!article) {
    notFound();
  }

  const tagList = article.tags ? article.tags.split(',').map(tag => tag.trim()).filter(tag => tag) : [];

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "mainEntityOfPage": { "@type": "WebPage", "@id": `https://www.ai-knowledgepoints.cn/insights/${article.slug}`},
    "headline": article.title,
    "description": article.summary,
    "author": { "@type": "Person", "name": article.author || "GEO Nexus Team" },
    "publisher": { "@type": "Organization", "name": "GEO Nexus", "logo": { "@type": "ImageObject", "url": "https://www.ai-knowledgepoints.cn/logo.svg" }},
    "datePublished": article.publishedAt,
    "dateModified": article.updatedAt
  };

  return (
    <main className="bg-primary text-text-main min-h-screen py-12 md:py-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      
      <FloatingToc markdownContent={article.content} />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <article>
            <header className="mb-8 md:mb-12 text-center">
              <h1 className="text-4xl md:text-5xl font-extrabold text-text-main tracking-tight mb-4">
                {article.title}
              </h1>
              <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-2 text-text-secondary">
                {article.author && (<span className="flex items-center gap-2"><svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" /></svg>{article.author}</span>)}
                <span className="flex items-center gap-2"><svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" /></svg>发布于 {new Date(article.publishedAt).toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                {article.updatedAt && (<span className="flex items-center gap-2 text-success"><svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>于 {new Date(article.updatedAt).toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' })} 验证</span>)}
                {article.category && (<span className="flex items-center gap-2"><svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2-2H4a2 2 0 01-2-2v-4z" /></svg><span className="bg-accent/10 text-accent px-2 py-1 rounded-full text-xs font-medium">{article.category}</span></span>)}
              </div>
              
              {tagList.length > 0 && (
                <div className="flex flex-wrap justify-center gap-2 mt-4">
                    {tagList.map((tag, index) => (
                        <Link 
                            key={index}
                            href={`/insights?tag=${encodeURIComponent(tag)}`}
                            className="bg-secondary text-text-secondary px-3 py-1 rounded-full text-sm border border-border-secondary hover:bg-tertiary hover:text-text-main hover:border-accent/50 transition-all duration-200"
                        >
                            #{tag}
                        </Link>
                    ))}
                </div>
            )}
            </header>
            
            <div className="bg-secondary p-6 rounded-2xl border border-border-primary mb-8 md:mb-12">
              <h2 className="text-xl font-bold text-accent mb-3">关键摘要</h2>
              <p className="text-text-secondary leading-relaxed">{article.summary}</p>
            </div>
            
            <MarkdownRenderer content={article.content} />
            
            <AuthorBio authorName={article.author} />
        </article>

        <RelatedReading category={article.category} currentArticleSlug={article.slug} />

        <footer className="mt-12 pt-8 border-t border-border-primary text-center">
            <Link 
              href="/insights" 
              className="text-accent hover:text-accent-secondary font-medium inline-flex items-center gap-2 transition-colors group"
            >
              <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              返回资讯列表
            </Link>
        </footer>
      </div>
    </main>
  );
}