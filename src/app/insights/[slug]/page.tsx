// src/app/insights/[slug]/page.tsx

import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { MarkdownRenderer } from './components/MarkdownRenderer';
import { ArticleCard } from '@/components/ArticleCard'; // 引入文章卡片组件

// --- 1. 扩展 Article 类型定义 ---
interface Article {
  id: number;
  title: string;
  slug: string;
  summary: string;
  content: string;
  author?: string;
  publishedAt: string;
  updatedAt?: string; // 新增字段，用于 Schema 和页面显示
  category?: string;
  tags?: string;
}

// --- 2. 页面 props 类型定义 ---
type ArticlePageProps = {
  params: Promise<{ slug: string }>;
};

// --- 3. 数据获取函数 ---

/**
 * 获取单篇文章数据
 * @param slug - 文章的 slug
 * @returns 文章数据或 null
 */
async function getSingleArticle(slug: string): Promise<Article | null> {
  // 添加 updatedAt 字段的请求
  const STRAPI_URL = `https://api.ai-knowledgepoints.cn/api/articles?filters[slug][$eq]=${slug}&fields[0]=title&fields[1]=slug&fields[2]=summary&fields[3]=content&fields[4]=author&fields[5]=publishedAt&fields[6]=updatedAt&fields[7]=category&fields[8]=tags`;

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
        publishedAt: articleData.publishedAt,
        updatedAt: articleData.updatedAt || articleData.publishedAt, // 如果没有更新日期，则使用发布日期
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

/**
 * 获取相关文章
 * @param category - 当前文章的分类
 * @param currentArticleSlug - 当前文章的 slug，用于排除
 * @returns 相关文章列表
 */
async function getRelatedArticles(category?: string, currentArticleSlug?: string): Promise<Article[]> {
  if (!category || !currentArticleSlug) {
    return [];
  }

  const params = new URLSearchParams({
    'filters[category][$eq]': category,
    'filters[slug][$ne]': currentArticleSlug,
    'sort[0]': 'publishedAt:desc',
    'pagination[limit]': '3',
  });

  const STRAPI_URL = `https://api.ai-knowledgepoints.cn/api/articles?${params.toString()}`;
  
  try {
    const response = await fetch(STRAPI_URL, { next: { revalidate: 3600 } }); // 1小时重新验证
    if (!response.ok) return [];
    const data = await response.json();
    return data.data || [];
  } catch (error) {
    console.error("Error fetching related articles:", error);
    return [];
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
    authors: article.author ? [{ name: article.author }] : [{ name: 'GEO Nexus Team' }],
    keywords: article.tags ? article.tags.split(',').map(tag => tag.trim()) : undefined,
  };
}

// --- 5. 辅助组件 ---

/**
 * 作者信息组件 - 强化 E-E-A-T
 */
const AuthorBio = ({ authorName }: { authorName?: string }) => {
  if (!authorName) return null;

  return (
    <div className="mt-12 p-6 bg-secondary border border-border-secondary rounded-2xl">
      <h3 className="text-xl font-bold text-accent mb-4">关于作者</h3>
      <div className="flex items-center gap-4">
        {/* 可替换为作者头像 */}
        <div className="w-16 h-16 bg-tertiary rounded-full flex-shrink-0"></div>
        <div>
          <p className="font-semibold text-text-main">{authorName}</p>
          <p className="text-sm text-text-light mt-1">
            GEO Nexus 资深内容贡献者，专注于AI技术与搜索引擎优化的交叉领域研究。
            {/* 这里可以从Strapi获取更详细的作者简介 */}
          </p>
        </div>
      </div>
    </div>
  );
};

/**
 * 相关阅读组件
 */
const RelatedReading = async ({ category, currentArticleSlug }: { category?: string, currentArticleSlug?: string }) => {
  const relatedArticles = await getRelatedArticles(category, currentArticleSlug);

  if (relatedArticles.length === 0) {
    return null;
  }

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


// --- 6. 页面主组件 ---
export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = await getSingleArticle(slug);
  
  if (!article) {
    notFound();
  }

  // 处理标签
  const tagList = article.tags ? article.tags.split(',').map(tag => tag.trim()).filter(tag => tag) : [];

  // 生成 JSON-LD Schema
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://www.ai-knowledgepoints.cn/insights/${article.slug}`
    },
    "headline": article.title,
    "description": article.summary,
    "author": {
      "@type": "Person",
      "name": article.author || "GEO Nexus Team"
    },
    "publisher": {
      "@type": "Organization",
      "name": "GEO Nexus",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.ai-knowledgepoints.cn/logo.svg"
      }
    },
    "datePublished": article.publishedAt,
    "dateModified": article.updatedAt || article.publishedAt
  };

  return (
    <main className="bg-primary text-text-main min-h-screen py-12 md:py-20">
      {/* 注入 JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="mb-8 md:mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-text-main tracking-tight mb-4">
            {article.title}
          </h1>
          
          {/* 优化的文章元信息 */}
          <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-2 text-text-secondary">
            {article.author && (
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" /></svg>
                {article.author}
              </span>
            )}
            
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" /></svg>
              发布于 {new Date(article.publishedAt).toLocaleDateString('zh-CN')}
            </span>
            
            {article.updatedAt && (
              <span className="flex items-center gap-2 text-success">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                于 {new Date(article.updatedAt).toLocaleDateString('zh-CN')} 验证
              </span>
            )}

            {article.category && (
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" /></svg>
                <span className="bg-accent/10 text-accent px-2 py-1 rounded-full text-xs font-medium">
                  {article.category}
                </span>
              </span>
            )}
          </div>

          {tagList.length > 0 && (
            <div className="flex flex-wrap justify-center gap-2 mt-4">
              {tagList.map((tag, index) => (
                <span key={index} className="bg-secondary text-text-secondary px-3 py-1 rounded-full text-xs border border-border-secondary">
                  #{tag}
                </span>
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
      </article>
    </main>
  );
}