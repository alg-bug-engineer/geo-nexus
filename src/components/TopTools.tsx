// src/components/TopTools.tsx (优化配色版本)
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
        return 'from-warning via-warning to-warning/80 text-primary shadow-[0_0_20px_rgba(245,158,11,0.4)]';
      case 2:
        return 'from-text-light via-text-light to-text-muted text-primary shadow-[0_0_20px_rgba(148,163,184,0.4)]';
      case 3:
        return 'from-warning via-error to-error/80 text-primary shadow-[0_0_20px_rgba(251,146,60,0.4)]';
      default:
        return 'from-accent via-accent-secondary to-accent text-primary shadow-glow';
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
    <div className={`bg-gradient-to-br ${getRankStyle(rank)} px-4 py-2 rounded-full text-xs font-bold flex items-center space-x-2 w-fit border border-white/20 relative overflow-hidden`}>
      <div className="absolute inset-0 bg-shimmer animate-shimmer opacity-20"></div>
      <span className="relative z-10">{getRankIcon(rank)}</span>
      <span className="relative z-10">TOP {rank}</span>
    </div>
  );
};

export const TopTools = async () => {
  const tools = await getTopTools();
  
  if (tools.length === 0) {
    return null;
  }

  return (
    <section className="py-20 bg-gradient-to-br from-primary via-secondary/50 to-primary relative overflow-hidden">
      {/* 背景装饰 */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-0 w-72 h-72 bg-accent rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
        <div className="absolute top-0 right-0 w-72 h-72 bg-accent-secondary rounded-full mix-blend-multiply filter blur-3xl animate-blob" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-0 left-1/2 w-72 h-72 bg-success rounded-full mix-blend-multiply filter blur-3xl animate-blob" style={{ animationDelay: '4s' }}></div>
      </div>

      {/* 网格背景 */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(59,130,246,0.3)_1px,transparent_1px),linear-gradient(180deg,rgba(59,130,246,0.3)_1px,transparent_1px)] bg-[size:60px_60px]"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* 标题区域 */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center bg-secondary/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-dark-medium border border-border-primary mb-6 group hover:border-accent/30 transition-all duration-300">
            <span className="text-2xl mr-2 group-hover:animate-bounce">🔥</span>
            <span className="text-accent font-semibold">热门推荐</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-text-main via-accent to-accent-secondary bg-clip-text text-transparent">
              热门工具评测
            </span>
          </h2>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            发现最受用户好评的优质工具，基于真实评分和深度评测
          </p>
        </div>

        {/* 工具卡片网格 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {tools.map((tool, index) => (
            <article 
              key={tool.id} 
              className="bg-secondary/80 backdrop-blur-sm border border-border-primary rounded-3xl p-8 shadow-dark-large hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)] transition-all duration-500 hover:-translate-y-3 group relative overflow-hidden animate-fade-in"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              {/* 背景装饰 */}
              <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-accent-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              {/* 排名徽章 */}
              <div className="absolute top-6 right-6 group-hover:scale-110 transition-transform duration-300">
                <RankBadge rank={index + 1} />
              </div>

              {/* 卡片内容 */}
              <div className="space-y-6 relative z-10">
                <div className="space-y-3">
                  <h3 className="text-2xl font-bold text-text-main group-hover:text-accent transition-colors duration-300 line-clamp-2 pr-16 leading-tight">
                    {tool.name}
                  </h3>
                  
                  <p className="text-text-secondary group-hover:text-text-light leading-relaxed line-clamp-4 transition-colors duration-300">
                    {tool.summary}
                  </p>
                </div>

                {/* 底部链接 */}
                <div className="pt-4">
                  <Link 
                    href={`/tools/reviews/${tool.slug}`} 
                    className="inline-flex items-center space-x-2 text-accent hover:text-accent-secondary font-semibold group/link transition-all duration-300"
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
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-accent to-accent-secondary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
              
              {/* 悬停边框效果 */}
              <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                <div className="absolute inset-0 rounded-3xl ring-1 ring-accent/20"></div>
              </div>
            </article>
          ))}
        </div>

        {/* 查看全部按钮 */}
        <div className="text-center">
          <Link 
            href="/tools" 
            className="inline-flex items-center space-x-3 bg-gradient-to-r from-accent to-accent-secondary text-primary font-semibold px-10 py-5 rounded-2xl shadow-glow hover:shadow-[0_0_40px_rgba(59,130,246,0.4)] transition-all duration-300 transform hover:-translate-y-1 group relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-shimmer animate-shimmer opacity-20"></div>
            <span className="relative z-10">查看全部工具</span>
            <svg 
              className="w-5 h-5 relative z-10 transform group-hover:translate-x-1 transition-transform duration-300" 
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