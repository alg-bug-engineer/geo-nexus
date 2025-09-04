// src/app/navigate/page.tsx - 大幅增强的导航页面
'use client';

import React, { useState, useMemo, useCallback } from 'react';
import { categories, navItems } from '@/data/navigation';
import NavigationCard from '@/components/NavigationCard';
import { Search, Filter, Grid, List, TrendingUp, Star, DollarSign, Users, Zap } from 'lucide-react';

// 排序选项
type SortOption = 'relevance' | 'name' | 'rating' | 'popularity' | 'newest' | 'oldest';

// 过滤选项
interface FilterOptions {
  pricing: string[];
  rating: number | null;
  tags: string[];
  company: string[];
  features: string[];
}

// 视图模式
type ViewMode = 'grid' | 'list';

const NavigatePage = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [sortBy, setSortBy] = useState<SortOption>('relevance');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [filters, setFilters] = useState<FilterOptions>({
    pricing: [],
    rating: null,
    tags: [],
    company: [],
    features: []
  });

  // 获取所有唯一的标签、公司和功能
  const availableOptions = useMemo(() => {
    const tags = new Set<string>();
    const companies = new Set<string>();
    const features = new Set<string>();

    navItems.forEach(item => {
      item.tags?.forEach(tag => tags.add(tag));
      if (item.company) companies.add(item.company);
      item.features?.forEach(feature => features.add(feature));
    });

    return {
      tags: Array.from(tags).sort(),
      companies: Array.from(companies).sort(),
      features: Array.from(features).sort()
    };
  }, []);

  // 过滤和排序逻辑
  const filteredAndSortedItems = useMemo(() => {
    const items = navItems.filter(item => {
      // 分类过滤
      const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
      
      // 搜索过滤
      const matchesSearch = !searchTerm || 
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.company?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));

      // 价格过滤
      const matchesPricing = filters.pricing.length === 0 || 
        (item.pricing && filters.pricing.includes(item.pricing));

      // 评分过滤
      const matchesRating = !filters.rating || 
        (item.rating && item.rating >= filters.rating);

      // 标签过滤
      const matchesTags = filters.tags.length === 0 ||
        filters.tags.some(tag => item.tags?.includes(tag));

      // 公司过滤
      const matchesCompany = filters.company.length === 0 ||
        (item.company && filters.company.includes(item.company));

      // 功能过滤
      const matchesFeatures = filters.features.length === 0 ||
        filters.features.some(feature => item.features?.includes(feature));

      return matchesCategory && matchesSearch && matchesPricing && 
             matchesRating && matchesTags && matchesCompany && matchesFeatures;
    });

    // 排序
    switch (sortBy) {
      case 'name':
        items.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'rating':
        items.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case 'popularity':
        items.sort((a, b) => (b.popularity || 0) - (a.popularity || 0));
        break;
      case 'newest':
        items.sort((a, b) => (b.launchYear || 0) - (a.launchYear || 0));
        break;
      case 'oldest':
        items.sort((a, b) => (a.launchYear || 0) - (b.launchYear || 0));
        break;
      default: // relevance
        // 保持原有顺序，或基于搜索相关性排序
        break;
    }

    return items;
  }, [activeCategory, searchTerm, sortBy, filters]);

  // 重置过滤器
  const resetFilters = useCallback(() => {
    setFilters({
      pricing: [],
      rating: null,
      tags: [],
      company: [],
      features: []
    });
    setSearchTerm('');
    setActiveCategory('all');
  }, []);

  // 更新过滤器的辅助函数
  const updateFilter = useCallback((key: keyof FilterOptions, value: string[] | number | null) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  }, []);

  // 统计信息
  const stats = useMemo(() => {
    const total = navItems.length;
    const filtered = filteredAndSortedItems.length;
    const categories_count = new Set(navItems.map(item => item.category)).size;
    const companies_count = new Set(navItems.map(item => item.company).filter(Boolean)).size;
    
    return { total, filtered, categories_count, companies_count };
  }, [filteredAndSortedItems.length]);

  return (
    <div className="bg-primary min-h-screen">
      <div className="container mx-auto px-4 py-8 sm:py-12">
        {/* 页面头部 */}
        <header className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="w-20 h-20 bg-gradient-to-br from-accent/20 to-accent-secondary/20 backdrop-blur-sm rounded-3xl flex items-center justify-center border border-accent/20 shadow-glow">
                <Zap className="w-10 h-10 text-accent" />
              </div>
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-success to-success/80 rounded-full flex items-center justify-center text-primary text-xs font-bold">
                {stats.total}
              </div>
            </div>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-text-main mb-4">
            <span className="bg-gradient-to-r from-accent to-accent-secondary bg-clip-text text-transparent">
              GEO 工具大全
            </span>
          </h1>
          
          <p className="mt-4 text-lg md:text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed">
            发现和探索 <span className="text-accent font-semibold">{stats.total}+</span> 个最好用的生成式引擎优化工具，
            涵盖 <span className="text-accent-secondary font-semibold">{stats.categories_count}</span> 个分类，
            助您在GEO时代脱颖而出
          </p>

          {/* 统计卡片 */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 max-w-2xl mx-auto">
            {[
              { label: '工具总数', value: stats.total, icon: Zap, color: 'text-accent' },
              { label: '分类数量', value: stats.categories_count, icon: Grid, color: 'text-accent-secondary' },
              { label: '公司数量', value: stats.companies_count, icon: Users, color: 'text-success' },
              { label: '当前显示', value: stats.filtered, icon: Filter, color: 'text-warning' }
            ].map((stat, index) => (
              <div key={index} className="bg-secondary/50 backdrop-blur-sm rounded-xl p-4 border border-border-primary hover:border-accent/30 transition-all duration-300">
                <div className="flex items-center justify-center mb-2">
                  <stat.icon className={`w-5 h-5 ${stat.color}`} />
                </div>
                <div className="text-2xl font-bold text-text-main">{stat.value}</div>
                <div className="text-sm text-text-secondary">{stat.label}</div>
              </div>
            ))}
          </div>
        </header>

        {/* 搜索和过滤区域 */}
        <div className="sticky top-20 z-30 bg-primary/90 backdrop-blur-md py-6 mb-8 rounded-2xl border border-border-primary shadow-dark-large">
          <div className="max-w-6xl mx-auto px-6">
            
            {/* 搜索栏 */}
            <div className="flex flex-col lg:flex-row gap-4 mb-6">
              <div className="flex-1 relative">
                <input
                  type="text"
                  placeholder="搜索工具名称、描述、公司或标签..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 border-2 border-border-secondary rounded-2xl bg-secondary/50 backdrop-blur-sm text-text-main placeholder-text-muted focus:ring-2 focus:ring-accent focus:border-accent focus:outline-none transition-all duration-200"
                />
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-text-muted" />
                
                {/* 搜索结果计数 */}
                {(searchTerm || Object.values(filters).some(f => Array.isArray(f) ? f.length > 0 : f !== null)) && (
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-text-muted bg-tertiary/50 px-3 py-1 rounded-full">
                    {filteredAndSortedItems.length} 个结果
                  </div>
                )}
              </div>

              {/* 工具栏 */}
              <div className="flex items-center gap-3">
                {/* 排序选择 */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="px-4 py-3 bg-secondary/50 border border-border-secondary rounded-xl text-text-main focus:ring-2 focus:ring-accent focus:outline-none min-w-[140px]"
                >
                  <option value="relevance">相关性</option>
                  <option value="name">名称 A-Z</option>
                  <option value="rating">评分最高</option>
                  <option value="popularity">最受欢迎</option>
                  <option value="newest">最新发布</option>
                  <option value="oldest">最早发布</option>
                </select>

                {/* 视图切换 */}
                <div className="flex bg-secondary/50 rounded-xl border border-border-secondary p-1">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-3 rounded-lg transition-all duration-200 ${
                      viewMode === 'grid'
                        ? 'bg-accent text-primary shadow-md'
                        : 'text-text-secondary hover:text-text-main hover:bg-tertiary/50'
                    }`}
                    aria-label="网格视图"
                  >
                    <Grid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-3 rounded-lg transition-all duration-200 ${
                      viewMode === 'list'
                        ? 'bg-accent text-primary shadow-md'
                        : 'text-text-secondary hover:text-text-main hover:bg-tertiary/50'
                    }`}
                    aria-label="列表视图"
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>

                {/* 过滤器切换 */}
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-all duration-200 ${
                    showFilters
                      ? 'bg-accent text-primary shadow-md'
                      : 'bg-secondary/50 border border-border-secondary text-text-secondary hover:text-text-main hover:bg-tertiary/50'
                  }`}
                >
                  <Filter className="w-4 h-4" />
                  过滤
                </button>
              </div>
            </div>

            {/* 分类过滤器 */}
            <div className="flex flex-wrap justify-center gap-3 mb-6">
              <button
                onClick={() => setActiveCategory('all')}
                className={`px-5 py-2.5 text-sm font-medium rounded-full transition-all duration-200 border ${
                  activeCategory === 'all'
                    ? 'bg-accent text-primary shadow-glow border-accent hover:bg-accent-hover'
                    : 'bg-secondary/50 text-text-secondary hover:bg-tertiary hover:text-text-main border-border-secondary hover:border-accent/50'
                }`}
              >
                全部工具
                <span className="ml-2 text-xs opacity-75">({navItems.length})</span>
              </button>
              {categories.map((category) => {
                const count = navItems.filter(item => item.category === category.key).length;
                return (
                  <button
                    key={category.key}
                    onClick={() => setActiveCategory(category.key)}
                    className={`flex items-center gap-2 px-5 py-2.5 text-sm font-medium rounded-full transition-all duration-200 border ${
                      activeCategory === category.key
                        ? 'bg-accent text-primary shadow-glow border-accent hover:bg-accent-hover'
                        : 'bg-secondary/50 text-text-secondary hover:bg-tertiary hover:text-text-main border-border-secondary hover:border-accent/50'
                    }`}
                  >
                    <span>{category.icon}</span>
                    {category.name}
                    <span className="text-xs opacity-75">({count})</span>
                  </button>
                );
              })}
            </div>

            {/* 高级过滤器面板 */}
            {showFilters && (
              <div className="bg-secondary/30 backdrop-blur-sm rounded-xl p-6 border border-border-secondary">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  
                  {/* 价格过滤 */}
                  <div>
                    <h4 className="text-sm font-semibold text-text-main mb-3 flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-success" />
                      价格模式
                    </h4>
                    <div className="space-y-2">
                      {['free', 'freemium', 'paid'].map(pricing => (
                        <label key={pricing} className="flex items-center space-x-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={filters.pricing.includes(pricing)}
                            onChange={(e) => {
                              const newPricing = e.target.checked
                                ? [...filters.pricing, pricing]
                                : filters.pricing.filter(p => p !== pricing);
                              updateFilter('pricing', newPricing);
                            }}
                            className="w-4 h-4 text-accent focus:ring-accent focus:ring-2 rounded border-border-secondary"
                          />
                          <span className="text-sm text-text-secondary capitalize">
                            {pricing === 'freemium' ? '免费增值' : pricing === 'free' ? '免费' : '付费'}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* 评分过滤 */}
                  <div>
                    <h4 className="text-sm font-semibold text-text-main mb-3 flex items-center gap-2">
                      <Star className="w-4 h-4 text-warning" />
                      最低评分
                    </h4>
                    <div className="space-y-2">
                      {[4.5, 4.0, 3.5, 3.0].map(rating => (
                        <label key={rating} className="flex items-center space-x-2 cursor-pointer">
                          <input
                            type="radio"
                            name="rating"
                            checked={filters.rating === rating}
                            onChange={() => updateFilter('rating', rating)}
                            className="w-4 h-4 text-accent focus:ring-accent focus:ring-2 border-border-secondary"
                          />
                          <span className="text-sm text-text-secondary flex items-center gap-1">
                            {rating}+ 
                            <Star className="w-3 h-3 fill-warning text-warning" />
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* 标签过滤 */}
                  <div>
                    <h4 className="text-sm font-semibold text-text-main mb-3">热门标签</h4>
                    <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto">
                      {availableOptions.tags.slice(0, 12).map(tag => (
                        <button
                          key={tag}
                          onClick={() => {
                            const newTags = filters.tags.includes(tag)
                              ? filters.tags.filter(t => t !== tag)
                              : [...filters.tags, tag];
                            updateFilter('tags', newTags);
                          }}
                          className={`px-3 py-1 text-xs rounded-full transition-all duration-200 ${
                            filters.tags.includes(tag)
                              ? 'bg-accent text-primary'
                              : 'bg-tertiary/50 text-text-muted hover:bg-tertiary hover:text-text-secondary'
                          }`}
                        >
                          {tag}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* 重置按钮 */}
                <div className="flex justify-end mt-6 pt-4 border-t border-border-secondary">
                  <button
                    onClick={resetFilters}
                    className="px-4 py-2 text-sm text-text-secondary hover:text-text-main transition-colors"
                  >
                    重置所有过滤器
                  </button>
                </div>
              </div>
            )}

            {/* 当前过滤状态 */}
            {(activeCategory !== 'all' || searchTerm || Object.values(filters).some(f => Array.isArray(f) ? f.length > 0 : f !== null)) && (
              <div className="flex items-center gap-3 text-sm">
                <span className="text-text-light">当前过滤:</span>
                <div className="flex gap-2 flex-wrap">
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
                  {/* 其他过滤器标签... */}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 工具展示区域 */}
        {filteredAndSortedItems.length > 0 ? (
          <div className={viewMode === 'grid' 
            ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8"
            : "space-y-6"
          }>
            {filteredAndSortedItems.map((item, index) => (
              <div 
                key={`${item.title}-${item.category}`}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <NavigationCard item={item} viewMode={viewMode} />
              </div>
            ))}
          </div>
        ) : (
          <EmptyState 
            searchTerm={searchTerm} 
            activeCategory={activeCategory} 
            categories={categories}
            onReset={resetFilters}
          />
        )}

        {/* 加载更多按钮（如果需要分页） */}
        {filteredAndSortedItems.length > 0 && (
          <div className="text-center mt-16">
            <div className="inline-flex flex-col items-center gap-4 bg-secondary/50 backdrop-blur-sm rounded-2xl p-8 border border-border-primary">
              <TrendingUp className="w-8 h-8 text-accent" />
              <h3 className="text-xl font-bold text-text-main">发现更多工具</h3>
              <p className="text-text-secondary text-center max-w-md">
                我们正在不断收录更多优质的GEO工具，敬请期待！
              </p>
              <button className="px-6 py-3 bg-gradient-to-r from-accent to-accent-secondary text-primary rounded-xl hover:shadow-glow transition-all duration-200 font-medium">
                提交工具推荐
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// 空状态组件
function EmptyState({ 
  searchTerm, 
  activeCategory, 
  categories,
  onReset
}: { 
  searchTerm: string; 
  activeCategory: string;
  categories: { name: string; key: string }[];
  onReset: () => void;
}) {
  const categoryName = categories.find(cat => cat.key === activeCategory)?.name;
  
  return (
    <div className="text-center py-20">
      <div className="w-32 h-32 mx-auto mb-8 bg-gradient-to-br from-accent/10 to-accent-secondary/10 rounded-full flex items-center justify-center backdrop-blur-sm border border-border-primary">
        <Search className="w-16 h-16 text-accent" />
      </div>
      
      <h3 className="text-2xl font-bold text-text-main mb-4">
        没有找到匹配的工具
      </h3>
      
      <p className="text-text-secondary mb-8 max-w-md mx-auto">
        {searchTerm 
          ? `没有找到包含"${searchTerm}"的工具` 
          : `${categoryName}分类下暂无符合条件的工具`
        }
        <br />
        试试调整搜索条件或浏览其他分类
      </p>
      
      <div className="flex justify-center gap-4">
        <button
          onClick={onReset}
          className="px-6 py-3 bg-accent text-primary rounded-xl hover:bg-accent-hover transition-all duration-200 font-medium"
        >
          重置所有过滤器
        </button>
        <button
          onClick={() => window.location.href = '/navigate'}
          className="px-6 py-3 bg-secondary border border-border-secondary text-text-secondary rounded-xl hover:bg-tertiary hover:text-text-main transition-all duration-200 font-medium"
        >
          查看全部工具
        </button>
      </div>
    </div>
  );
}

export default NavigatePage;