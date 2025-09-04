// ===========================================
// 🚀 扩展的GEO工具管理系统
// ===========================================

// ===========================================
// 1. 扩展的工具配置系统
// ===========================================

// 📁 src/types/toolTypes.ts - 完整的类型定义
export interface ToolConfig {
  // 基础信息
  id: string;
  name: string;
  displayName?: string;          // 显示名称（可能与name不同）
  company?: string;              // 开发公司
  website: string;
  
  // 分类和标签
  category: ToolCategory;
  subcategory?: string;          // 子分类
  tags: string[];               // 标签系统
  
  // 视觉和品牌
  logo?: string;
  banner?: string;
  brandColor: string;           // 品牌主色
  isDarkTheme?: boolean;        // 是否为深色主题
  
  // 功能特性
  description: string;          // 简短描述
  features: string[];           // 主要功能列表
  useCases: string[];          // 使用场景
  
  // 商业信息
  pricing: PricingInfo;
  freeTrialAvailable?: boolean;
  freePlanAvailable?: boolean;
  
  // 技术信息
  integrations?: string[];      // 集成支持
  apiAvailable?: boolean;       // 是否提供API
  platforms: Platform[];       // 支持平台
  
  // GEO特性
  geoCapabilities: GEOCapability[];
  searchEngineSupport: SearchEngine[];
  
  // 元数据
  launchDate?: string;
  lastUpdated?: string;
  popularity?: number;          // 受欢迎程度 (1-10)
  complexity?: 'beginner' | 'intermediate' | 'advanced';
  
  // 状态
  status: 'active' | 'beta' | 'discontinued' | 'coming-soon';
  featured?: boolean;           // 是否为推荐工具
}

// 工具分类枚举 - 大幅扩展
export enum ToolCategory {
  // 核心GEO
  GEO_SUITE = 'geo-suite',
  GEO_MONITORING = 'geo-monitoring',
  GEO_ANALYTICS = 'geo-analytics',
  
  // 内容相关
  CONTENT_GENERATION = 'content-generation',
  CONTENT_OPTIMIZATION = 'content-optimization',
  CONTENT_PLANNING = 'content-planning',
  CONTENT_RESEARCH = 'content-research',
  
  // 搜索和关键词
  KEYWORD_RESEARCH = 'keyword-research',
  SEARCH_INTELLIGENCE = 'search-intelligence',
  COMPETITOR_ANALYSIS = 'competitor-analysis',
  
  // AI模型和接口
  AI_MODELS = 'ai-models',
  AI_APIS = 'ai-apis',
  PROMPT_ENGINEERING = 'prompt-engineering',
  
  // 品牌和监控
  BRAND_MONITORING = 'brand-monitoring',
  REPUTATION_MANAGEMENT = 'reputation-management',
  SOCIAL_LISTENING = 'social-listening',
  
  // 技术和开发
  SCHEMA_MARKUP = 'schema-markup',
  TECHNICAL_SEO = 'technical-seo',
  AUTOMATION = 'automation',
  
  // 分析和报告
  ANALYTICS = 'analytics',
  REPORTING = 'reporting',
  DATA_VISUALIZATION = 'data-visualization',
  
  // 新兴领域
  VOICE_SEARCH = 'voice-search',
  LOCAL_SEO = 'local-seo',
  ECOMMERCE_SEO = 'ecommerce-seo',
}

// 定价信息
export interface PricingInfo {
  type: 'free' | 'freemium' | 'paid' | 'enterprise' | 'custom';
  startingPrice?: number;
  currency?: string;
  billingCycle?: 'monthly' | 'annually' | 'one-time';
  priceRange?: string;         // 如 "$29-299/month"
}

// GEO能力
export enum GEOCapability {
  CONTENT_OPTIMIZATION = 'content-optimization',
  ANSWER_ENGINE_OPTIMIZATION = 'answer-engine-optimization',
  SNIPPET_OPTIMIZATION = 'snippet-optimization',
  ENTITY_OPTIMIZATION = 'entity-optimization',
  CONVERSATIONAL_SEARCH = 'conversational-search',
  AI_OVERVIEW_OPTIMIZATION = 'ai-overview-optimization',
  KNOWLEDGE_GRAPH = 'knowledge-graph',
  STRUCTURED_DATA = 'structured-data',
}

// 支持的搜索引擎/AI
export enum SearchEngine {
  GOOGLE = 'google',
  BING = 'bing',
  CHATGPT = 'chatgpt',
  CLAUDE = 'claude',
  PERPLEXITY = 'perplexity',
  BARD = 'bard',
  COPILOT = 'copilot',
  GEMINI = 'gemini',
}

// 支持平台
export enum Platform {
  WEB = 'web',
  MOBILE = 'mobile',
  DESKTOP = 'desktop',
  API = 'api',
  CHROME_EXTENSION = 'chrome-extension',
  WORDPRESS = 'wordpress',
}

