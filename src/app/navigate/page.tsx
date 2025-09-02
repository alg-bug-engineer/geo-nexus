// src/app/navigate/page.tsx (优化配色版本)
'use client';

import React, { useState, useMemo } from 'react';
import { categories, navItems } from '@/data/navigation';
import NavigationCard from '@/components/NavigationCard';
import { Search } from 'lucide-react';

const NavigatePage = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const filteredItems = useMemo(() => {
    return navItems.filter(item => {
      const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
      const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            item.description.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchTerm]);

  return (
    <div className="bg-primary min-h-screen">
      <div className="container mx-auto px-4 py-8 sm:py-12">
        {/* 页面头部 */}
        <header className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-text-main mb-4">
            <span className="bg-gradient-to-r from-accent to-accent-secondary bg-clip-text text-transparent">
              AI 工具导航
            </span>
          </h1>
          <p className="mt-4 text-lg text-text-secondary max-w-2xl mx-auto">
            发现和探索最好用的人工智能工具，助您在GEO时代脱颖而出
          </p>
        </header>

        {/* 搜索和过滤区域 */}
        <div className="sticky top-20 z-10 bg-primary/80 backdrop-blur-sm py-6 mb-8 rounded-2xl border border-border-primary">
          <div className="max-w-4xl mx-auto px-6 space-y-6">
            {/* 搜索输入框 */}
            <div className="relative">
              <input
                type="text"
                placeholder="在「AI办公工具」中搜索"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 border-2 border-border-secondary rounded-2xl bg-secondary/50 backdrop-blur-sm text-text-main placeholder-text-muted focus:ring-2 focus:ring-accent focus:border-accent focus:outline-none transition-all duration-200"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-text-muted" />
              
              {/* 搜索结果计数 */}
              {searchTerm && (
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-text-muted">
                  {filteredItems.length} 个结果
                </div>
              )}
            </div>

            {/* 分类过滤器 */}
            <div className="flex flex-wrap justify-center gap-3">
              <button
                onClick={() => setActiveCategory('all')}
                className={`px-5 py-2.5 text-sm font-medium rounded-full transition-all duration-200 border ${
                  activeCategory === 'all'
                    ? 'bg-accent text-primary shadow-glow border-accent hover:bg-accent-hover'
                    : 'bg-secondary/50 text-text-secondary hover:bg-tertiary hover:text-text-main border-border-secondary hover:border-accent/50'
                }`}
              >
                全部标签
              </button>
              {categories.map((category) => (
                <button
                  key={category.key}
                  onClick={() => setActiveCategory(category.key)}
                  className={`px-5 py-2.5 text-sm font-medium rounded-full transition-all duration-200 border ${
                    activeCategory === category.key
                      ? 'bg-accent text-primary shadow-glow border-accent hover:bg-accent-hover'
                      : 'bg-secondary/50 text-text-secondary hover:bg-tertiary hover:text-text-main border-border-secondary hover:border-accent/50'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
            
            {/* 当前过滤状态 */}
            {(activeCategory !== 'all' || searchTerm) && (
              <div className="flex items-center justify-center gap-3 text-sm">
                <span className="text-text-light">当前过滤:</span>
                <div className="flex items-center gap-2">
                  {activeCategory !== 'all' && (
                    <span className="inline-flex items-center gap-1 bg-accent/10 text-accent px-3 py-1.5 rounded-lg font-medium border border-accent/20">
                      {categories.find(cat => cat.key === activeCategory)?.name}
                      <button 
                        onClick={() => setActiveCategory('all')}
                        className="hover:text-accent/80"
                      >
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </span>
                  )}
                  {searchTerm && (
                    <span className="inline-flex items-center gap-1 bg-accent-secondary/10 text-accent-secondary px-3 py-1.5 rounded-lg font-medium border border-accent-secondary/20">
                      &ldquo;{searchTerm}&rdquo;
                      <button 
                        onClick={() => setSearchTerm('')}
                        className="hover:text-accent-secondary/80"
                      >
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 工具网格 */}
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
            {filteredItems.map((item, index) => (
              <div 
                key={item.title} 
                className="animate-fade-in"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <NavigationCard item={item} />
              </div>
            ))}
          </div>
        ) : (
          <EmptyState searchTerm={searchTerm} activeCategory={activeCategory} categories={categories} />
        )}
      </div>
    </div>
  );
};

// 空状态组件
function EmptyState({ 
  searchTerm, 
  activeCategory, 
  categories 
}: { 
  searchTerm: string; 
  activeCategory: string;
  categories: { name: string; key: string }[];
}) {
  const categoryName = categories.find(cat => cat.key === activeCategory)?.name;
  
  return (
    <div className="text-center py-20">
      <div className="w-32 h-32 mx-auto mb-8 bg-gradient-to-br from-accent/10 to-accent-secondary/10 rounded-full flex items-center justify-center backdrop-blur-sm border border-border-primary">
        <svg className="w-16 h-16 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
      
      <h3 className="text-2xl font-bold text-text-main mb-4">
        没有找到匹配的工具
      </h3>
      
      <p className="text-text-secondary mb-8 max-w-md mx-auto">
        {searchTerm 
          ? `没有找到包含"${searchTerm}"的工具` 
          : `${categoryName}分类下暂无工具`
        }
        <br />
        试试调整搜索条件或浏览其他分类
      </p>
      
      <div className="flex justify-center gap-4">
        {searchTerm && (
          <button
            onClick={() => window.location.reload()}  // 改为重载页面
            className="px-6 py-3 bg-accent text-primary rounded-xl hover:bg-accent-hover transition-all duration-200 font-medium"
          >
            清除搜索
          </button>
        )}
        {activeCategory !== 'all' && (
          <button
            onClick={() => window.location.href = '/navigate'}  // 改为跳转到全部分类
            className="px-6 py-3 bg-secondary border border-border-secondary text-text-secondary rounded-xl hover:bg-tertiary hover:text-text-main transition-all duration-200 font-medium"
          >
            查看全部
          </button>
        )}
      </div>
    </div>
  );
}

export default NavigatePage;