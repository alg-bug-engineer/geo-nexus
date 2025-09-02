// src/app/about/page.tsx
import type { Metadata } from 'next';

// 为页面提供独立的 SEO 元数据
export const metadata: Metadata = {
  title: '关于我们 | GEO Nexus',
  description: '了解 GEO Nexus，我们是面向从业者与中小企业的、领先的生成式引擎优化（GEO）资讯与工具评测中心。',
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <header className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-text-main mb-4">
          驾驭AI浪潮，引领搜索未来
        </h1>
        <p className="text-xl text-text-light">
          欢迎来到您的 GEO 情报中心
        </p>
      </header>

      <section className="space-y-8 text-lg leading-relaxed">
        <p>
          在人工智能深刻变革数字营销的今天，<b>GEO Nexus</b> 应运而生。我们的使命非常明确：成为面向从业者与中小企业的、行业领先的<b>生成式引擎优化 (Generative Engine Optimization, GEO)</b> 资讯与工具评测中心。
        </p>
        <p>
          我们深知，无论是经验丰富的SEO专家、数字营销经理，还是希望利用AI技术提升业务的中小企业主，都迫切需要一个清晰、权威、值得信赖的信息来源。
        </p>

        <div className="border-l-4 border-accent pl-6 py-2 my-6">
          <h2 className="text-2xl font-bold text-text-main mb-2">我们的核心目标</h2>
          <ul className="list-disc list-inside space-y-2">
            <li><span className="font-semibold">流量获取：</span> 通过顶级的SEO内容策略，成为GEO领域在Google搜索中的首选信息来源。</li>
            <li><span className="font-semibold">权威建立：</span> 将网站打造成行业内公认的、值得信赖的权威品牌。</li>
            <li><span className="font-semibold">商业转化：</span> 将获取的精准流量，有效转化为咨询服务的潜在客户。</li>
          </ul>
        </div>

        <p>
          无论您是寻求深度前沿知识，还是寻找高效的AI工具和可行的入门指南，GEO Nexus 都将是您最可靠的伙伴。让我们一起，在AI时代脱颖而出。
        </p>
      </section>
    </div>
  );
}
