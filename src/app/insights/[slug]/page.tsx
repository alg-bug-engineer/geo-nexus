// src/app/insights/[slug]/page.tsx
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { MarkdownRenderer } from './components/MarkdownRenderer';

// --- 1. 更新完整的 Article 类型定义 ---
interface Article {
  id: number;
  title: string;
  slug: string;
  summary: string;
  content: string;
  author?: string;
  publishedAt: string;
  category?: string;
  tags?: string;
}

// --- 2. 【关键修正】修正页面 props 类型以适配 Next.js 15 ---
type ArticlePageProps = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

// --- 3. 数据获取函数 ---
async function getSingleArticle(slug: string): Promise<Article | null> {
  const STRAPI_URL = `https://api.ai-knowledgepoints.cn/api/articles?filters[slug][$eq]=${slug}`;
  
  try {
    const response = await fetch(STRAPI_URL, { cache: 'no-store' });
    if (!response.ok) {
        console.error(`API request failed with status: ${response.status}`);
        return null;
    }
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
        category: articleData.category,
        tags: articleData.tags
      };
    }
    return null;
  } catch (error) {
    console.error("Error fetching single article from Strapi:", error);
    return null;
  }
}

// --- 4. Metadata 函数 ---
export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await getSingleArticle(slug);
  
  if (!article) {
    return { title: '未找到文章' };
  }
  return {
    title: `${article.title} | GEO Nexus`,
    description: article.summary,
    authors: article.author ? [{ name: article.author }] : undefined,
    keywords: article.tags ? article.tags.split(',').map(tag => tag.trim()) : undefined,
  };
}

// --- 5. 页面组件 ---
export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = await getSingleArticle(slug);
  
  if (!article) {
    notFound();
  }

  // 处理标签
  const tagList = article.tags ? article.tags.split(',').map(tag => tag.trim()).filter(tag => tag) : [];

  return (
    <main className="bg-background text-text-main min-h-screen py-12 md:py-20">
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <header className="mb-8 md:mb-12 text-center">
                <h1 className="text-4xl md:text-5xl font-extrabold text-text-main tracking-tight mb-4">
                    {article.title}
                </h1>
                
                {/* 文章元信息 */}
                <div className="flex flex-wrap justify-center items-center gap-4 text-text-secondary">
                    {article.author && (
                        <span className="flex items-center gap-2">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                            </svg>
                            {article.author}
                        </span>
                    )}
                    
                    <span className="flex items-center gap-2">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                        </svg>
                        {new Date(article.publishedAt).toLocaleDateString('zh-CN', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        })}
                    </span>
                    
                    {article.category && (
                        <span className="flex items-center gap-2">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
                            </svg>
                            <span className="bg-accent/10 text-accent px-2 py-1 rounded-full text-sm">
                                {article.category}
                            </span>
                        </span>
                    )}
                </div>

                {/* 标签 */}
                {tagList.length > 0 && (
                    <div className="flex flex-wrap justify-center gap-2 mt-4">
                        {tagList.map((tag, index) => (
                            <span 
                                key={index}
                                className="bg-secondary text-text-secondary px-3 py-1 rounded-full text-sm border border-accent/10"
                            >
                                #{tag}
                            </span>
                        ))}
                    </div>
                )}
            </header>
            
            <div className="bg-secondary p-6 rounded-xl border border-accent/20 mb-8 md:mb-12">
                <h2 className="text-xl font-bold text-accent mb-3">关键摘要</h2>
                <p className="text-text-secondary">{article.summary}</p>
            </div>
            
            <MarkdownRenderer content={article.content} />

            {/* 文章底部信息 */}
            <footer className="mt-12 pt-8 border-t border-accent/20">
                <div className="flex flex-wrap justify-between items-center text-sm text-text-secondary">
                    <div>
                        {article.author && (
                            <p>作者：<span className="text-accent font-medium">{article.author}</span></p>
                        )}
                    </div>
                    <div>
                        <p>发布时间：{new Date(article.publishedAt).toLocaleDateString('zh-CN')}</p>
                    </div>
                </div>
            </footer>
        </article>
    </main>
  );
}
