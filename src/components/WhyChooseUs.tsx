// src/components/WhyChooseUs.tsx
export const WhyChooseUs = () => {
  return (
    // Use our primary theme background for consistency
    <section className="py-20 bg-primary">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold text-text-main mb-4">
          为什么选择我们？
        </h2>
        <p className="text-lg text-text-secondary mb-12">
          我们提供最深度、最前沿、最客观的 GEO 洞察。
        </p>

        {/* Grid container for the feature cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">

          {/* Card 1 */}
          <div className="bg-secondary p-8 rounded-xl border border-transparent hover:border-accent/50 hover:scale-105 transition-all duration-300">
            <h3 className="text-2xl font-bold text-accent mb-3">🚀 前沿洞察</h3>
            <p className="text-text-secondary">
              紧跟AI和搜索引擎的最新发展，为你提供最具时效性的策略和分析。
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-secondary p-8 rounded-xl border border-transparent hover:border-accent/50 hover:scale-105 transition-all duration-300">
            <h3 className="text-2xl font-bold text-accent mb-3">🛠️ 精选工具</h3>
            <p className="text-text-secondary">
              我们亲自测试和评测市面上的主流AI工具，为你去芜存菁，节省宝贵时间。
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-secondary p-8 rounded-xl border border-transparent hover:border-accent/50 hover:scale-105 transition-all duration-300">
            <h3 className="text-2xl font-bold text-accent mb-3">🤝 实践导向</h3>
            <p className="text-text-secondary">
              所有指南和案例都源于实践，提供清晰、可操作的建议，而非空洞理论。
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}