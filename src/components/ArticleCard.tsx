// src/components/ArticleCard.tsx (优化配色版本)
import Link from 'next/link';

interface ArticleCardProps {
  title: string;
  summary: string;
  slug: string;
}

export const ArticleCard = ({ title, summary, slug }: ArticleCardProps) => {
  return (
    // 整个卡片是一个可点击链接
    <Link href={`/insights/${slug}`} className="block group h-full">
      <article className="h-full bg-secondary/80 backdrop-blur-sm border border-border-primary rounded-2xl shadow-dark-medium p-6 group-hover:border-accent/50 group-hover:shadow-dark-large transition-all duration-300 flex flex-col relative overflow-hidden">
        
        {/* 装饰性渐变背景 */}
        <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-accent-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        {/* 内容区域 */}
        <div className="relative z-10 flex flex-col h-full">
          {/* 标题区域 */}
          <div className="mb-4">
            <h3 className="text-xl font-bold text-text-main group-hover:text-accent transition-colors duration-300 line-clamp-2 leading-tight">
              {title}
            </h3>
          </div>
          
          {/* 摘要区域 */}
          <div className="flex-grow mb-6">
            <p className="text-text-secondary group-hover:text-text-light transition-colors duration-300 leading-relaxed line-clamp-4">
              {summary}
            </p>
          </div>
          
          {/* 底部操作区域 */}
          <div className="mt-auto flex items-center justify-between">
            {/* "查看全文" 链接 */}
            <div className="flex items-center gap-2 font-semibold text-accent group-hover:text-accent-secondary transition-colors duration-300">
              <span>查看全文</span>
              <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </div>
            
            {/* 装饰性元素 */}
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-accent/30 rounded-full group-hover:bg-accent group-hover:scale-110 transition-all duration-300"></div>
              <div className="w-1.5 h-1.5 bg-accent/20 rounded-full group-hover:bg-accent-secondary group-hover:scale-110 transition-all duration-300 delay-75"></div>
              <div className="w-1 h-1 bg-accent/10 rounded-full group-hover:bg-accent-secondary/70 group-hover:scale-110 transition-all duration-300 delay-150"></div>
            </div>
          </div>
        </div>
        
        {/* 悬停时的底部装饰线 */}
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-accent to-accent-secondary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
        
        {/* 悬停时的光晕效果 */}
        <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <div className="absolute inset-0 rounded-2xl ring-1 ring-accent/20 shadow-lg shadow-accent/10"></div>
        </div>
      </article>
    </Link>
  );
};