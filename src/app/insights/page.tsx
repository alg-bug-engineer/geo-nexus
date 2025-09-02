// src/app/insights/page.tsx (修复按钮颜色和排序问题)

import type { Metadata } from 'next';
import Link from 'next/link';
import { ArticleCard } from '@/components/ArticleCard';
import { 
  SortOption, 
  SORT_CONFIG, 
  getArticlesPaginated // 新的分页API函数
} from '@/lib/articleUtils';

// 页面 SEO 元数据
export const metadata: Metadata = {
  title: 'GEO资讯 | GEO Nexus',
  description: '探索关于生成式引擎优化的最新新闻、深度指南和案例研究。',
};

// Next.js 15 页面props类型
type PageProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

// 页面组件
export default async function InsightsPage({ searchParams }: PageProps) {
  const params = await searchParams;
  
  // 获取URL参数
  const sortBy = (params.sort as SortOption) || SortOption.LATEST;
  const category = params.category as string;
  const searchTerm = params.search as string;
  const page = parseInt(params.page as string) || 1;
  const pageSize = 12; // 每页文章数量
  
  // 使用服务器端分页API获取数据
  const { articles, totalArticles, totalPages, currentPage } = await getArticlesPaginated({
    page,
    pageSize,
    sortBy,
    category,
    searchTerm
  });
  
  // 创建URL参数字符串的辅助函数
  const createUrl = (newParams: Record<string, string | undefined>) => {
    const urlParams = new URLSearchParams();
    
    // 保持现有参数
    Object.entries(params).forEach(([key, value]) => {
      if (value && !newParams.hasOwnProperty(key)) {
        urlParams.set(key, Array.isArray(value) ? value[0] : value);
      }
    });
    
    // 添加新参数
    Object.entries(newParams).forEach(([key, value]) => {
      if (value) {
        urlParams.set(key, value);
      } else {
        urlParams.delete(key);
      }
    });
    
    return `?${urlParams.toString()}`;
  };
  
  return (
    <div className="max-w-7xl mx-auto py-8 px-4 bg-primary min-h-screen">
      {/* 页面头部 */}
      <header className="mb-12 text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-text-main mb-4">
          GEO 资讯
        </h1>
        <p className="text-xl text-text-light max-w-2xl mx-auto">
          探索最新的洞察、深度指南和案例研究
        </p>
      </header>

      {/* 过滤控制面板 */}
      <div className="bg-secondary border border-accent/20 rounded-2xl p-6 mb-8 shadow-soft">
        <div className="flex flex-col lg:flex-row gap-6">
          
          {/* 排序选择 - 优化按钮颜色方案 */}
          <div className="flex-1">
            <label className="block text-sm font-semibold text-text-main mb-3">
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
                </svg>
                排序方式
              </span>
            </label>
            <div className="flex flex-wrap gap-2">
              {Object.entries(SORT_CONFIG).map(([value, config]) => (
                <Link
                  key={value}
                  href={createUrl({ sort: value, page: undefined })}
                  className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                    sortBy === value
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/25 scale-105 border-2 border-blue-600'
                      : 'bg-gray-100 text-gray-700 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-300 border-2 border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:text-blue-400'
                  }`}
                >
                  {config.label}
                </Link>
              ))}
            </div>
          </div>
          
          {/* 分类过滤 - 优化按钮颜色方案 */}
          <div className="flex-1">
            <label className="block text-sm font-semibold text-text-main mb-3">
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
                文章分类
              </span>
            </label>
            <div className="flex flex-wrap gap-2">
              <Link
                href={createUrl({ category: undefined, page: undefined })}
                className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                  !category
                    ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/25 scale-105 border-2 border-emerald-600'
                    : 'bg-gray-100 text-gray-700 hover:bg-emerald-50 hover:text-emerald-600 hover:border-emerald-300 border-2 border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:text-emerald-400'
                }`}
              >
                全部分类
              </Link>
              {['技术', '案例研究', '行业洞察', '产品更新'].map((cat) => (
                <Link
                  key={cat}
                  href={createUrl({ category: cat, page: undefined })}
                  className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                    category === cat
                      ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/25 scale-105 border-2 border-emerald-600'
                      : 'bg-gray-100 text-gray-700 hover:bg-emerald-50 hover:text-emerald-600 hover:border-emerald-300 border-2 border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:text-emerald-400'
                  }`}
                >
                  {cat}
                </Link>
              ))}
            </div>
          </div>
        </div>
        
        {/* 搜索栏 - 优化颜色方案 */}
        <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
          <form method="GET" className="flex gap-3">
            {/* 保持其他参数 */}
            {Object.entries(params).map(([key, value]) => 
              key !== 'search' && key !== 'page' && value ? (
                <input key={key} type="hidden" name={key} value={Array.isArray(value) ? value[0] : value} />
              ) : null
            )}
            
            <div className="relative flex-1 max-w-lg">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                name="search"
                placeholder="搜索文章标题、摘要或关键词..."
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-gray-100 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-400 dark:focus:border-blue-400"
                defaultValue={searchTerm || ''}
              />
            </div>
            
            <button 
              type="submit" 
              className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 active:bg-blue-800 transition-all duration-200 shadow-lg shadow-blue-600/25 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              搜索
            </button>
            
            {/* 清除搜索按钮 */}
            {searchTerm && (
              <Link
                href={createUrl({ search: undefined, page: undefined })}
                className="px-4 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 active:bg-gray-300 transition-all duration-200 border-2 border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700"
              >
                清除
              </Link>
            )}
          </form>
        </div>
        
        {/* 当前过滤状态 - 优化标签颜色 */}
        {(category || searchTerm) && (
          <div className="mt-4 flex items-center gap-3">
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">当前过滤：</span>
            <div className="flex gap-2">
              {category && (
                <span className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 px-3 py-1.5 rounded-lg text-sm font-medium border border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400 dark:border-emerald-800">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" clipRule="evenodd" />
                  </svg>
                  {category}
                  <Link href={createUrl({ category: undefined, page: undefined })} className="hover:text-emerald-600 dark:hover:text-emerald-300">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </Link>
                </span>
              )}
              {searchTerm && (
                <span className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-3 py-1.5 rounded-lg text-sm font-medium border border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                  </svg>
                  &ldquo;{searchTerm}&rdquo;
                  <Link href={createUrl({ search: undefined, page: undefined })} className="hover:text-blue-600 dark:hover:text-blue-300">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </Link>
                </span>
              )}
            </div>
          </div>
        )}
      </div>

      {/* 文章列表区域 */}
      {articles.length > 0 ? (
        <>
          {/* 结果统计和页面信息 */}
          <div className="flex justify-between items-center mb-8">
            <div className="text-gray-600 dark:text-gray-400">
              <p className="text-sm">
                共找到 <span className="font-semibold text-blue-600 dark:text-blue-400">{totalArticles}</span> 篇文章
                {totalPages > 1 && (
                  <span className="ml-2">
                    第 <span className="font-semibold">{currentPage}</span> / <span className="font-semibold">{totalPages}</span> 页
                  </span>
                )}
              </p>
            </div>
            
            {/* 快速跳转到顶部 */}
            <div className="hidden md:block">
              <span className="text-xs text-gray-500 dark:text-gray-500">
                显示第 {(currentPage - 1) * pageSize + 1} - {Math.min(currentPage * pageSize, totalArticles)} 条结果
              </span>
            </div>
          </div>
          
          {/* 文章网格 - 改进的响应式布局 */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 mb-12">
            {articles.map((article, index) => (
              <div
                key={article.id}
                className="animate-fadeIn"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <ArticleCard
                  title={article.title}
                  summary={article.summary}
                  slug={article.slug}
                />
              </div>
            ))}
          </div>
          
          {/* 改进的分页导航 - 优化按钮颜色 */}
          {totalPages > 1 && (
            <nav className="mt-16" aria-label="分页导航">
              <div className="flex justify-center">
                <div className="flex items-center gap-2 bg-white border-2 border-gray-200 rounded-2xl p-2 shadow-lg dark:bg-gray-800 dark:border-gray-700">
                  {/* 上一页 */}
                  {currentPage > 1 ? (
                    <Link
                      href={createUrl({ page: (currentPage - 1).toString() })}
                      className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-50 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200 border border-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-blue-400"
                      aria-label="上一页"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                      <span className="hidden sm:inline">上一页</span>
                    </Link>
                  ) : (
                    <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-200 text-gray-400 cursor-not-allowed dark:bg-gray-700 dark:text-gray-600">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                      <span className="hidden sm:inline">上一页</span>
                    </div>
                  )}
                  
                  {/* 页码 */}
                  {(() => {
                    const pages = [];
                    let startPage = Math.max(1, currentPage - 2);
                    let endPage = Math.min(totalPages, currentPage + 2);
                    
                    // 确保显示足够的页码
                    if (endPage - startPage < 4) {
                      if (startPage === 1) {
                        endPage = Math.min(totalPages, startPage + 4);
                      } else {
                        startPage = Math.max(1, endPage - 4);
                      }
                    }
                    
                    // 第一页
                    if (startPage > 1) {
                      pages.push(
                        <Link
                          key={1}
                          href={createUrl({ page: '1' })}
                          className="px-3 py-2 rounded-xl bg-gray-50 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200 border border-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-blue-400"
                        >
                          1
                        </Link>
                      );
                      if (startPage > 2) {
                        pages.push(
                          <span key="ellipsis1" className="px-2 py-2 text-gray-500 dark:text-gray-500">
                            ...
                          </span>
                        );
                      }
                    }
                    
                    // 中间页码
                    for (let i = startPage; i <= endPage; i++) {
                      pages.push(
                        <Link
                          key={i}
                          href={createUrl({ page: i.toString() })}
                          className={`px-3 py-2 rounded-xl transition-all duration-200 ${
                            i === currentPage 
                              ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/25 border-2 border-blue-600' 
                              : 'bg-gray-50 text-gray-700 hover:bg-blue-50 hover:text-blue-600 border border-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-blue-400'
                          }`}
                          aria-label={`第 ${i} 页`}
                          aria-current={i === currentPage ? 'page' : undefined}
                        >
                          {i}
                        </Link>
                      );
                    }
                    
                    // 最后一页
                    if (endPage < totalPages) {
                      if (endPage < totalPages - 1) {
                        pages.push(
                          <span key="ellipsis2" className="px-2 py-2 text-gray-500 dark:text-gray-500">
                            ...
                          </span>
                        );
                      }
                      pages.push(
                        <Link
                          key={totalPages}
                          href={createUrl({ page: totalPages.toString() })}
                          className="px-3 py-2 rounded-xl bg-gray-50 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200 border border-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-blue-400"
                        >
                          {totalPages}
                        </Link>
                      );
                    }
                    
                    return pages;
                  })()}
                  
                  {/* 下一页 */}
                  {currentPage < totalPages ? (
                    <Link
                      href={createUrl({ page: (currentPage + 1).toString() })}
                      className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-50 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200 border border-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-blue-400"
                      aria-label="下一页"
                    >
                      <span className="hidden sm:inline">下一页</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  ) : (
                    <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-200 text-gray-400 cursor-not-allowed dark:bg-gray-700 dark:text-gray-600">
                      <span className="hidden sm:inline">下一页</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  )}
                </div>
              </div>
            </nav>
          )}
        </>
      ) : (
        <EmptyState searchTerm={searchTerm} category={category} />
      )}
    </div>
  );
}

// 空状态组件 - 优化颜色
function EmptyState({ searchTerm, category }: { searchTerm?: string; category?: string }) {
  return (
    <div className="text-center py-20">
      <div className="w-32 h-32 mx-auto mb-8 bg-blue-100 rounded-full flex items-center justify-center dark:bg-blue-900/30">
        <svg className="w-16 h-16 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      </div>
      
      <h3 className="text-2xl font-bold text-gray-900 mb-4 dark:text-gray-100">
        {searchTerm || category ? '没有找到匹配的文章' : '暂时没有文章'}
      </h3>
      
      <p className="text-gray-600 mb-8 max-w-md mx-auto dark:text-gray-400">
        {searchTerm || category 
          ? '试试调整搜索条件、更换关键词或浏览其他分类，说不定能找到您感兴趣的内容' 
          : '我们正在准备精彩的内容，请稍后回来查看'
        }
      </p>
      
      {(searchTerm || category) && (
        <Link
          href="/insights"
          className="inline-flex items-center gap-2 px-8 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 active:bg-blue-800 transition-all duration-200 shadow-lg shadow-blue-600/25 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5a2 2 0 012-2h4a2 2 0 012 2v2H8V5z" />
          </svg>
          查看所有文章
        </Link>
      )}
    </div>
  );
}