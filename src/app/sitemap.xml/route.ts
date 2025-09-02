// src/app/sitemap.xml/route.ts

import { glob } from 'glob'; // 引入 glob
import fs from 'fs';         // 引入 Node.js 文件系统模块
import path from 'path';     // 引入 Node.js 路径模块

interface StrapiEntry {
  slug: string;
  updatedAt: string;
}

const STRAPI_BASE_URL = 'http://localhost:1337';
const SITE_URL = 'https://www.ai-knowledgepoints.cn';

async function fetchEntries(endpoint: string): Promise<StrapiEntry[]> {
  try {
    const response = await fetch(`${STRAPI_BASE_URL}/api/${endpoint}?fields[0]=slug&fields[1]=updatedAt`, { next: { revalidate: 60 } }); // 缓存1分钟
    if (!response.ok) return [];
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error(`Error fetching ${endpoint}:`, error);
    return [];
  }
}

// ✨ 新增函数：扫描 public 目录并生成静态文件路由
async function getPublicFileRoutes() {
  // process.cwd() 是项目根目录，我们定位到 public 文件夹
  const publicDir = path.join(process.cwd(), 'public');
  
  // 使用 glob 查找所有指定的静态文件
  // '**/' 匹配任意深度的子目录
  // '*.{html,pdf,pptx}' 匹配指定后缀的文件
  const files = await glob('**/*.{html,pdf,pptx}', { cwd: publicDir });

  return files.map(file => {
    // 获取文件的详细信息，包括最后修改时间
    const stats = fs.statSync(path.join(publicDir, file));
    
    // 构建文件的公开访问 URL
    // 例如，public/documents/report.pdf -> https://ai-knowledgepoints.cn/documents/report.pdf
    const url = `${SITE_URL}/${file.replace(/\\/g, '/')}`; // 确保 Windows 路径的反斜杠被替换

    return {
      url: url,
      lastModified: stats.mtime.toISOString(), // 使用文件的实际最后修改时间
    };
  });
}


export async function GET() {
  const articles = await fetchEntries('articles');
  const tools = await fetchEntries('tools');
  
  // ✨ 调用新函数获取 public 目录下的文件路由
  const publicFileRoutes = await getPublicFileRoutes();

  const staticRoutes = [
    '/',
    '/insights',
    '/tools',
    '/about',
    '/consulting',
  ].map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date().toISOString(),
  }));

  const articleRoutes = articles.map((article) => ({
    url: `${SITE_URL}/insights/${article.slug}`,
    lastModified: new Date(article.updatedAt).toISOString(),
  }));

  const toolRoutes = tools.map((tool) => ({
    url: `${SITE_URL}/tools/reviews/${tool.slug}`,
    lastModified: new Date(tool.updatedAt).toISOString(),
  }));

  // ✨ 将所有路由合并到一个数组中
  const allRoutes = [...staticRoutes, ...articleRoutes, ...toolRoutes, ...publicFileRoutes];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${allRoutes
        .map(({ url, lastModified }) => {
          return `
            <url>
              <loc>${url}</loc>
              <lastmod>${lastModified}</lastmod>
            </url>
          `;
        })
        .join('')}
    </urlset>
  `;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
