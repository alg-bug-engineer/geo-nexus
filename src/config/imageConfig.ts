// ===========================================
// 1. 目录结构设计
// ===========================================

/*
项目目录结构：
src/
├── images/
│   ├── tools/
│   │   ├── logos/           # 工具Logo (方形，用于小图标)
│   │   │   ├── writesonic.png
│   │   │   ├── jasper.png
│   │   │   └── ...
│   │   ├── banners/         # 工具横幅 (16:9 或 2:1，用于卡片)
│   │   │   ├── writesonic.webp
│   │   │   ├── jasper.webp
│   │   │   └── ...
│   │   ├── screenshots/     # 工具截图 (用于详情页)
│   │   │   ├── writesonic/
│   │   │   ├── jasper/
│   │   │   └── ...
│   │   └── default/         # 默认图片
│   │       ├── geo-suite.webp
│   │       ├── content-generation.webp
│   │       ├── content-optimization.webp
│   │       ├── keyword-research.webp
│   │       ├── visibility-monitoring.webp
│   │       └── fallback.webp
│   ├── categories/          # 分类图标
│   ├── ui/                  # UI相关图片
│   └── brand/               # 品牌相关图片
*/

// ===========================================
// 2. 图片映射配置系统
// ===========================================

// src/config/imageConfig.ts
export interface ToolImageConfig {
  id: string;
  name: string;
  logo?: string;           // Logo图片路径
  banner?: string;         // 横幅图片路径
  category: string;
  hasScreenshots?: boolean;
  fallbackColor?: string;  // 备用颜色
}

// 工具图片配置数据
export const TOOL_IMAGE_CONFIGS: ToolImageConfig[] = [
  {
    id: 'writesonic',
    name: 'Writesonic',
    logo: '/images/tools/logos/writesonic.png',
    banner: '/images/tools/banners/writesonic.webp',
    category: 'content-generation',
    hasScreenshots: true,
    fallbackColor: '#7c3aed'
  },
  {
    id: 'jasper',
    name: 'Jasper',
    logo: '/images/tools/logos/jasper.png',
    banner: '/images/tools/banners/jasper.webp',
    category: 'content-generation',
    hasScreenshots: true,
    fallbackColor: '#ec4899'
  },
  {
    id: 'surfer-seo',
    name: 'Surfer SEO',
    logo: '/images/tools/logos/surfer-seo.png',
    banner: '/images/tools/banners/surfer-seo.webp',
    category: 'content-optimization',
    hasScreenshots: true,
    fallbackColor: '#6366f1'
  },
  {
    id: 'frase',
    name: 'Frase.io',
    logo: '/images/tools/logos/frase.png',
    banner: '/images/tools/banners/frase.webp',
    category: 'content-optimization',
    hasScreenshots: true,
    fallbackColor: '#22c55e'
  },
  {
    id: 'marketmuse',
    name: 'MarketMuse',
    logo: '/images/tools/logos/marketmuse.png',
    banner: '/images/tools/banners/marketmuse.webp',
    category: 'geo-suite',
    hasScreenshots: true,
    fallbackColor: '#0ea5e9'
  },
  {
    id: 'semrush',
    name: 'Semrush',
    logo: '/images/tools/logos/semrush.png',
    banner: '/images/tools/banners/semrush.webp',
    category: 'keyword-research',
    hasScreenshots: true,
    fallbackColor: '#f97316'
  },
  {
    id: 'ahrefs',
    name: 'Ahrefs',
    logo: '/images/tools/logos/ahrefs.png',
    banner: '/images/tools/banners/ahrefs.webp',
    category: 'keyword-research',
    hasScreenshots: true,
    fallbackColor: '#14b8a6'
  },
  {
    id: 'athena',
    name: 'AthenaHQ',
    logo: '/images/tools/logos/athena.png',
    banner: '/images/tools/banners/athena.webp',
    category: 'visibility-monitoring',
    hasScreenshots: false,
    fallbackColor: '#8b5cf6'
  },
  {
    id: 'copy-ai',
    name: 'Copy.ai',
    logo: '/images/tools/logos/copy-ai.png',
    banner: '/images/tools/banners/copy-ai.webp',
    category: 'content-generation',
    hasScreenshots: true,
    fallbackColor: '#ef4444'
  },
  {
    id: 'clearscope',
    name: 'Clearscope',
    logo: '/images/tools/logos/clearscope.png',
    banner: '/images/tools/banners/clearscope.webp',
    category: 'content-optimization',
    hasScreenshots: true,
    fallbackColor: '#f59e0b'
  },
  {
    id: 'mangools',
    name: 'Mangools AI Search Grader',
    logo: '/images/tools/logos/mangools.png',
    banner: '/images/tools/banners/mangools.webp',
    category: 'visibility-monitoring',
    hasScreenshots: true,
    fallbackColor: '#3b82f6'
  },
  {
    id: 'profound',
    name: 'Profound',
    logo: '/images/tools/logos/profound.png',
    banner: '/images/tools/banners/profound.webp',
    category: 'geo-suite',
    hasScreenshots: false,
    fallbackColor: '#10b981'
  }
];

// 分类默认图片配置
export const CATEGORY_IMAGES = {
  'geo-suite': '/images/tools/default/geo-suite.webp',
  'content-generation': '/images/tools/default/content-generation.webp',
  'content-optimization': '/images/tools/default/content-optimization.webp',
  'keyword-research': '/images/tools/default/keyword-research.webp',
  'visibility-monitoring': '/images/tools/default/visibility-monitoring.webp',
} as const;

