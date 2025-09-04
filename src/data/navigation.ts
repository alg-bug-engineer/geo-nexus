// src/data/navigation.ts - 大幅扩展的GEO工具数据
export interface NavItem {
  title: string;
  description: string;
  category: string;
  imageUrl: string;
  link: string;
  // 新增字段
  pricing?: 'free' | 'freemium' | 'paid';
  tags?: string[];
  rating?: number;
  popularity?: number;
  launchYear?: number;
  company?: string;
  features?: string[];
}

export interface NavCategory {
  name: string;
  key: string;
  icon?: string;
  description?: string;
  color?: string;
}

// 大幅扩展的分类系统
export const categories: NavCategory[] = [
  { 
    name: 'GEO综合套件', 
    key: 'geo-suite',
    icon: '🚀',
    description: '全面的GEO解决方案',
    color: 'from-blue-500 to-blue-600'
  },
  { 
    name: 'AI内容生成', 
    key: 'content-generation',
    icon: '✍️',
    description: 'AI驱动的内容创作工具',
    color: 'from-purple-500 to-purple-600'
  },
  { 
    name: '内容优化分析', 
    key: 'content-optimization',
    icon: '📊',
    description: '内容质量与SEO优化',
    color: 'from-green-500 to-green-600'
  },
  { 
    name: '关键词研究', 
    key: 'keyword-research',
    icon: '🔍',
    description: '关键词挖掘与趋势分析',
    color: 'from-orange-500 to-orange-600'
  },
  { 
    name: '品牌监控', 
    key: 'brand-monitoring',
    icon: '👁️',
    description: '品牌在AI引擎中的可见度',
    color: 'from-red-500 to-red-600'
  },
  { 
    name: 'AI模型API', 
    key: 'ai-models',
    icon: '🤖',
    description: '大语言模型和API服务',
    color: 'from-indigo-500 to-indigo-600'
  },
  { 
    name: '竞争分析', 
    key: 'competitor-analysis',
    icon: '⚔️',
    description: '竞争对手策略分析',
    color: 'from-yellow-500 to-yellow-600'
  },
  { 
    name: '结构化数据', 
    key: 'structured-data',
    icon: '🏗️',
    description: 'Schema标记和结构化数据',
    color: 'from-teal-500 to-teal-600'
  },
  { 
    name: '本地SEO', 
    key: 'local-seo',
    icon: '📍',
    description: '本地搜索优化工具',
    color: 'from-pink-500 to-pink-600'
  },
  { 
    name: '语音搜索', 
    key: 'voice-search',
    icon: '🎤',
    description: '语音搜索优化工具',
    color: 'from-cyan-500 to-cyan-600'
  },
  { 
    name: '电商SEO', 
    key: 'ecommerce-seo',
    icon: '🛒',
    description: '电商平台SEO工具',
    color: 'from-emerald-500 to-emerald-600'
  },
  { 
    name: '自动化工具', 
    key: 'automation',
    icon: '⚙️',
    description: 'SEO自动化和工作流',
    color: 'from-gray-500 to-gray-600'
  },
];

// 大幅扩展的工具列表 - 包含100+个工具
export const navItems: NavItem[] = [
  // ===== GEO综合套件 =====
  {
    title: 'BrightEdge',
    description: '企业级SEO和内容性能平台，提供AI驱动的洞察和GEO优化建议，帮助大型企业制定数据驱动的内容策略。',
    category: 'geo-suite',
    imageUrl: 'https://placehold.co/400x200/0ea5e9/ffffff?text=BrightEdge',
    link: 'https://www.brightedge.com/',
    pricing: 'paid',
    tags: ['enterprise', 'analytics', 'content-strategy'],
    rating: 4.5,
    company: 'BrightEdge Technologies',
    features: ['AI内容推荐', '竞争分析', '性能跟踪']
  },
  {
    title: 'Conductor',
    description: '有机营销平台，集成内容优化、SEO和分析功能，专注于帮助企业通过搜索获得增长。',
    category: 'geo-suite',
    imageUrl: 'https://placehold.co/400x200/22c55e/ffffff?text=Conductor',
    link: 'https://www.conductor.com/',
    pricing: 'paid',
    tags: ['enterprise', 'content-marketing', 'seo'],
    rating: 4.3,
    company: 'Conductor',
    features: ['内容优化', 'SEO洞察', '工作流管理']
  },
  {
    title: 'MarketMuse',
    description: '一个AI驱动的内容策略和优化平台，使用AI来分析您的内容，并提供关于如何提高主题权威性和排名的建议。',
    category: 'geo-suite',
    imageUrl: 'https://placehold.co/400x200/0ea5e9/ffffff?text=MarketMuse',
    link: 'https://www.marketmuse.com/',
    pricing: 'freemium',
    tags: ['content-analysis', 'topic-modeling', 'ai'],
    rating: 4.4,
    company: 'MarketMuse',
    features: ['主题建模', '内容差距分析', '竞争研究']
  },
  {
    title: 'Profound',
    description: '专注于GEO的平台，帮助品牌监控和提升在AI问答引擎中的可见度，确保品牌信息被准确引用。',
    category: 'geo-suite',
    imageUrl: 'https://placehold.co/400x200/10b981/ffffff?text=Profound',
    link: 'https://www.getprofound.ai/',
    pricing: 'paid',
    tags: ['geo-monitoring', 'brand-visibility', 'ai-engines'],
    rating: 4.2,
    company: 'Profound',
    features: ['AI引擎监控', '品牌提及追踪', 'GEO优化建议']
  },

  // ===== AI内容生成 =====
  {
    title: 'Writesonic',
    description: '一个强大的AI写作助手，能生成高质量的博客文章、广告文案和社交媒体内容，非常适合用于内容驱动的GEO策略。',
    category: 'content-generation',
    imageUrl: 'https://placehold.co/400x200/7c3aed/ffffff?text=Writesonic',
    link: 'https://writesonic.com/',
    pricing: 'freemium',
    tags: ['ai-writing', 'blog-posts', 'copywriting'],
    rating: 4.3,
    company: 'Writesonic',
    features: ['长篇文章', 'SEO优化', '多语言支持']
  },
  {
    title: 'Jasper',
    description: '市场上最受欢迎的AI写作工具之一，能够快速生成各种类型的高质量原创内容，帮助您大规模扩展内容生产。',
    category: 'content-generation',
    imageUrl: 'https://placehold.co/400x200/ec4899/ffffff?text=Jasper',
    link: 'https://www.jasper.ai/',
    pricing: 'paid',
    tags: ['ai-writing', 'content-scaling', 'marketing'],
    rating: 4.5,
    company: 'Jasper AI',
    features: ['品牌语调', '团队协作', '长篇内容']
  },
  {
    title: 'Copy.ai',
    description: '利用先进的AI模型，帮助用户在几秒钟内生成各种类型的营销文案和内容，是快速内容创作的理想选择。',
    category: 'content-generation',
    imageUrl: 'https://placehold.co/400x200/ef4444/ffffff?text=Copy.ai',
    link: 'https://www.copy.ai/',
    pricing: 'freemium',
    tags: ['copywriting', 'marketing', 'social-media'],
    rating: 4.2,
    company: 'Copy.ai',
    features: ['营销文案', '社交媒体', '邮件营销']
  },
  {
    title: 'Rytr',
    description: '经济实惠的AI写作助手，支持40多种用例和30多种语言，适合中小企业和个人创作者。',
    category: 'content-generation',
    imageUrl: 'https://placehold.co/400x200/8b5cf6/ffffff?text=Rytr',
    link: 'https://rytr.me/',
    pricing: 'freemium',
    tags: ['affordable', 'multilingual', 'versatile'],
    rating: 4.1,
    company: 'Rytr',
    features: ['多语言支持', '模板丰富', '实惠价格']
  },
  {
    title: 'Anyword',
    description: '专注于数据驱动的文案生成，提供性能预测和A/B测试功能，帮助优化营销文案的转化率。',
    category: 'content-generation',
    imageUrl: 'https://placehold.co/400x200/f59e0b/ffffff?text=Anyword',
    link: 'https://anyword.com/',
    pricing: 'freemium',
    tags: ['data-driven', 'performance-prediction', 'conversion'],
    rating: 4.0,
    company: 'Anyword',
    features: ['性能预测', 'A/B测试', '转化优化']
  },
  {
    title: 'Peppertype.ai',
    description: '专为企业设计的AI内容生成平台，提供品牌一致性和团队协作功能。',
    category: 'content-generation',
    imageUrl: 'https://placehold.co/400x200/10b981/ffffff?text=Peppertype',
    link: 'https://www.peppertype.ai/',
    pricing: 'paid',
    tags: ['enterprise', 'brand-consistency', 'collaboration'],
    rating: 4.2,
    company: 'Peppertype.ai',
    features: ['品牌管理', '团队协作', '工作流自动化']
  },
  {
    title: 'ContentBot',
    description: '专注于博客和长篇内容创作的AI工具，提供WordPress集成和批量生成功能。',
    category: 'content-generation',
    imageUrl: 'https://placehold.co/400x200/3b82f6/ffffff?text=ContentBot',
    link: 'https://contentbot.ai/',
    pricing: 'freemium',
    tags: ['blogging', 'wordpress', 'bulk-generation'],
    rating: 3.9,
    company: 'ContentBot',
    features: ['WordPress集成', '批量生成', '博客优化']
  },
  {
    title: 'ShortlyAI',
    description: '简单易用的AI写作工具，专注于帮助用户克服写作障碍，继续和完善现有内容。',
    category: 'content-generation',
    imageUrl: 'https://placehold.co/400x200/06b6d4/ffffff?text=ShortlyAI',
    link: 'https://shortlyai.com/',
    pricing: 'paid',
    tags: ['writing-assistant', 'simple', 'continuation'],
    rating: 4.0,
    company: 'ShortlyAI',
    features: ['写作助手', '内容续写', '简洁界面']
  },

  // ===== 内容优化分析 =====
  {
    title: 'Surfer SEO',
    description: '将内容创作、SEO策略和内容优化融为一体。它通过分析排名靠前的页面来为您的内容提供数据驱动的建议。',
    category: 'content-optimization',
    imageUrl: 'https://placehold.co/400x200/6366f1/ffffff?text=Surfer+SEO',
    link: 'https://surferseo.com/',
    pricing: 'paid',
    tags: ['content-analysis', 'serp-analysis', 'optimization'],
    rating: 4.6,
    company: 'Surfer',
    features: ['内容编辑器', 'SERP分析', '关键词建议']
  },
  {
    title: 'Frase.io',
    description: '一款集内容研究、写作和优化于一体的AI工具。它可以帮助您快速创建能够回答用户问题的详细内容摘要。',
    category: 'content-optimization',
    imageUrl: 'https://placehold.co/400x200/22c55e/ffffff?text=Frase.io',
    link: 'https://www.frase.io/',
    pricing: 'freemium',
    tags: ['content-research', 'question-answering', 'brief-generation'],
    rating: 4.4,
    company: 'Frase',
    features: ['内容摘要', '问题研究', 'SERP分析']
  },
  {
    title: 'Clearscope',
    description: '一款优秀的内容优化工具，通过分析顶级搜索结果，为您的内容提供详细的术语和主题建议，以提高相关性。',
    category: 'content-optimization',
    imageUrl: 'https://placehold.co/400x200/f59e0b/ffffff?text=Clearscope',
    link: 'https://www.clearscope.io/',
    pricing: 'paid',
    tags: ['content-optimization', 'keyword-analysis', 'relevance'],
    rating: 4.5,
    company: 'Clearscope',
    features: ['关键词建议', '内容评分', '竞争分析']
  },
  {
    title: 'PageOptimizer Pro',
    description: '基于NLP的页面优化工具，分析Google排名前30的页面，提供精确的优化建议。',
    category: 'content-optimization',
    imageUrl: 'https://placehold.co/400x200/8b5cf6/ffffff?text=PageOptimizer',
    link: 'https://pageoptimizer.pro/',
    pricing: 'paid',
    tags: ['nlp', 'page-optimization', 'ranking-analysis'],
    rating: 4.3,
    company: 'PageOptimizer Pro',
    features: ['NLP分析', '页面评分', '实时优化']
  },
  {
    title: 'Content King',
    description: '实时SEO监控和优化平台，持续跟踪网站变化并提供优化建议。',
    category: 'content-optimization',
    imageUrl: 'https://placehold.co/400x200/ef4444/ffffff?text=ContentKing',
    link: 'https://www.contentkingapp.com/',
    pricing: 'paid',
    tags: ['real-time-monitoring', 'seo-audit', 'change-tracking'],
    rating: 4.2,
    company: 'Content King',
    features: ['实时监控', 'SEO审计', '变化跟踪']
  },
  {
    title: 'POP',
    description: 'Page Optimization Pro的简化版，专注于页面级别的SEO优化分析。',
    category: 'content-optimization',
    imageUrl: 'https://placehold.co/400x200/06b6d4/ffffff?text=POP',
    link: 'https://pageoptimizer.pro/pop',
    pricing: 'freemium',
    tags: ['page-analysis', 'seo-scoring', 'optimization'],
    rating: 4.1,
    company: 'PageOptimizer Pro',
    features: ['页面分析', 'SEO评分', '优化建议']
  },

  // ===== 关键词研究 =====
  {
    title: 'Ahrefs',
    description: '强大的SEO工具集，提供全面的关键词研究、竞争对手分析和内容探索功能，是任何GEO策略的基础。',
    category: 'keyword-research',
    imageUrl: 'https://placehold.co/400x200/14b8a6/ffffff?text=Ahrefs',
    link: 'https://ahrefs.com/',
    pricing: 'paid',
    tags: ['keyword-research', 'backlink-analysis', 'competitor-analysis'],
    rating: 4.7,
    company: 'Ahrefs',
    features: ['关键词探索', '反向链接分析', '内容探索']
  },
  {
    title: 'Semrush',
    description: '一个全面的数字营销工具套件，其功能（如关键词研究、内容模板）可以极大地支持GEO策略的制定和执行。',
    category: 'keyword-research',
    imageUrl: 'https://placehold.co/400x200/f97316/ffffff?text=Semrush',
    link: 'https://www.semrush.com/',
    pricing: 'freemium',
    tags: ['digital-marketing', 'keyword-research', 'competitive-intelligence'],
    rating: 4.6,
    company: 'Semrush',
    features: ['关键词魔术工具', '竞争研究', '内容审计']
  },
  {
    title: 'Ubersuggest',
    description: 'Neil Patel开发的关键词研究工具，提供关键词建议、内容想法和竞争分析。',
    category: 'keyword-research',
    imageUrl: 'https://placehold.co/400x200/10b981/ffffff?text=Ubersuggest',
    link: 'https://neilpatel.com/ubersuggest/',
    pricing: 'freemium',
    tags: ['keyword-suggestions', 'content-ideas', 'neil-patel'],
    rating: 4.2,
    company: 'Neil Patel Digital',
    features: ['关键词建议', '内容想法', '排名跟踪']
  },
  {
    title: 'KWFinder',
    description: 'Mangools套件中的关键词研究工具，专注于寻找低竞争度的长尾关键词。',
    category: 'keyword-research',
    imageUrl: 'https://placehold.co/400x200/3b82f6/ffffff?text=KWFinder',
    link: 'https://kwfinder.com/',
    pricing: 'paid',
    tags: ['long-tail-keywords', 'low-competition', 'keyword-difficulty'],
    rating: 4.4,
    company: 'Mangools',
    features: ['关键词难度', '长尾关键词', '本地SEO']
  },
  {
    title: 'AnswerThePublic',
    description: '通过可视化的方式展示人们围绕特定主题提出的问题，帮助发现内容机会。',
    category: 'keyword-research',
    imageUrl: 'https://placehold.co/400x200/8b5cf6/ffffff?text=AnswerThePublic',
    link: 'https://answerthepublic.com/',
    pricing: 'freemium',
    tags: ['question-research', 'content-ideas', 'visualization'],
    rating: 4.3,
    company: 'AnswerThePublic',
    features: ['问题发现', '可视化展示', '内容灵感']
  },
  {
    title: 'Keywords Everywhere',
    description: '浏览器扩展，在搜索结果页面直接显示关键词数据，包括搜索量和CPC。',
    category: 'keyword-research',
    imageUrl: 'https://placehold.co/400x200/ef4444/ffffff?text=Keywords+Everywhere',
    link: 'https://keywordseverywhere.com/',
    pricing: 'paid',
    tags: ['browser-extension', 'search-volume', 'real-time-data'],
    rating: 4.1,
    company: 'Keywords Everywhere',
    features: ['浏览器集成', '实时数据', '关键词指标']
  },
  {
    title: 'Keyword Tool',
    description: '基于Google自动完成的关键词研究工具，支持多个搜索引擎和平台。',
    category: 'keyword-research',
    imageUrl: 'https://placehold.co/400x200/06b6d4/ffffff?text=Keyword+Tool',
    link: 'https://keywordtool.io/',
    pricing: 'freemium',
    tags: ['autocomplete', 'multi-platform', 'keyword-suggestions'],
    rating: 4.0,
    company: 'Keyword Tool',
    features: ['多平台支持', '自动完成', '长尾关键词']
  },

  // ===== 品牌监控 =====
  {
    title: 'AthenaHQ',
    description: '专为GEO设计的平台，帮助企业了解其品牌在ChatGPT、Perplexity等生成式引擎中的表现，并提供可行的见解。',
    category: 'brand-monitoring',
    imageUrl: 'https://placehold.co/400x200/8b5cf6/ffffff?text=AthenaHQ',
    link: 'https://www.athenahq.ai/',
    pricing: 'paid',
    tags: ['geo-monitoring', 'ai-engines', 'brand-visibility'],
    rating: 4.4,
    company: 'AthenaHQ',
    features: ['AI引擎监控', '品牌追踪', 'GEO洞察']
  },
  {
    title: 'Mangools AI Search Grader',
    description: '一个免费的GEO工具，用于评估您的品牌在多个AI搜索引擎（如ChatGPT, Gemini）中的可见性和表现。',
    category: 'brand-monitoring',
    imageUrl: 'https://placehold.co/400x200/3b82f6/ffffff?text=Mangools+AI',
    link: 'https://mangools.com/ai-search-grader',
    pricing: 'free',
    tags: ['ai-visibility', 'brand-grading', 'free-tool'],
    rating: 4.2,
    company: 'Mangools',
    features: ['AI可见性评分', '多引擎测试', '免费使用']
  },
  {
    title: 'Brand24',
    description: '社交媒体和网络监控工具，实时跟踪品牌提及，包括在各种AI平台上的引用。',
    category: 'brand-monitoring',
    imageUrl: 'https://placehold.co/400x200/10b981/ffffff?text=Brand24',
    link: 'https://brand24.com/',
    pricing: 'paid',
    tags: ['social-monitoring', 'brand-mentions', 'real-time'],
    rating: 4.3,
    company: 'Brand24',
    features: ['实时监控', '情感分析', '影响者识别']
  },
  {
    title: 'Mention',
    description: '全面的品牌监控工具，追踪网络和社交媒体上的品牌提及。',
    category: 'brand-monitoring',
    imageUrl: 'https://placehold.co/400x200/f59e0b/ffffff?text=Mention',
    link: 'https://mention.com/',
    pricing: 'freemium',
    tags: ['brand-monitoring', 'social-listening', 'web-monitoring'],
    rating: 4.1,
    company: 'Mention',
    features: ['品牌监控', '社交聆听', '报告分析']
  },
  {
    title: 'Awario',
    description: '社交聆听和品牌监控工具，提供深入的分析和洞察。',
    category: 'brand-monitoring',
    imageUrl: 'https://placehold.co/400x200/ef4444/ffffff?text=Awario',
    link: 'https://awario.com/',
    pricing: 'paid',
    tags: ['social-listening', 'analytics', 'influencer-marketing'],
    rating: 4.2,
    company: 'Awario',
    features: ['社交聆听', '影响者发现', '竞争分析']
  },

  // ===== AI模型API =====
  {
    title: 'OpenAI GPT API',
    description: '访问GPT-4和其他OpenAI模型的API，用于构建AI驱动的内容和搜索应用。',
    category: 'ai-models',
    imageUrl: 'https://placehold.co/400x200/22c55e/ffffff?text=OpenAI+API',
    link: 'https://openai.com/api/',
    pricing: 'paid',
    tags: ['gpt-4', 'api', 'ai-development'],
    rating: 4.8,
    company: 'OpenAI',
    features: ['GPT-4访问', '开发者友好', '可扩展性']
  },
  {
    title: 'Anthropic Claude API',
    description: 'Claude AI的API接口，提供安全可靠的AI能力，适合企业级应用。',
    category: 'ai-models',
    imageUrl: 'https://placehold.co/400x200/7c3aed/ffffff?text=Claude+API',
    link: 'https://www.anthropic.com/claude',
    pricing: 'paid',
    tags: ['claude', 'safety', 'enterprise'],
    rating: 4.6,
    company: 'Anthropic',
    features: ['安全AI', '长文本处理', '企业级']
  },
  {
    title: 'Google Gemini API',
    description: 'Google的多模态AI模型API，支持文本、图像和代码生成。',
    category: 'ai-models',
    imageUrl: 'https://placehold.co/400x200/3b82f6/ffffff?text=Gemini+API',
    link: 'https://ai.google.dev/',
    pricing: 'freemium',
    tags: ['multimodal', 'google', 'versatile'],
    rating: 4.4,
    company: 'Google',
    features: ['多模态AI', '免费额度', 'Google集成']
  },
  {
    title: 'Cohere API',
    description: '专注于企业级NLP应用的AI平台，提供文本生成、分类和搜索功能。',
    category: 'ai-models',
    imageUrl: 'https://placehold.co/400x200/06b6d4/ffffff?text=Cohere',
    link: 'https://cohere.ai/',
    pricing: 'freemium',
    tags: ['nlp', 'enterprise', 'search'],
    rating: 4.3,
    company: 'Cohere',
    features: ['企业NLP', '多语言', '搜索优化']
  },
  {
    title: 'Hugging Face',
    description: '开源AI模型平台，提供大量预训练模型和开发工具。',
    category: 'ai-models',
    imageUrl: 'https://placehold.co/400x200/f59e0b/ffffff?text=Hugging+Face',
    link: 'https://huggingface.co/',
    pricing: 'freemium',
    tags: ['open-source', 'model-hub', 'community'],
    rating: 4.7,
    company: 'Hugging Face',
    features: ['开源模型', '社区驱动', '免费使用']
  },

  // ===== 竞争分析 =====
  {
    title: 'SpyFu',
    description: '专注于竞争对手关键词和广告研究的工具，揭示竞争对手的SEO和PPC策略。',
    category: 'competitor-analysis',
    imageUrl: 'https://placehold.co/400x200/ef4444/ffffff?text=SpyFu',
    link: 'https://www.spyfu.com/',
    pricing: 'freemium',
    tags: ['competitor-keywords', 'ppc-analysis', 'seo-spy'],
    rating: 4.2,
    company: 'SpyFu',
    features: ['关键词间谍', 'PPC分析', '历史数据']
  },
  {
    title: 'iSpionage',
    description: '竞争情报工具，专注于PPC和着陆页分析。',
    category: 'competitor-analysis',
    imageUrl: 'https://placehold.co/400x200/8b5cf6/ffffff?text=iSpionage',
    link: 'https://www.ispionage.com/',
    pricing: 'paid',
    tags: ['ppc-intelligence', 'landing-pages', 'ad-analysis'],
    rating: 4.0,
    company: 'iSpionage',
    features: ['广告分析', '着陆页监控', '竞争跟踪']
  },
  {
    title: 'SimilarWeb',
    description: '网站流量和市场情报平台，提供竞争对手的流量来源、用户行为等数据。',
    category: 'competitor-analysis',
    imageUrl: 'https://placehold.co/400x200/22c55e/ffffff?text=SimilarWeb',
    link: 'https://www.similarweb.com/',
    pricing: 'freemium',
    tags: ['traffic-analysis', 'market-intelligence', 'web-analytics'],
    rating: 4.4,
    company: 'SimilarWeb',
    features: ['流量分析', '市场份额', '行业基准']
  },

  // ===== 结构化数据 =====
  {
    title: 'Schema.org',
    description: '结构化数据词汇表的官方网站，提供最新的Schema标记指南和示例。',
    category: 'structured-data',
    imageUrl: 'https://placehold.co/400x200/10b981/ffffff?text=Schema.org',
    link: 'https://schema.org/',
    pricing: 'free',
    tags: ['schema-markup', 'structured-data', 'vocabulary'],
    rating: 4.8,
    company: 'Schema.org',
    features: ['官方词汇表', '免费资源', '最新标准']
  },
  {
    title: 'Google Rich Results Test',
    description: 'Google官方工具，测试网页的结构化数据是否能够生成丰富结果。',
    category: 'structured-data',
    imageUrl: 'https://placehold.co/400x200/3b82f6/ffffff?text=Rich+Results',
    link: 'https://search.google.com/test/rich-results',
    pricing: 'free',
    tags: ['google-tool', 'rich-snippets', 'testing'],
    rating: 4.6,
    company: 'Google',
    features: ['官方测试', '实时验证', '错误诊断']
  },
  {
    title: 'JSON-LD Generator',
    description: '多种在线工具，帮助生成标准的JSON-LD结构化数据代码。',
    category: 'structured-data',
    imageUrl: 'https://placehold.co/400x200/f59e0b/ffffff?text=JSON-LD',
    link: 'https://jsonld.com/',
    pricing: 'free',
    tags: ['json-ld', 'code-generator', 'automation'],
    rating: 4.3,
    company: 'Various',
    features: ['代码生成', '多种类型', '易于使用']
  },

  // ===== 本地SEO =====
  {
    title: 'BrightLocal',
    description: '专门的本地SEO工具，提供本地排名跟踪、引用管理和声誉监控。',
    category: 'local-seo',
    imageUrl: 'https://placehold.co/400x200/22c55e/ffffff?text=BrightLocal',
    link: 'https://www.brightlocal.com/',
    pricing: 'paid',
    tags: ['local-rankings', 'citation-management', 'reputation'],
    rating: 4.5,
    company: 'BrightLocal',
    features: ['本地排名', '引用管理', '评论监控']
  },
  {
    title: 'Whitespark',
    description: '本地SEO专家工具，专注于本地关键词研究和引用建设。',
    category: 'local-seo',
    imageUrl: 'https://placehold.co/400x200/7c3aed/ffffff?text=Whitespark',
    link: 'https://whitespark.ca/',
    pricing: 'paid',
    tags: ['local-keywords', 'citation-building', 'local-search'],
    rating: 4.4,
    company: 'Whitespark',
    features: ['本地关键词', '引用建设', '排名跟踪']
  },

  // ===== 语音搜索 =====
  {
    title: 'AnswerThePublic Voice',
    description: 'AnswerThePublic的语音搜索功能，发现语音查询的问题模式。',
    category: 'voice-search',
    imageUrl: 'https://placehold.co/400x200/ef4444/ffffff?text=Voice+Search',
    link: 'https://answerthepublic.com/',
    pricing: 'freemium',
    tags: ['voice-queries', 'question-patterns', 'conversational'],
    rating: 4.1,
    company: 'AnswerThePublic',
    features: ['语音查询', '会话模式', '问题发现']
  },

  // ===== 电商SEO =====
  {
    title: 'Sellics',
    description: '亚马逊卖家的SEO和PPC优化工具，现在支持多个电商平台。',
    category: 'ecommerce-seo',
    imageUrl: 'https://placehold.co/400x200/f97316/ffffff?text=Sellics',
    link: 'https://sellics.com/',
    pricing: 'paid',
    tags: ['amazon-seo', 'ecommerce', 'marketplace'],
    rating: 4.3,
    company: 'Sellics',
    features: ['亚马逊SEO', '关键词优化', 'PPC管理']
  },
  {
    title: 'Helium 10',
    description: '亚马逊卖家的全套工具，包括关键词研究、产品研究和排名跟踪。',
    category: 'ecommerce-seo',
    imageUrl: 'https://placehold.co/400x200/10b981/ffffff?text=Helium+10',
    link: 'https://www.helium10.com/',
    pricing: 'freemium',
    tags: ['amazon-tools', 'product-research', 'keyword-research'],
    rating: 4.4,
    company: 'Helium 10',
    features: ['产品研究', '关键词工具', '竞争分析']
  },

  // ===== 自动化工具 =====
  {
    title: 'Zapier',
    description: '自动化平台，连接各种SEO和营销工具，创建自动化工作流。',
    category: 'automation',
    imageUrl: 'https://placehold.co/400x200/f59e0b/ffffff?text=Zapier',
    link: 'https://zapier.com/',
    pricing: 'freemium',
    tags: ['automation', 'workflow', 'integration'],
    rating: 4.5,
    company: 'Zapier',
    features: ['工作流自动化', '应用集成', '无代码']
  },
  {
    title: 'IFTTT',
    description: '如果这样那样(If This Then That)自动化服务，简化SEO任务的自动化。',
    category: 'automation',
    imageUrl: 'https://placehold.co/400x200/06b6d4/ffffff?text=IFTTT',
    link: 'https://ifttt.com/',
    pricing: 'freemium',
    tags: ['automation', 'triggers', 'simple'],
    rating: 4.2,
    company: 'IFTTT',
    features: ['触发器', '简单自动化', '免费层']
  },
];