// src/components/HeroSection.tsx (优化配色版本)
import Link from 'next/link';

export const HeroSection = () => {
  return (
    <section className="relative text-center py-20 md:py-32 overflow-hidden">
      {/* 背景装饰 */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-accent-secondary rounded-full mix-blend-multiply filter blur-3xl animate-blob" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-1/4 left-1/2 w-96 h-96 bg-success rounded-full mix-blend-multiply filter blur-3xl animate-blob" style={{ animationDelay: '4s' }}></div>
      </div>
      
      {/* 网格背景 */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(59,130,246,0.3)_1px,transparent_1px),linear-gradient(180deg,rgba(59,130,246,0.3)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* 主标题 */}
        <div className="animate-fade-in">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-text-main leading-tight mb-6">
            <span className="block mb-2">驾驭AI浪潮，</span>
            <span className="block mb-2">引领搜索未来。</span>
            <span className="block bg-gradient-to-r from-accent via-accent-secondary to-accent bg-clip-text text-transparent">
              欢迎来到您的GEO情报中心。
            </span>
          </h1>
        </div>
        
        {/* 副标题 */}
        <div className="animate-fade-in" style={{ animationDelay: '200ms' }}>
          <p className="text-lg md:text-xl lg:text-2xl text-text-secondary max-w-4xl mx-auto mb-12 leading-relaxed">
            提供最前沿的GEO洞察、深度指南和精选工具评测，
            <br className="hidden md:block" />
            助您在AI时代占得先机，脱颖而出。
          </p>
        </div>
        
        {/* CTA按钮组 */}
        <div className="animate-fade-in flex justify-center items-center gap-6 flex-wrap" style={{ animationDelay: '400ms' }}>
          {/* 主要CTA */}
          <Link
            href="/insights"
            className="group bg-gradient-to-r from-accent to-accent-secondary text-primary font-bold py-4 px-8 rounded-2xl hover:shadow-glow transition-all duration-300 text-lg relative overflow-hidden transform hover:scale-105"
          >
            <div className="absolute inset-0 bg-shimmer animate-shimmer opacity-20"></div>
            <span className="relative z-10 flex items-center gap-2">
              <svg className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
              探索深度指南
            </span>
          </Link>
          
          {/* 次要CTA */}
          <Link
            href="/tools"
            className="group bg-transparent border-2 border-accent/50 text-accent hover:text-primary font-bold py-4 px-8 rounded-2xl hover:bg-accent hover:border-accent transition-all duration-300 text-lg backdrop-blur-sm transform hover:scale-105"
          >
            <span className="flex items-center gap-2">
              <svg className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              查看工具评测
            </span>
          </Link>
        </div>
        
        {/* 特性亮点 */}
        <div className="animate-fade-in mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto" style={{ animationDelay: '600ms' }}>
          <div className="text-center p-4 bg-secondary/30 backdrop-blur-sm rounded-xl border border-border-primary hover:border-accent/30 transition-all duration-300 group">
            <div className="w-12 h-12 bg-gradient-to-br from-accent/20 to-accent/10 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300">
              <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="font-semibold text-text-main mb-1">前沿洞察</h3>
            <p className="text-sm text-text-secondary">最新AI技术趋势</p>
          </div>
          
          <div className="text-center p-4 bg-secondary/30 backdrop-blur-sm rounded-xl border border-border-primary hover:border-accent-secondary/30 transition-all duration-300 group">
            <div className="w-12 h-12 bg-gradient-to-br from-accent-secondary/20 to-accent-secondary/10 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300">
              <svg className="w-6 h-6 text-accent-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h3 className="font-semibold text-text-main mb-1">精选工具</h3>
            <p className="text-sm text-text-secondary">深度评测分析</p>
          </div>
          
          <div className="text-center p-4 bg-secondary/30 backdrop-blur-sm rounded-xl border border-border-primary hover:border-success/30 transition-all duration-300 group">
            <div className="w-12 h-12 bg-gradient-to-br from-success/20 to-success/10 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300">
              <svg className="w-6 h-6 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="font-semibold text-text-main mb-1">实践导向</h3>
            <p className="text-sm text-text-secondary">可操作的建议</p>
          </div>
        </div>
      </div>
    </section>
  );
};