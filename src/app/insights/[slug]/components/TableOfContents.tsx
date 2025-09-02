// src/app/insights/[slug]/components/TableOfContents.tsx (已修正)
'use client';

import { useState, useEffect, useRef } from 'react';
// import Link from 'next/link'; // <--- 移除这一行

// 定义提取出的标题的数据结构
interface Heading {
  level: number;
  text: string;
  id: string;
}

// slugify 函数，用于将标题文本转换为ID
const slugify = (text: string) =>
  text
    .toLowerCase()
    .replace(/\s+/g, '-') // 替换空格为 -
    .replace(/[^\w-]+/g, ''); // 移除所有非单词字符

// 主组件
export const TableOfContents = ({ markdownContent }: { markdownContent: string }) => {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState('');
  const observer = useRef<IntersectionObserver | null>(null);

  // 从Markdown文本中提取标题
  useEffect(() => {
    const headingRegex = /^(##|###)\s+(.*)/gm;
    const matches = Array.from(markdownContent.matchAll(headingRegex));
    
    const extractedHeadings = matches.map(match => {
      const level = match[1].length;
      const text = match[2].trim();
      const id = slugify(text);
      return { level, text, id };
    });

    setHeadings(extractedHeadings);
  }, [markdownContent]);

  // 设置滚动监听，高亮当前章节
  useEffect(() => {
    if (observer.current) {
      observer.current.disconnect();
    }

    observer.current = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries.find(entry => entry.isIntersecting);
        if (visibleEntry) {
          setActiveId(visibleEntry.target.id);
        }
      },
      { rootMargin: '-20% 0px -80% 0px' } 
    );

    const elements = headings.map(h => document.getElementById(h.id)).filter(Boolean);
    elements.forEach(el => observer.current?.observe(el!));

    return () => observer.current?.disconnect();
  }, [headings]);

  if (headings.length === 0) {
    return null;
  }

  return (
    <div className="sticky top-24 w-full">
      <div className="bg-secondary/80 backdrop-blur-sm border border-border-primary rounded-2xl p-6 shadow-dark-medium">
        <h3 className="text-lg font-bold text-text-main mb-4 flex items-center gap-2">
          <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7"></path>
          </svg>
          文章目录
        </h3>
        <nav>
          <ul className="space-y-2">
            {headings.map((heading) => (
              <li key={heading.id} className={heading.level === 3 ? 'ml-4' : ''}>
                <a
                  href={`#${heading.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    document.querySelector(`#${heading.id}`)?.scrollIntoView({
                      behavior: 'smooth'
                    });
                  }}
                  className={`transition-colors duration-200 text-sm ${
                    activeId === heading.id
                      ? 'text-accent font-semibold'
                      : 'text-text-secondary hover:text-text-main'
                  }`}
                >
                  {heading.text}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};