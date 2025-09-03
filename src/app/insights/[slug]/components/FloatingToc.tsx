// src/app/insights/[slug]/components/FloatingToc.tsx (已修复版本)

'use client';

import { useState, useEffect, useRef } from 'react';
// 【关键改动 1】: 修正导入方式，将默认导出的类命名为 Slugger
import Slugger from 'github-slugger';

// 定义提取出的标题的数据结构
interface Heading {
  level: number;
  text: string;
  id: string;
}

export const FloatingToc = ({ markdownContent }: { markdownContent: string }) => {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState('');
  const observer = useRef<IntersectionObserver | null>(null);

  // 【关键改动 2】: 使用正确的类名来创建实例
  const slugger = new Slugger();

  useEffect(() => {
    // 【关键改动 3】: 重置 slugger 实例，确保每次渲染时都能正确处理重复标题
    slugger.reset();
    
    // 从Markdown文本中提取标题
    const headingRegex = /^(##|###)\s+(.*)/gm;
    const matches = Array.from(markdownContent.matchAll(headingRegex));
    
    const extractedHeadings = matches.map(match => {
      const level = match[1].length;
      const text = match[2].trim().replace(/(\*\*|__|\*|_|`|\[|\])/g, "");
      
      // 使用 slugger 实例生成 ID
      const id = slugger.slug(text);
      
      return { level, text, id };
    });

    setHeadings(extractedHeadings);
  // 依赖项中移除 slugger，因为它在组件的生命周期内是稳定的
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [markdownContent]);

  // 设置滚动监听，高亮当前章节 (这部分逻辑无需改动)
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
      { rootMargin: '-30% 0px -70% 0px' } 
    );

    const elements = headings.map(h => document.getElementById(h.id)).filter(Boolean);
    elements.forEach(el => observer.current?.observe(el!));

    return () => observer.current?.disconnect();
  }, [headings]);

  if (headings.length < 2) {
    return null;
  }

  return (
    <div className="hidden lg:block fixed left-0 top-1/2 -translate-y-1/2 z-50 group">
      <div className="relative transition-transform duration-300 ease-in-out -translate-x-full group-hover:translate-x-0">
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
                        ? 'text-accent font-semibold border-accent pl-4'
                        : 'text-text-secondary hover:text-text-main border-transparent hover:border-text-light pl-2'
                    }`}
                  >
                    {heading.text}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className="absolute top-0 -right-4 w-4 h-full"></div>
      </div>
    </div>
  );
};