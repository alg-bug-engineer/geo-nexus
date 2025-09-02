// src/components/ToolCard.tsx (优化配色版本)
import Link from 'next/link';

interface ToolCardProps {
  slug: string;
  name: string;
  summary: string;
  score: number;
}

export const ToolCard = ({ slug, name, summary, score }: ToolCardProps) => {
  // 根据评分决定徽章颜色
  const getScoreColor = (score: number) => {
    if (score >= 4.5) return 'from-success via-success to-success/80 text-primary';
    if (score >= 4.0) return 'from-accent via-accent to-accent-secondary text-primary';
    if (score >= 3.5) return 'from-warning via-warning to-warning/80 text-primary';
    if (score >= 3.0) return 'from-warning via-error to-error text-primary';
    return 'from-error via-error to-error/80 text-primary';
  };

  const getScoreText = (score: number) => {
    if (score >= 4.5) return '推荐';
    if (score >= 4.0) return '不错';
    if (score >= 3.5) return '一般';
    if (score >= 3.0) return '较差';
    return '不推荐';
  };

  const getHoverGlow = (score: number) => {
    if (score >= 4.5) return 'group-hover:shadow-[0_0_30px_rgba(16,185,129,0.3)]';
    if (score >= 4.0) return 'group-hover:shadow-[0_0_30px_rgba(59,130,246,0.3)]';
    if (score >= 3.5) return 'group-hover:shadow-[0_0_30px_rgba(245,158,11,0.3)]';
    return 'group-hover:shadow-[0_0_30px_rgba(239,68,68,0.3)]';
  };

  return (
    <Link
      href={`/tools/reviews/${slug}`}
      className="block group h-full"
    >
      <article className={`bg-secondary/80 backdrop-blur-sm border border-border-primary rounded-2xl shadow-dark-medium overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:border-accent/50 h-full relative group ${getHoverGlow(score)}`}>
        
        {/* 背景装饰 */}
        <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-accent-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        {/* 内容区域 */}
        <div className="p-6 pb-4 relative z-10">
          <div className="flex justify-between items-start mb-4">
            <div className="flex-1 mr-4">
              <h3 className="text-xl font-bold text-text-main group-hover:text-accent transition-colors duration-300 line-clamp-2 mb-2 leading-tight">
                {name}
              </h3>
            </div>
            
            {/* 评分徽章 */}
            <div className="flex-shrink-0">
              <div className={`bg-gradient-to-br ${getScoreColor(score)} px-4 py-3 rounded-xl shadow-dark-medium flex flex-col items-center min-w-[4.5rem] border border-white/20 relative overflow-hidden group-hover:scale-105 transition-transform duration-300`}>
                {/* 徽章装饰 */}
                <div className="absolute inset-0 bg-shimmer opacity-20"></div>
                <div className="relative z-10">
                  <div className="text-lg font-bold leading-none mb-0.5">{score.toFixed(1)}</div>
                  <div className="text-xs opacity-90 leading-none">{getScoreText(score)}</div>
                </div>
              </div>
            </div>
          </div>

          {/* 描述文本 */}
          <div className="mb-6">
            <p className="text-text-secondary group-hover:text-text-light leading-relaxed line-clamp-4 text-sm transition-colors duration-300">
              {summary}
            </p>
          </div>
        </div>

        {/* 底部区域 */}
        <div className="px-6 pb-6 mt-auto relative z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center text-accent group-hover:text-accent-secondary font-medium text-sm transition-colors duration-300">
              <span>查看详细评测</span>
              <svg 
                className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
            
            {/* 装饰性元素 */}
            <div className="flex space-x-1.5">
              <div className="w-2 h-2 bg-accent/30 rounded-full group-hover:bg-accent group-hover:scale-110 transition-all duration-300"></div>
              <div className="w-2 h-2 bg-accent/20 rounded-full group-hover:bg-accent-secondary group-hover:scale-110 transition-all duration-300 delay-75"></div>
              <div className="w-2 h-2 bg-accent/10 rounded-full group-hover:bg-accent-secondary/70 group-hover:scale-110 transition-all duration-300 delay-150"></div>
            </div>
          </div>
        </div>

        {/* 底部装饰线 */}
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-accent to-accent-secondary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>

        {/* 悬停时的边框光效 */}
        <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <div className="absolute inset-0 rounded-2xl ring-1 ring-accent/30"></div>
        </div>
      </article>
    </Link>
  );
};