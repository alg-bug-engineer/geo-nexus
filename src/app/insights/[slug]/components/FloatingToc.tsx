// src/app/insights/[slug]/components/FloatingToc.tsx

'use client';

import { useState, useEffect, useRef } from 'react';

// 定义提取出的标题的数据结构
interface Heading {
  level: number;
  text: string;
  id: string;
}

// slugify 函数，保持与 rehype-slug 行为一致
const slugify = (text: string) =>
  text
    .toLowerCase()
    .replace(/\s+/g, '-') 
    .replace(/[^\w-]+/g, ''); 

export const FloatingToc = ({ markdownContent }: { markdownContent: string }) => {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState('');
  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    // 1. 从Markdown文本中提取标题
    const headingRegex = /^(##|###)\s+(.*)/gm;
    const matches = Array.from(markdownContent.matchAll(headingRegex));
    
    const extractedHeadings = matches.map(match => {
      const level = match[1].length;
      // [BUG FIX]: 清理标题文本中的Markdown星号等符号
      const text = match[2].trim().replace(/(\*\*|__|\*|_|`|\[|\])/g, "");
      const id = slugify(text);
      return { level, text, id };
    });

    setHeadings(extractedHeadings);
  }, [markdownContent]);

  // 2. 设置滚动监听，高亮当前章节
  useEffect(() => {
    if (observer.current) {
      observer.current.disconnect();
    }

    observer.current = new IntersectionObserver(
      (entries) => {
        // 找到第一个在视口内或视口上方的标题
        const visibleEntry = entries.find(entry => entry.isIntersecting);
        if (visibleEntry) {
          setActiveId(visibleEntry.target.id);
        }
      },
      { rootMargin: '-30% 0px -70% 0px' } 
    );

    const elements = headings.map(h => document.getElementById(h.id)).filter(Boolean);
    elements.forEach(el => observer.current?.observe(el!));

    return () => observer.current?.disconnect();
  }, [headings]);

  if (headings.length < 2) { // 如果标题少于2个，则不显示目录
    return null;
  }

  return (
    // [NEW UX]: 悬浮显隐的容器
    // 'group' 用于启用 group-hover
    // 小屏幕(lg以下)隐藏
    <div className="hidden lg:block fixed left-0 top-1/2 -translate-y-1/2 z-50 group">
        {/*
          核心交互逻辑：
          - 初始状态：通过 -translate-x-full 将目录主体隐藏在屏幕左侧外部，只留一个触发条。
          - 悬停状态：group-hover:translate-x-0 将目录主体平移回屏幕内，实现滑出效果。
          - transition-transform 和 duration-300 实现平滑动画。
        */}
      <div className="relative transition-transform duration-300 ease-in-out -translate-x-full group-hover:translate-x-0">
        
        {/* 目录主体 */}
        <div className="w-64 bg-secondary/80 backdrop-blur-md border-y border-r border-border-primary rounded-r-2xl p-6 shadow-dark-large">
          <h3 className="text-base font-bold text-text-main mb-4 flex items-center gap-2">
            <svg className="w-4 h-4 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7"></path>
            </svg>
            文章目录
          </h3>
          <nav>
            <ul className="space-y-2 max-h-[60vh] overflow-y-auto">
              {headings.map((heading) => (
                <li key={heading.id} className={heading.level === 3 ? 'pl-3' : ''}>
                  <a
                    href={`#${heading.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      document.querySelector(`#${heading.id}`)?.scrollIntoView({
                        behavior: 'smooth'
                      });
                    }}
                    className={`block w-full py-1 text-sm border-l-2 transition-all duration-200 ${
                      activeId === heading.id
                        ? 'text-accent font-semibold border-accent pl-4' // 高亮样式
                        : 'text-text-secondary hover:text-text-main border-transparent hover:border-text-light pl-2' // 普通样式
                    }`}
                  >
                    {heading.text}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* 触发条：当鼠标移入这个区域时，目录滑出 */}
        <div className="absolute top-0 -right-4 w-4 h-full"></div>
      </div>
    </div>
  );
};