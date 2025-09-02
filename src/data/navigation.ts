export interface NavItem {
  title: string;
  description: string;
  category: string;
  imageUrl: string;
  link: string;
}

export interface NavCategory {
  name: string;
  key: string;
}

export const categories: NavCategory[] = [
  { name: 'GEO套件', key: 'geo-suite' },
  { name: 'AI内容生成', key: 'content-generation' },
  { name: '内容优化与分析', key: 'content-optimization' },
  { name: '关键词与趋势研究', key: 'keyword-research' },
  { name: '品牌可见度监控', key: 'visibility-monitoring' },
];

export const navItems: NavItem[] = [
  {
    title: 'Writesonic',
    description: '一个强大的AI写作助手，能生成高质量的博客文章、广告文案和社交媒体内容，非常适合用于内容驱动的GEO策略。',
    category: 'content-generation',
    imageUrl: 'https://placehold.co/400x200/7c3aed/ffffff?text=Writesonic',
    link: 'https://writesonic.com/',
  },
  {
    title: 'Surfer SEO',
    description: '将内容创作、SEO策略和内容优化融为一体。它通过分析排名靠前的页面来为您的内容提供数据驱动的建议。',
    category: 'content-optimization',
    imageUrl: 'https://placehold.co/400x200/6366f1/ffffff?text=Surfer+SEO',
    link: 'https://surferseo.com/',
  },
  {
    title: 'Jasper (formerly Jarvis)',
    description: '市场上最受欢迎的AI写作工具之一，能够快速生成各种类型的高质量原创内容，帮助您大规模扩展内容生产。',
    category: 'content-generation',
    imageUrl: 'https://placehold.co/400x200/ec4899/ffffff?text=Jasper',
    link: 'https://www.jasper.ai/',
  },
  {
    title: 'Frase.io',
    description: '一款集内容研究、写作和优化于一体的AI工具。它可以帮助您快速创建能够回答用户问题的详细内容摘要。',
    category: 'content-optimization',
    imageUrl: 'https://placehold.co/400x200/22c55e/ffffff?text=Frase.io',
    link: 'https://www.frase.io/',
  },
  {
    title: 'MarketMuse',
    description: '一个AI驱动的内容策略和优化平台，使用AI来分析您的内容，并提供关于如何提高主题权威性和排名的建议。',
    category: 'geo-suite',
    imageUrl: 'https://placehold.co/400x200/0ea5e9/ffffff?text=MarketMuse',
    link: 'https://www.marketmuse.com/',
  },
  {
    title: 'Semrush',
    description: '一个全面的数字营销工具套件，其功能（如关键词研究、内容模板）可以极大地支持GEO策略的制定和执行。',
    category: 'keyword-research',
    imageUrl: 'https://placehold.co/400x200/f97316/ffffff?text=Semrush',
    link: 'https://www.semrush.com/',
  },
  {
    title: 'Ahrefs',
    description: '强大的SEO工具集，提供全面的关键词研究、竞争对手分析和内容探索功能，是任何GEO策略的基础。',
    category: 'keyword-research',
    imageUrl: 'https://placehold.co/400x200/14b8a6/ffffff?text=Ahrefs',
    link: 'https://ahrefs.com/',
  },
  {
    title: 'AthenaHQ',
    description: '专为GEO设计的平台，帮助企业了解其品牌在ChatGPT、Perplexity等生成式引擎中的表现，并提供可行的见解。',
    category: 'visibility-monitoring',
    imageUrl: 'https://placehold.co/400x200/8b5cf6/ffffff?text=AthenaHQ',
    link: 'https://www.athenahq.ai/',
  },
  {
    title: 'Copy.ai',
    description: '利用先进的AI模型，帮助用户在几秒钟内生成各种类型的营销文案和内容，是快速内容创作的理想选择。',
    category: 'content-generation',
    imageUrl: 'https://placehold.co/400x200/ef4444/ffffff?text=Copy.ai',
    link: 'https://www.copy.ai/',
  },
  {
    title: 'Clearscope',
    description: '一款优秀的内容优化工具，通过分析顶级搜索结果，为您的内容提供详细的术语和主题建议，以提高相关性。',
    category: 'content-optimization',
    imageUrl: 'https://placehold.co/400x200/f59e0b/ffffff?text=Clearscope',
    link: 'https://www.clearscope.io/',
  },
  {
    title: 'Mangools AI Search Grader',
    description: '一个免费的GEO工具，用于评估您的品牌在多个AI搜索引擎（如ChatGPT, Gemini）中的可见性和表现。',
    category: 'visibility-monitoring',
    imageUrl: 'https://placehold.co/400x200/3b82f6/ffffff?text=Mangools',
    link: 'https://mangools.com/ai-search-grader',
  },
   {
    title: 'Profound',
    description: '一个专注于GEO的平台，帮助品牌监控和提升在AI问答引擎中的可见度，确保品牌信息被准确引用。',
    category: 'geo-suite',
    imageUrl: 'https://placehold.co/400x200/10b981/ffffff?text=Profound',
    link: '#', // 实际链接待定
  },
];

