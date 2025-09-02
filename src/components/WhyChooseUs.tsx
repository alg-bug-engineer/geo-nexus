// src/components/WhyChooseUs.tsx (优化配色版本)
import Link from 'next/link';
export const WhyChooseUs = () => {
  const features = [
    {
      icon: "🚀",
      title: "前沿洞察",
      description: "紧跟AI和搜索引擎的最新发展，为你提供最具时效性的策略和分析。",
      gradient: "from-accent/20 to-accent/10",
      borderColor: "border-accent/20",
      hoverBorder: "hover:border-accent/50",
      iconBg: "bg-gradient-to-br from-accent/20 to-accent/10",
      textColor: "text-accent"
    },
    {
      icon: "🛠️",
      title: "精选工具",
      description: "我们亲自测试和评测市面上的主流AI工具，为你去芜存菁，节省宝贵时间。",
      gradient: "from-accent-secondary/20 to-accent-secondary/10",
      borderColor: "border-accent-secondary/20",
      hoverBorder: "hover:border-accent-secondary/50",
      iconBg: "bg-gradient-to-br from-accent-secondary/20 to-accent-secondary/10",
      textColor: "text-accent-secondary"
    },
    {
      icon: "🤝",
      title: "实践导向",
      description: "所有指南和案例都源于实践，提供清晰、可操作的建议，而非空洞理论。",
      gradient: "from-success/20 to-success/10",
      borderColor: "border-success/20",
      hoverBorder: "hover:border-success/50",
      iconBg: "bg-gradient-to-br from-success/20 to-success/10",
      textColor: "text-success"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-primary via-secondary/30 to-primary relative overflow-hidden">
      {/* 背景装饰 */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-accent rounded-full mix-blend-multiply filter blur-2xl"></div>
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-success rounded-full mix-blend-multiply filter blur-2xl" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-1/4 left-1/2 w-64 h-64 bg-accent-secondary rounded-full mix-blend-multiply filter blur-2xl" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="container mx-auto px-4 text-center relative z-10">
        {/* 标题区域 */}
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-text-main mb-6">
            为什么选择
            <span className="bg-gradient-to-r from-accent via-accent-secondary to-success bg-clip-text text-transparent">
              {" "}我们？
            </span>
          </h2>
          <p className="text-lg md:text-xl text-text-secondary mb-4 max-w-3xl mx-auto">
            我们提供最深度、最前沿、最客观的 GEO 洞察
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-accent to-accent-secondary mx-auto rounded-full"></div>
        </div>

        {/* 特性卡片网格 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className={`bg-secondary/80 backdrop-blur-sm p-8 rounded-2xl border ${feature.borderColor} ${feature.hoverBorder} hover:scale-105 transition-all duration-300 group relative overflow-hidden shadow-dark-medium hover:shadow-dark-large`}
              style={{ animationDelay: `${index * 200}ms` }}
            >
              {/* 背景装饰 */}
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
              
              {/* 内容区域 */}
              <div className="relative z-10 space-y-6">
                {/* 图标区域 */}
                <div className="flex items-center space-x-4">
                  <div className={`w-16 h-16 ${feature.iconBg} backdrop-blur-sm rounded-2xl flex items-center justify-center text-3xl group-hover:scale-110 transition-transform duration-300 border border-white/10`}>
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className={`text-2xl font-bold ${feature.textColor} mb-2 group-hover:text-opacity-80 transition-colors duration-300`}>
                      {feature.title}
                    </h3>
                  </div>
                </div>
                
                {/* 描述文本 */}
                <p className="text-text-secondary group-hover:text-text-light leading-relaxed transition-colors duration-300">
                  {feature.description}
                </p>
                
                {/* 装饰性元素 */}
                <div className="flex items-center justify-end space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                  <div className={`w-2 h-2 ${feature.textColor.replace('text-', 'bg-')}/30 rounded-full`}></div>
                  <div className={`w-1.5 h-1.5 ${feature.textColor.replace('text-', 'bg-')}/20 rounded-full`}></div>
                  <div className={`w-1 h-1 ${feature.textColor.replace('text-', 'bg-')}/10 rounded-full`}></div>
                </div>
              </div>
              
              {/* 悬停时的底部装饰线 */}
              <div className={`absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r ${feature.textColor.replace('text-', 'from-')} to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left`}></div>
            </div>
          ))}
        </div>
        
        {/* 底部 CTA */}
        <div className="mt-16" style={{ animationDelay: '800ms' }}>
          <div className="bg-secondary/60 backdrop-blur-sm rounded-2xl p-8 border border-border-primary shadow-dark-medium">
            <h3 className="text-2xl font-bold text-text-main mb-4">
              准备好开始您的GEO之旅了吗？
            </h3>
            <p className="text-text-secondary mb-6 max-w-2xl mx-auto">
              立即探索我们的深度指南和精选工具，让AI为您的业务增长助力
            </p>
            <div className="flex justify-center gap-4 flex-wrap">
              <Link
                href="/insights"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-accent to-accent-secondary text-primary font-semibold px-6 py-3 rounded-xl hover:shadow-glow transition-all duration-300 transform hover:scale-105"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
                探索深度指南
              </Link>
              <Link
                href="/tools"
                className="inline-flex items-center gap-2 bg-secondary border border-border-secondary text-text-secondary hover:text-text-main font-semibold px-6 py-3 rounded-xl hover:bg-tertiary hover:border-accent/50 transition-all duration-300"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                查看工具评测
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};