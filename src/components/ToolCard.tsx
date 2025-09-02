// src/components/ToolCard.tsx
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
    if (score >= 4.5) return 'from-emerald-500 to-green-500 text-white';
    if (score >= 4.0) return 'from-blue-500 to-cyan-500 text-white';
    if (score >= 3.5) return 'from-yellow-400 to-orange-400 text-white';
    if (score >= 3.0) return 'from-orange-500 to-red-500 text-white';
    return 'from-red-500 to-red-600 text-white';
  };

  const getScoreText = (score: number) => {
    if (score >= 4.5) return '推荐';
    if (score >= 4.0) return '不错';
    if (score >= 3.5) return '一般';
    if (score >= 3.0) return '较差';
    return '不推荐';
  };

  return (
    <Link
      href={`/tools/reviews/${slug}`}
      className="block group"
    >
      <article className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 hover:border-blue-200 h-full relative">
        {/* 头部区域 */}
        <div className="p-6 pb-4">
          <div className="flex justify-between items-start mb-4">
            <div className="flex-1 mr-4">
              <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300 line-clamp-2 mb-2">
                {name}
              </h3>
            </div>
            
            {/* 评分徽章 */}
            <div className="flex-shrink-0">
              <div className={`bg-gradient-to-r ${getScoreColor(score)} px-3 py-2 rounded-xl shadow-md flex flex-col items-center min-w-[4rem]`}>
                <div className="text-lg font-bold leading-none">{score.toFixed(1)}</div>
                <div className="text-xs opacity-90 leading-none mt-0.5">{getScoreText(score)}</div>
              </div>
            </div>
          </div>

          {/* 描述文本 */}
          <p className="text-gray-600 leading-relaxed line-clamp-3 text-sm">
            {summary}
          </p>
        </div>

        {/* 底部区域 */}
        <div className="px-6 pb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center text-blue-600 group-hover:text-blue-700 font-medium text-sm transition-colors duration-300">
              <span>查看详细评测</span>
              <svg 
                className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform duration-300" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
            
            {/* 装饰性元素 */}
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-blue-200 rounded-full group-hover:bg-blue-400 transition-colors duration-300"></div>
              <div className="w-2 h-2 bg-blue-300 rounded-full group-hover:bg-blue-500 transition-colors duration-300 delay-75"></div>
              <div className="w-2 h-2 bg-blue-400 rounded-full group-hover:bg-blue-600 transition-colors duration-300 delay-150"></div>
            </div>
          </div>
        </div>

        {/* 悬停时的边框光效 */}
        <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <div className="absolute inset-0 rounded-2xl border-2 border-blue-400 shadow-lg shadow-blue-400/20"></div>
        </div>
      </article>
    </Link>
  );
};