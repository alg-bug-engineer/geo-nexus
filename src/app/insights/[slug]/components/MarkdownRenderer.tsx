// src/app/insights/[slug]/components/MarkdownRenderer.tsx
'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import rehypeSlug from 'rehype-slug';
import { Components } from 'react-markdown';
import React from 'react';

interface MarkdownRendererProps {
  content: string;
}

// 为 code 组件定义类型
interface CodeProps extends React.ComponentProps<'code'> {
  className?: string;
  children?: React.ReactNode;
}

// 自定义Markdown组件
const markdownComponents: Components = {
  // 表格组件
  table: ({ children }) => (
    <div className="overflow-x-auto my-6">
      <table className="min-w-full border border-accent/20 rounded-lg overflow-hidden">
        {children}
      </table>
    </div>
  ),
  thead: ({ children }) => (
    <thead className="bg-accent/10">
      {children}
    </thead>
  ),
  tbody: ({ children }) => (
    <tbody className="divide-y divide-accent/10">
      {children}
    </tbody>
  ),
  tr: ({ children }) => (
    <tr className="hover:bg-accent/5 transition-colors">
      {children}
    </tr>
  ),
  th: ({ children }) => (
    <th className="px-4 py-3 text-left text-sm font-semibold text-accent border-b border-accent/20">
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className="px-4 py-3 text-sm text-text-main border-b border-accent/10">
      {children}
    </td>
  ),
  // 代码块 - 修复了类型定义
  code: ({ className, children, ...props }: CodeProps) => {
    const isInline = !className?.includes('language-');
    return isInline ? (
      <code className="bg-accent/10 text-accent px-1.5 py-0.5 rounded text-sm font-mono" {...props}>
        {children}
      </code>
    ) : (
      <div className="relative my-4">
        <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
          <code className={className} {...props}>
            {children}
          </code>
        </pre>
      </div>
    );
  },
  // 块引用
  blockquote: ({ children }) => (
    <blockquote className="border-l-4 border-accent pl-4 py-2 my-4 bg-accent/5 italic">
      {children}
    </blockquote>
  ),
  // 标题组件
  h1: ({ children }) => (
    <h1 className="text-3xl font-bold text-accent mt-8 mb-4 border-b border-accent/20 pb-2">
      {children}
    </h1>
  ),
  h2: ({ children }) => (
    <h2 className="text-2xl font-bold text-accent mt-6 mb-3">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="text-xl font-semibold text-accent mt-5 mb-2">
      {children}
    </h3>
  ),
  h4: ({ children }) => (
    <h4 className="text-lg font-semibold text-text-main mt-4 mb-2">
      {children}
    </h4>
  ),
  // 链接
  a: ({ href, children }) => (
    <a 
      href={href} 
      className="text-accent hover:text-accent/80 underline transition-colors"
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  ),
  // 列表
  ul: ({ children }) => (
    <ul className="list-disc list-inside my-4 space-y-2 pl-4">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="list-decimal list-inside my-4 space-y-2 pl-4">
      {children}
    </ol>
  ),
  li: ({ children }) => (
    <li className="text-text-main leading-relaxed">
      {children}
    </li>
  ),
  // 段落
  p: ({ children }) => (
    <p className="text-text-main leading-relaxed my-4">
      {children}
    </p>
  ),
  // 强调文本
  strong: ({ children }) => (
    <strong className="font-bold text-text-main">
      {children}
    </strong>
  ),
  em: ({ children }) => (
    <em className="italic text-text-secondary">
      {children}
    </em>
  ),
  // 分隔线
  hr: () => (
    <hr className="my-8 border-t border-accent/20" />
  ),
};

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <>
      {/* 内联样式 */}
      <style jsx global>{`
        .markdown-content {
          line-height: 1.7;
        }
        
        .markdown-content img {
          max-width: 100%;
          height: auto;
          border-radius: 8px;
          margin: 1.5rem 0;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }
        
        .markdown-content pre {
          position: relative;
          font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
        }
        
        .markdown-content table {
          font-size: 0.9rem;
        }
        
        .markdown-content blockquote p {
          margin: 0;
        }
        
        /* 响应式表格 */
        @media (max-width: 768px) {
          .markdown-content table {
            font-size: 0.8rem;
          }
          
          .markdown-content th,
          .markdown-content td {
            padding: 0.5rem;
          }
        }
        
        /* 深色模式适配 */
        @media (prefers-color-scheme: dark) {
          .markdown-content pre {
            background-color: #1a1a1a;
          }
        }
      `}</style>
      
      <div className="markdown-content prose prose-lg max-w-none">
        <ReactMarkdown 
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeHighlight, rehypeSlug]}
          components={markdownComponents}
        >
          {content}
        </ReactMarkdown>
      </div>
    </>
  );
}