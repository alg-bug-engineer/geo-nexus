// src/app/resources/page.tsx - 新建资源下载页面
import type { Metadata } from 'next';
import { glob } from 'glob';
import fs from 'fs';
import path from 'path';

export const metadata: Metadata = {
  title: '资源下载 | GEO Nexus',
  description: '下载GEO相关的白皮书、指南、案例研究等资源文件',
};

// 定义资源文件类型
interface ResourceFile {
  name: string;
  path: string;
  size: string;
  type: 'pdf' | 'pptx' | 'html';
  category: string;
  description?: string;
  lastModified: string;
}

// 获取资源文件信息
async function getResourceFiles(): Promise<ResourceFile[]> {
  // const publicDir = path.join(process.cwd(), 'public');
  const resourcesDir = path.join(process.cwd(), 'public/downloads');
  
  try {
    // const files = await glob('**/*.{pdf,pptx,html}', { cwd: publicDir });
    const files = await glob('**/*.{pdf,pptx,html}', { cwd: resourcesDir });
    
    const resources: ResourceFile[] = files.map(file => {
      const stats = fs.statSync(path.join(resourcesDir, file));
      const ext = path.extname(file).slice(1) as 'pdf' | 'pptx' | 'html';
      const fileName = path.basename(file, path.extname(file));
      
      // 根据文件路径推断分类
      const getCategory = (filePath: string): string => {
        const pathSegments = filePath.split('/');
        if (pathSegments.includes('whitepapers')) return '白皮书';
        if (pathSegments.includes('guides')) return '指南手册';
        if (pathSegments.includes('cases')) return '案例研究';
        if (pathSegments.includes('presentations')) return '演示文档';
        if (pathSegments.includes('reports')) return '研究报告';
        return '其他资源';
      };
      
      // 生成文件描述
      const getDescription = (fileName: string, category: string): string => {
        const descriptions: { [key: string]: string } = {
          'geo-whitepaper': 'GEO入门权威白皮书，全面介绍生成式引擎优化的核心概念和实践方法',
          'seo-vs-geo': 'SEO与GEO对比分析报告，帮助理解两者的区别和联系',
          'ai-search-trends': 'AI搜索趋势研究报告，深入分析搜索引擎的发展方向',
          'geo-tools-guide': 'GEO工具使用指南，详细介绍各类工具的使用方法',
          'case-study': '真实案例研究，展示GEO策略的实际应用效果',
        };
        
        return descriptions[fileName] || `${category} - ${fileName.replace(/-/g, ' ')}`;
      };
      
      return {
        name: fileName,
        path: `/downloads/${file.replace(/\\/g, '/')}`,
        size: formatFileSize(stats.size),
        type: ext,
        category: getCategory(file),
        description: getDescription(fileName, getCategory(file)),
        lastModified: stats.mtime.toLocaleDateString('zh-CN')
      };
    });
    
    return resources;
  } catch (error) {
    console.error('Error reading resource files:', error);
    return [];
  }
}

// 格式化文件大小
function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// 获取文件类型图标
function getFileIcon(type: string): string {
  const icons: { [key: string]: string } = {
    pdf: '📄',
    pptx: '📊',
    html: '🌐'
  };
  return icons[type] || '📎';
}

// 获取分类颜色
function getCategoryColor(category: string): string {
  const colors: { [key: string]: string } = {
    '白皮书': 'from-blue-500 to-blue-600',
    '指南手册': 'from-green-500 to-green-600',
    '案例研究': 'from-purple-500 to-purple-600',
    '演示文档': 'from-orange-500 to-orange-600',
    '研究报告': 'from-red-500 to-red-600',
    '其他资源': 'from-gray-500 to-gray-600'
  };
  return colors[category] || 'from-gray-500 to-gray-600';
}

export default async function ResourcesPage() {
  const resources = await getResourceFiles();
  
  // 按分类分组
  const groupedResources = resources.reduce((acc, resource) => {
    if (!acc[resource.category]) {
      acc[resource.category] = [];
    }
    acc[resource.category].push(resource);
    return acc;
  }, {} as { [key: string]: ResourceFile[] });

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 bg-primary min-h-screen">
      {/* 页面头部 */}
      <header className="text-center mb-16">
        <div className="inline-flex items-center bg-secondary/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-dark-medium border border-border-primary mb-6">
          <span className="text-2xl mr-2">📚</span>
          <span className="text-accent font-semibold">资源下载中心</span>
        </div>
        
        <h1 className="text-4xl md:text-5xl font-bold text-text-main mb-6">
          GEO 学习资源
        </h1>
        <p className="text-lg text-text-secondary max-w-3xl mx-auto">
          免费下载白皮书、指南、案例研究等资源，加速您的GEO学习之旅
        </p>
      </header>

      {/* 统计信息 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
        <div className="bg-secondary/80 backdrop-blur-sm rounded-xl p-6 text-center border border-border-primary">
          <div className="text-3xl font-bold text-accent mb-2">{resources.length}</div>
          <div className="text-text-secondary">总资源数</div>
        </div>
        <div className="bg-secondary/80 backdrop-blur-sm rounded-xl p-6 text-center border border-border-primary">
          <div className="text-3xl font-bold text-success mb-2">{Object.keys(groupedResources).length}</div>
          <div className="text-text-secondary">资源分类</div>
        </div>
        <div className="bg-secondary/80 backdrop-blur-sm rounded-xl p-6 text-center border border-border-primary">
          <div className="text-3xl font-bold text-warning mb-2">{resources.filter(r => r.type === 'pdf').length}</div>
          <div className="text-text-secondary">PDF 文档</div>
        </div>
        <div className="bg-secondary/80 backdrop-blur-sm rounded-xl p-6 text-center border border-border-primary">
          <div className="text-3xl font-bold text-accent-secondary mb-2">免费</div>
          <div className="text-text-secondary">全部资源</div>
        </div>
      </div>

      {/* 资源列表 */}
      {Object.entries(groupedResources).map(([category, files]) => (
        <section key={category} className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className={`w-4 h-4 rounded-full bg-gradient-to-r ${getCategoryColor(category)}`}></div>
            <h2 className="text-2xl font-bold text-text-main">{category}</h2>
            <span className="bg-tertiary/50 text-text-muted px-3 py-1 rounded-full text-sm">
              {files.length} 个资源
            </span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {files.map((file, index) => (
              <div 
                key={file.path}
                className="bg-secondary/80 backdrop-blur-sm rounded-xl p-6 border border-border-primary hover:border-accent/50 transition-all duration-300 group hover:shadow-dark-large"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="text-3xl">{getFileIcon(file.type)}</div>
                    <div>
                      <h3 className="font-semibold text-text-main group-hover:text-accent transition-colors">
                        {file.name}
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-text-muted">
                        <span className="uppercase">{file.type}</span>
                        <span>•</span>
                        <span>{file.size}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <p className="text-text-secondary text-sm mb-4 line-clamp-3">
                  {file.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <span className="text-xs text-text-muted">
                    更新于 {file.lastModified}
                  </span>
                  <a
                    href={file.path}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-accent to-accent-secondary text-primary px-4 py-2 rounded-lg font-medium hover:shadow-glow transition-all duration-300 text-sm"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    下载
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}

      {/* 空状态 */}
      {resources.length === 0 && (
        <div className="text-center py-20">
          <div className="text-6xl mb-4">📭</div>
          <h3 className="text-2xl font-bold text-text-main mb-4">暂无资源</h3>
          <p className="text-text-secondary">我们正在准备精彩的资源内容，敬请期待！</p>
        </div>
      )}
    </div>
  );
}