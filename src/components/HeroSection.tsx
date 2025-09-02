// src/components/HeroSection.tsx
import Link from 'next/link';

export const HeroSection = () => {
  return (
    <section className="text-center py-20 md:py-32">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl md:text-6xl font-bold text-text-main leading-tight mb-4">
          驾驭AI浪潮，引领搜索未来。
          <br />
          <span className="text-accent">欢迎来到您的GEO情报中心。</span>
        </h1>
        <p className="text-lg md:text-xl text-text-light max-w-3xl mx-auto mb-8">
          提供最前沿的GEO洞察、深度指南和精选工具评测，助您在AI时代占得先机。
        </p>
        <div className="flex justify-center items-center gap-4 flex-wrap">
          <Link
            href="/insights"
            className="bg-accent text-primary font-bold py-3 px-8 rounded-md hover:bg-opacity-90 transition-all text-lg"
          >
            探索深度指南
          </Link>
          <Link
            href="/tools" // 暂时这个页面还不存在，但我们先放上链接
            className="bg-transparent border-2 border-accent text-accent font-bold py-3 px-8 rounded-md hover:bg-accent hover:text-primary transition-all text-lg"
          >
            查看工具评测
          </Link>
        </div>
      </div>
    </section>
  );
};