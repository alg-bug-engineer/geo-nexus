/*
 * @filename: alg-bug-engineer/geo-nexus/geo-nexus-c0022f76688310702ab7bc516010d393a92d80dc/src/app/tools/reviews/[slug]/page.tsx
 */
// src/app/tools/reviews/[slug]/page.tsx
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

// --- Custom Markdown Components ---
const markdownComponents: Components = {
  h1: ({ children }) => (
    <h1 className="text-3xl font-bold text-gray-900 mt-8 mb-4 pb-2 border-b border-gray-200">
      {children}
    </h1>
  ),
  h2: ({ children }) => (
    <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-3">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="text-xl font-semibold text-gray-800 mt-5 mb-2">
      {children}
    </h3>
  ),
  h4: ({ children }) => (
    <h4 className="text-lg font-medium text-gray-700 mt-4 mb-2">
      {children}
    </h4>
  ),
  p: ({ children }) => (
    <p className="text-gray-700 leading-relaxed mb-4">
      {children}
    </p>
  ),
  ul: ({ children }) => (
    <ul className="list-disc list-inside mb-4 space-y-2 text-gray-700">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="list-decimal list-inside mb-4 space-y-2 text-gray-700">
      {children}
    </ol>
  ),
  li: ({ children }) => (
    <li className="leading-relaxed">
      {children}
    </li>
  ),
  blockquote: ({ children }) => (
    <blockquote className="border-l-4 border-blue-500 pl-4 italic text-gray-600 my-4 bg-blue-50 py-2">
      {children}
    </blockquote>
  ),
  code: ({ className, children, ...props }) => {
    const isInline = !className || !className.includes('language-');
    if (isInline) {
      return (
        <code className="bg-gray-100 text-red-600 px-1 py-0.5 rounded text-sm font-mono" {...props}>
          {children}
        </code>
      );
    }
    return (
      <code className="block bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm font-mono mb-4" {...props}>
        {children}
      </code>
    );
  },
  pre: ({ children, ...props }) => (
    <pre className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm font-mono mb-4" {...props}>
      {children}
    </pre>
  ),
  a: ({ href, children }) => (
    <a 
      href={href} 
      className="text-blue-600 hover:text-blue-800 underline"
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  ),
  strong: ({ children }) => (
    <strong className="font-semibold text-gray-900">
      {children}
    </strong>
  ),
  em: ({ children }) => (
    <em className="italic text-gray-700">
      {children}
    </em>
  ),
  hr: () => (
    <hr className="my-8 border-gray-300" />
  ),
  table: ({ children }) => (
    <div className="overflow-x-auto mb-4">
      <table className="min-w-full border border-gray-300 bg-white">
        {children}
      </table>
    </div>
  ),
  thead: ({ children }) => (
    <thead className="bg-gray-50">
      {children}
    </thead>
  ),
  tbody: ({ children }) => (
    <tbody className="divide-y divide-gray-200">
      {children}
    </tbody>
  ),
  tr: ({ children }) => (
    <tr className="hover:bg-gray-50">
      {children}
    </tr>
  ),
  th: ({ children }) => (
    <th className="px-4 py-2 text-left font-medium text-gray-900 border-b border-gray-300">
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className="px-4 py-2 text-gray-700 border-b border-gray-200">
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
    if (score >= 4.5) return 'from-green-500 to-green-600';
    if (score >= 4.0) return 'from-blue-500 to-blue-600';
    if (score >= 3.5) return 'from-yellow-500 to-yellow-600';
    if (score >= 3.0) return 'from-orange-500 to-orange-600';
    return 'from-red-500 to-red-600';
  };

  const getScoreText = (score: number) => {
    if (score >= 4.5) return '优秀';
    if (score >= 4.0) return '良好';
    if (score >= 3.5) return '一般';
    if (score >= 3.0) return '较差';
    return '很差';
  };

  return (
    <div className={`bg-gradient-to-br ${getScoreColor(score)} p-6 rounded-xl text-white text-center shadow-lg`}>
      <div className="text-sm opacity-90 mb-1">综合评分</div>
      <div className="text-5xl font-bold mb-1">{score.toFixed(1)}</div>
      <div className="text-sm opacity-90">/ 5.0</div>
      <div className="text-xs mt-2 bg-white bg-opacity-20 rounded-full px-2 py-1">
        {getScoreText(score)}
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
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto py-8 px-4">
        {/* Header */}
        <header className="mb-8">
          <div className="mb-4">
            <Link 
              href="/tools" 
              className="text-blue-600 hover:text-blue-800 text-sm font-medium inline-flex items-center"
            >
              ← 返回工具导航
            </Link>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
            {tool.name} 全面评测
          </h1>
          <p className="text-xl text-gray-600 mt-3">
            深度分析 · {currentYear} 年最新版本
          </p>
        </header>

        {/* Summary Card */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 mb-8">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex-shrink-0">
              <ScoreBadge score={tool.overall_score} />
            </div>
            
            <div className="flex-grow space-y-6">
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-3">工具概览</h2>
                <p className="text-lg text-gray-700 leading-relaxed">{tool.summary}</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                  <h4 className="text-green-800 font-semibold mb-3 flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                    主要优点
                  </h4>
                  <div className="text-green-700">
                    <ReactMarkdown 
                      remarkPlugins={[remarkGfm]} 
                      components={markdownComponents}
                    >
                      {tool.pros}
                    </ReactMarkdown>
                  </div>
                </div>
                
                <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                  <h4 className="text-red-800 font-semibold mb-3 flex items-center">
                    <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                    主要缺点
                  </h4>
                  <div className="text-red-700">
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
                  className="inline-flex items-center justify-center bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold py-4 px-8 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 w-full md:w-auto"
                >
                  <span>访问官方网站</span>
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Review */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 pb-3 border-b border-gray-200">
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
            className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            查看更多工具评测
          </Link>
        </div>
      </div>
    </div>
  );
}