/*
 * @filename: alg-bug-engineer/geo-nexus/geo-nexus-c0022f76688310702ab7bc516010d393a92d80dc/src/components/TopTools.tsx
 */
// src/components/TopTools.tsx
import Link from 'next/link';

// --- Type Definition ---
interface StrapiTool {
  id: number;
  name: string;
  slug: string;
  summary: string;
}

// --- Data Fetching Function ---
async function getTopTools(): Promise<StrapiTool[]> {
  const STRAPI_URL = `https://api.ai-knowledgepoints.cn/api/tools?sort=overall_score:desc&pagination[limit]=3`;
  try {
    const response = await fetch(STRAPI_URL, { cache: 'no-store' });
    if (!response.ok) return [];
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("Error fetching top tools:", error);
    return [];
  }
}

// 排名徽章组件
const RankBadge = ({ rank }: { rank: number }) => {
  const getRankStyle = (rank: number) => {
    switch (rank) {
      case 1:
        return 'bg-gradient-to-r from-yellow-400 to-yellow-500 text-yellow-900 shadow-yellow-400/30';
      case 2:
        return 'bg-gradient-to-r from-gray-300 to-gray-400 text-gray-900 shadow-gray-400/30';
      case 3:
        return 'bg-gradient-to-r from-amber-500 to-amber-600 text-amber-900 shadow-amber-500/30';
      default:
        return 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-blue-500/30';
    }
  };

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return '🏆';
      case 2:
        return '🥈';
      case 3:
        return '🥉';
      default:
        return '⭐';
    }
  };

  return (
    <div className={`${getRankStyle(rank)} px-3 py-1.5 rounded-full shadow-lg text-xs font-bold flex items-center space-x-1 w-fit`}>
      <span>{getRankIcon(rank)}</span>
      <span>TOP {rank}</span>
    </div>
  );
};

export const TopTools = async () => {
  const tools = await getTopTools();
  
  if (tools.length === 0) {
    return null;
  }

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative overflow-hidden">
      {/* 背景装饰 */}
      <div className="absolute inset-0 opacity-60">
        <div className="absolute top-0 left-0 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-0 right-0 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-0 left-1/2 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* 标题区域 */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg border border-white/20 mb-6">
            <span className="text-2xl mr-2">🔥</span>
            <span className="text-blue-600 font-semibold">热门推荐</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-transparent mb-4">
            热门工具评测
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            发现最受用户好评的优质工具，基于真实评分和深度评测
          </p>
        </div>

        {/* 工具卡片网格 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {tools.map((tool, index) => (
            <article 
              key={tool.id} 
              className="bg-white/80 backdrop-blur-sm border border-white/20 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 group relative overflow-hidden"
            >
              {/* 排名徽章 */}
              <div className="absolute top-6 right-6">
                <RankBadge rank={index + 1} />
              </div>

              {/* 卡片内容 */}
              <div className="space-y-6">
                <div className="space-y-3">
                  <h3 className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300 line-clamp-2 pr-16">
                    {tool.name}
                  </h3>
                  
                  <p className="text-gray-600 leading-relaxed line-clamp-4">
                    {tool.summary}
                  </p>
                </div>

                {/* 底部链接 */}
                <div className="pt-4">
                  <Link 
                    href={`/tools/reviews/${tool.slug}`} 
                    className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-semibold group/link transition-all duration-300"
                  >
                    <span>阅读完整评测</span>
                    <svg 
                      className="w-5 h-5 transform group-hover/link:translate-x-1 transition-transform duration-300" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              </div>

              {/* 悬停装饰线条 */}
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
            </article>
          ))}
        </div>

        {/* 查看全部按钮 */}
        <div className="text-center">
          <Link 
            href="/tools" 
            className="inline-flex items-center space-x-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold px-8 py-4 rounded-2xl shadow-xl hover:shadow-2xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:-translate-y-1 group"
          >
            <span>查看全部工具</span>
            <svg 
              className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};