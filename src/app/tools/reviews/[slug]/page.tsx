// src/app/tools/reviews/[slug]/page.tsx (优化配色版本)
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import type { Components } from 'react-markdown';

// --- Type Definition ---
interface StrapiTool {
  id: number;
  name: string;
  slug: string;
  summary: string;
  website_url: string;
  overall_score: number;
  review_content: string;
  pros: string;
  cons: string;
}

// --- Data Fetching Function ---
async function getSingleTool(slug: string): Promise<StrapiTool | null> {
  const STRAPI_URL = `https://api.ai-knowledgepoints.cn/api/tools?filters[slug][$eq]=${slug}`;
  try {
    const response = await fetch(STRAPI_URL, { cache: 'no-store' });
    if (!response.ok) return null;
    const data = await response.json();
    if (data.data && data.data.length > 0) {
      return data.data[0];
    }
    return null;
  } catch (error) {
    console.error("Error fetching single tool:", error);
    return null;
  }
}

// --- Custom Markdown Components (深色主题优化) ---
const markdownComponents: Components = {
  h1: ({ children }) => (
    <h1 className="text-3xl font-bold text-text-main mt-8 mb-4 pb-2 border-b border-border-primary">
      {children}
    </h1>
  ),
  h2: ({ children }) => (
    <h2 className="text-2xl font-semibold text-text-main mt-6 mb-3">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="text-xl font-semibold text-text-main mt-5 mb-2">
      {children}
    </h3>
  ),
  h4: ({ children }) => (
    <h4 className="text-lg font-medium text-text-secondary mt-4 mb-2">
      {children}
    </h4>
  ),
  p: ({ children }) => (
    <p className="text-text-secondary leading-relaxed mb-4">
      {children}
    </p>
  ),
  ul: ({ children }) => (
    <ul className="list-disc list-inside mb-4 space-y-2 text-text-secondary ml-4">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="list-decimal list-inside mb-4 space-y-2 text-text-secondary ml-4">
      {children}
    </ol>
  ),
  li: ({ children }) => (
    <li className="leading-relaxed">
      {children}
    </li>
  ),
  blockquote: ({ children }) => (
    <blockquote className="border-l-4 border-accent pl-4 italic text-text-light my-4 bg-accent/5 py-2 rounded-r-lg">
      {children}
    </blockquote>
  ),
  code: ({ className, children, ...props }) => {
    const isInline = !className || !className.includes('language-');
    if (isInline) {
      return (
        <code className="bg-tertiary/50 text-accent px-1.5 py-0.5 rounded text-sm font-mono border border-border-secondary" {...props}>
          {children}
        </code>
      );
    }
    return (
      <code className="block bg-secondary text-text-main p-4 rounded-lg overflow-x-auto text-sm font-mono mb-4 border border-border-primary" {...props}>
        {children}
      </code>
    );
  },
  pre: ({ children, ...props }) => (
    <pre className="bg-secondary text-text-main p-4 rounded-lg overflow-x-auto text-sm font-mono mb-4 border border-border-primary" {...props}>
      {children}
    </pre>
  ),
  a: ({ href, children }) => (
    <a 
      href={href} 
      className="text-accent hover:text-accent-secondary underline transition-colors"
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  ),
  strong: ({ children }) => (
    <strong className="font-semibold text-text-main">
      {children}
    </strong>
  ),
  em: ({ children }) => (
    <em className="italic text-text-light">
      {children}
    </em>
  ),
  hr: () => (
    <hr className="my-8 border-border-primary" />
  ),
  table: ({ children }) => (
    <div className="overflow-x-auto mb-4">
      <table className="min-w-full border border-border-primary bg-secondary/50 backdrop-blur-sm rounded-lg overflow-hidden">
        {children}
      </table>
    </div>
  ),
  thead: ({ children }) => (
    <thead className="bg-tertiary/50">
      {children}
    </thead>
  ),
  tbody: ({ children }) => (
    <tbody className="divide-y divide-border-secondary">
      {children}
    </tbody>
  ),
  tr: ({ children }) => (
    <tr className="hover:bg-tertiary/30 transition-colors">
      {children}
    </tr>
  ),
  th: ({ children }) => (
    <th className="px-4 py-2 text-left font-medium text-text-main border-b border-border-secondary">
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className="px-4 py-2 text-text-secondary border-b border-border-secondary">
      {children}
    </td>
  ),
};

// --- Dynamic SEO Metadata ---
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const tool = await getSingleTool(slug);
  if (!tool) return { title: 'Tool Not Found' };
  return {
    title: `${tool.name} 全面评测 (${new Date().getFullYear()}) | GEO Nexus`,
    description: tool.summary,
  };
}

// --- Score Badge Component ---
function ScoreBadge({ score }: { score: number }) {
  const getScoreColor = (score: number) => {
    if (score >= 4.5) return 'from-success via-success to-success/80';
    if (score >= 4.0) return 'from-accent via-accent to-accent-secondary';
    if (score >= 3.5) return 'from-warning via-warning to-warning/80';
    if (score >= 3.0) return 'from-warning via-warning to-error';
    return 'from-error via-error to-error/80';
  };

  const getScoreText = (score: number) => {
    if (score >= 4.5) return '优秀';
    if (score >= 4.0) return '良好';
    if (score >= 3.5) return '一般';
    if (score >= 3.0) return '较差';
    return '很差';
  };

  return (
    <div className={`bg-gradient-to-br ${getScoreColor(score)} p-6 rounded-xl text-primary text-center shadow-dark-large relative overflow-hidden`}>
      <div className="absolute inset-0 bg-shimmer animate-shimmer opacity-10"></div>
      <div className="relative z-10">
        <div className="text-sm opacity-90 mb-1 font-medium">综合评分</div>
        <div className="text-5xl font-bold mb-1">{score.toFixed(1)}</div>
        <div className="text-sm opacity-90">/ 5.0</div>
        <div className="text-xs mt-2 bg-primary/20 backdrop-blur-sm rounded-full px-3 py-1.5 font-semibold">
          {getScoreText(score)}
        </div>
      </div>
    </div>
  );
}

// --- Page Component ---
export default async function ToolReviewPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const tool = await getSingleTool(slug);
  
  if (!tool) {
    notFound();
  }
  
  const currentYear = new Date().getFullYear();
  
  return (
    <div className="min-h-screen bg-primary">
      <div className="max-w-5xl mx-auto py-8 px-4">
        {/* Header */}
        <header className="mb-8">
          <div className="mb-4">
            <Link 
              href="/tools" 
              className="text-accent hover:text-accent-secondary text-sm font-medium inline-flex items-center gap-2 transition-colors group"
            >
              <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              返回工具导航
            </Link>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-text-main leading-tight mb-2">
            {tool.name} 
            <span className="bg-gradient-to-r from-accent to-accent-secondary bg-clip-text text-transparent"> 全面评测</span>
          </h1>
          <p className="text-xl text-text-secondary mt-3">
            深度分析 · {currentYear} 年最新版本
          </p>
        </header>

        {/* Summary Card */}
        <div className="bg-secondary/80 backdrop-blur-sm rounded-2xl shadow-dark-large border border-border-primary p-8 mb-8">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex-shrink-0">
              <ScoreBadge score={tool.overall_score} />
            </div>
            
            <div className="flex-grow space-y-6">
              <div>
                <h2 className="text-2xl font-semibold text-text-main mb-3 flex items-center gap-2">
                  <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  工具概览
                </h2>
                <p className="text-lg text-text-secondary leading-relaxed">{tool.summary}</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-success/10 backdrop-blur-sm p-6 rounded-xl border border-success/20">
                  <h4 className="text-success font-semibold mb-3 flex items-center gap-2">
                    <div className="w-2 h-2 bg-success rounded-full"></div>
                    主要优点
                  </h4>
                  <div className="text-text-secondary prose-sm">
                    <ReactMarkdown 
                      remarkPlugins={[remarkGfm]} 
                      components={markdownComponents}
                    >
                      {tool.pros}
                    </ReactMarkdown>
                  </div>
                </div>
                
                <div className="bg-error/10 backdrop-blur-sm p-6 rounded-xl border border-error/20">
                  <h4 className="text-error font-semibold mb-3 flex items-center gap-2">
                    <div className="w-2 h-2 bg-error rounded-full"></div>
                    主要缺点
                  </h4>
                  <div className="text-text-secondary prose-sm">
                    <ReactMarkdown 
                      remarkPlugins={[remarkGfm]} 
                      components={markdownComponents}
                    >
                      {tool.cons}
                    </ReactMarkdown>
                  </div>
                </div>
              </div>
              
              <div className="pt-4">
                <Link 
                  href={tool.website_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center bg-gradient-to-r from-accent to-accent-secondary text-primary font-semibold py-4 px-8 rounded-xl hover:shadow-glow transition-all duration-200 transform hover:-translate-y-0.5 w-full md:w-auto group relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-shimmer animate-shimmer opacity-10"></div>
                  <span className="relative z-10">访问官方网站</span>
                  <svg className="w-5 h-5 ml-2 relative z-10 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Review */}
        <div className="bg-secondary/80 backdrop-blur-sm rounded-2xl shadow-dark-large border border-border-primary p-8">
          <h2 className="text-3xl font-bold text-text-main mb-6 pb-3 border-b border-border-primary flex items-center gap-3">
            <svg className="w-8 h-8 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            详细评测
          </h2>
          <article className="prose prose-lg max-w-none">
            <ReactMarkdown 
              remarkPlugins={[remarkGfm]} 
              components={markdownComponents}
            >
              {tool.review_content}
            </ReactMarkdown>
          </article>
        </div>

        {/* Bottom Navigation */}
        <div className="mt-8 text-center">
          <Link 
            href="/tools" 
            className="inline-flex items-center gap-2 text-accent hover:text-accent-secondary font-medium transition-colors group"
          >
            <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            查看更多工具评测
          </Link>
        </div>
      </div>
    </div>
  );
}