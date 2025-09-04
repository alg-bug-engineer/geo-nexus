// src/app/sitemap.xml/route.ts - 更新版本，过滤验证文件

import { glob } from 'glob';
import fs from 'fs';
import path from 'path';

interface StrapiEntry {
  slug: string;
  updatedAt: string;
}

const STRAPI_BASE_URL = 'http://localhost:1337';
const SITE_URL = 'https://www.ai-knowledgepoints.cn';

async function fetchEntries(endpoint: string): Promise<StrapiEntry[]> {
  try {
    const response = await fetch(`${STRAPI_BASE_URL}/api/${endpoint}?fields[0]=slug&fields[1]=updatedAt`, { next: { revalidate: 60 } });
    if (!response.ok) return [];
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error(`Error fetching ${endpoint}:`, error);
    return [];
  }
}

// ✨ 新增函数：检查是否为站点验证文件
function isVerificationFile(fileName: string): boolean {
  const verificationPatterns = [
    /^baidu_verify_/i,           // 百度验证文件
    /^google.*\.html$/i,         // Google验证文件
    /^BingSiteAuth\.xml$/i,      // Bing验证文件
    /^yandex_.*\.html$/i,        // Yandex验证文件
    /^sogousiteverification\.txt$/i, // 搜狗验证文件
    /^360_.*\.html$/i,           // 360验证文件
    /^robots\.txt$/i,            // robots.txt
    /^sitemap.*\.xml$/i,         // sitemap文件
    /^favicon\.ico$/i,           // favicon
    /^browserconfig\.xml$/i,     // 浏览器配置
    /^manifest\.json$/i,         // PWA manifest
    /^sw\.js$/i,                 // Service Worker
    /^\.well-known\//i,          // .well-known目录
    /^ads\.txt$/i,               // Google Ads验证
    /^app-ads\.txt$/i,           // App Ads验证
  ];
  
  return verificationPatterns.some(pattern => pattern.test(fileName));
}

// ✨ 新增函数：检查是否为有效的用户资源文件
function isValidUserResource(filePath: string): boolean {
  const fileName = path.basename(filePath);
  const fileExt = path.extname(filePath).toLowerCase();
  const dirPath = path.dirname(filePath);
  
  // 1. 过滤掉验证文件
  if (isVerificationFile(fileName)) {
    return false;
  }
  
  // 2. 只允许特定类型的文件
  const allowedExtensions = ['.pdf', '.pptx', '.docx', '.xlsx'];
  if (!allowedExtensions.includes(fileExt)) {
    return false;
  }
  
  // 3. 过滤掉系统目录和隐藏文件
  if (dirPath.includes('/.') || dirPath.includes('_next') || dirPath.includes('node_modules')) {
    return false;
  }
  
  // 4. 确保文件大小合理（避免空文件或过大文件）
  try {
    const fullPath = path.join(process.cwd(), 'public', filePath);
    const stats = fs.statSync(fullPath);
    const sizeInMB = stats.size / (1024 * 1024);
    
    // 过滤掉小于1KB或大于50MB的文件
    if (stats.size < 1024 || sizeInMB > 50) {
      return false;
    }
  } catch (error) {
    console.error(`Error checking file stats for ${filePath}:`, error);
    return false;
  }
  
  return true;
}

// ✨ 更新后的函数：获取有效的public文件路由
async function getPublicFileRoutes() {
  const publicDir = path.join(process.cwd(), 'public');
  
  try {
    // 扫描指定类型的文件
    const files = await glob('**/*.{pdf,pptx,docx,xlsx}', { cwd: publicDir });
    
    // 过滤出有效的用户资源文件
    const validFiles = files.filter(file => isValidUserResource(file));
    
    console.log(`Found ${files.length} total files, ${validFiles.length} valid user resources`);
    
    return validFiles.map(file => {
      const stats = fs.statSync(path.join(publicDir, file));
      const url = `${SITE_URL}/${file.replace(/\\/g, '/')}`;
      
      return {
        url: url,
        lastModified: stats.mtime.toISOString(),
      };
    });
  } catch (error) {
    console.error('Error scanning public directory:', error);
    return [];
  }
}

export async function GET() {
  const articles = await fetchEntries('articles');
  const tools = await fetchEntries('tools');
  
  // ✨ 使用更新后的函数获取过滤后的文件路由
  const publicFileRoutes = await getPublicFileRoutes();

  const staticRoutes = [
    '/',
    '/insights',
    '/navigate',  // 修正：从 '/tools' 改为 '/navigate'
    '/tools',
    '/resources', // 新增资源页面
    '/about',
    '/consulting',
    '/contact',
    '/privacy-policy',
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

  // 添加调试信息
  console.log(`Generated sitemap with ${allRoutes.length} URLs:`);
  console.log(`- Static routes: ${staticRoutes.length}`);
  console.log(`- Article routes: ${articleRoutes.length}`);
  console.log(`- Tool routes: ${toolRoutes.length}`);
  console.log(`- Public file routes: ${publicFileRoutes.length}`);

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