// src/components/EmailSubscription.tsx (优化配色版本)
export const EmailSubscription = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-primary via-secondary/20 to-primary relative overflow-hidden">
      {/* 背景装饰 */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-0 w-72 h-72 bg-accent rounded-full mix-blend-multiply filter blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-accent-secondary rounded-full mix-blend-multiply filter blur-3xl" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-success rounded-full mix-blend-multiply filter blur-3xl" style={{ animationDelay: '4s' }}></div>
      </div>

      {/* 网格背景 */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(59,130,246,0.3)_1px,transparent_1px),linear-gradient(180deg,rgba(59,130,246,0.3)_1px,transparent_1px)] bg-[size:80px_80px]"></div>
      </div>

      <div className="w-4/5 mx-auto px-4 relative z-10">
        <div className="mx-auto text-center bg-secondary/80 backdrop-blur-md p-8 md:p-12 lg:p-16 rounded-3xl border border-border-primary shadow-dark-large relative overflow-hidden">
          
          {/* 内容装饰背景 */}
          <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-accent-secondary/5"></div>
          
          {/* 内容区域 */}
          <div className="relative z-10 space-y-8">
            
            {/* 图标装饰 */}
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-gradient-to-br from-accent/20 to-accent-secondary/20 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-accent/20 shadow-glow">
                <svg className="w-10 h-10 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
            </div>

            {/* 标题 */}
            <h2 className="text-4xl md:text-5xl font-bold text-text-main mb-4">
              不错过任何一个GEO趋势
            </h2>
            
            {/* 副标题 */}
            <p className="text-text-secondary text-lg md:text-xl mb-8 max-w-2xl mx-auto leading-relaxed">
              订阅我们的资讯，免费获取
              <span className="text-accent font-semibold">《GEO入门权威白皮书》</span>，
              并定期收到最新行业动态。
            </p>
            
            {/* 特性列表 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 max-w-4xl mx-auto">
              <div className="flex items-center space-x-3 text-left">
                <div className="w-8 h-8 bg-success/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-text-light text-sm">每周最新GEO资讯</span>
              </div>
              
              <div className="flex items-center space-x-3 text-left">
                <div className="w-8 h-8 bg-accent/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <span className="text-text-light text-sm">独家深度指南</span>
              </div>
              
              <div className="flex items-center space-x-3 text-left">
                <div className="w-8 h-8 bg-accent-secondary/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-accent-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <span className="text-text-light text-sm">工具评测抢先看</span>
              </div>
            </div>
            
            {/* 订阅表单 */}
            <form className="flex flex-col md:flex-row gap-4 max-w-2xl mx-auto group">
              <div className="flex-grow relative">
                <input
                  type="email"
                  placeholder="请输入您的邮箱地址"
                  required
                  className="w-full bg-tertiary/50 backdrop-blur-sm border-2 border-border-secondary text-text-main rounded-2xl py-4 px-6 focus:ring-2 focus:ring-accent focus:border-accent focus:outline-none transition-all duration-300 placeholder:text-text-muted group-hover:border-accent/30"
                />
                <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                  <svg className="w-5 h-5 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
              
              <button
                type="submit"
                className="bg-gradient-to-r from-accent to-accent-secondary text-primary font-bold py-4 px-8 rounded-2xl hover:shadow-glow hover:scale-105 transition-all duration-300 whitespace-nowrap relative overflow-hidden group/btn"
              >
                <div className="absolute inset-0 bg-shimmer opacity-20"></div>
                <span className="relative z-10 flex items-center gap-2">
                  <svg className="w-5 h-5 group-hover/btn:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                  立即订阅
                </span>
              </button>
            </form>
            
            {/* 隐私声明 */}
            <p className="text-xs text-text-muted max-w-lg mx-auto">
              我们重视您的隐私。您的邮箱地址仅用于发送GEO资讯，不会与第三方共享。
              您可以随时取消订阅。
            </p>
          </div>
          
          {/* 装饰性光效 */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-accent to-transparent opacity-50"></div>
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-accent-secondary to-transparent opacity-50"></div>
        </div>
      </div>
    </section>
  );
};