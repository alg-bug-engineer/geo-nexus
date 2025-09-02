// src/app/tools/page.tsx
import type { Metadata } from 'next';
import { ToolCard } from '@/components/ToolCard';

// --- TypeScript Type Definition ---
interface StrapiTool {
  id: number;
  name: string;
  slug: string;
  summary: string;
  overall_score: number;
}

// --- Data Fetching Function ---
async function getTools(): Promise<StrapiTool[]> {
  // Sort tools alphabetically by name
  const STRAPI_URL = 'https://api.ai-knowledgepoints.cn/api/tools?sort=name:asc';
  
  try {
    const response = await fetch(STRAPI_URL, { cache: 'no-store' });
    if (!response.ok) {
      throw new Error('Failed to fetch tools');
    }
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error(error);
    return [];
  }
}

// --- Page SEO Metadata ---
export const metadata: Metadata = {
  title: 'GEO 工具导航 | GEO Nexus',
  description: '发现、比较和评测最好的生成式引擎优化（GEO）工具。',
};

// --- Page Component ---
export default async function ToolsPage() {
  const tools = await getTools();

  return (
    <div className="max-w-6xl mx-auto py-8 px-4">
      <header className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-text-main">
          GEO 工具导航
        </h1>
        <p className="text-xl text-text-light mt-2">
          发现、比较和评测最好的GEO工具
        </p>
      </header>

      {tools.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tools.map((tool) => (
            <ToolCard
              key={tool.id}
              name={tool.name}
              summary={tool.summary}
              slug={tool.slug}
              score={tool.overall_score}
            />
          ))}
        </div>
      ) : (
        <p className="text-center text-lg text-text-light">
          工具正在收录中，敬请期待...
        </p>
      )}
    </div>
  );
}