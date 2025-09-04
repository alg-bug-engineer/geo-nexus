// src/app/navigate/page.tsx - 优化版本
'use client';

import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { categories, navItems } from '@/data/navigation';
import NavigationCard from '@/components/NavigationCard';
import { Search, Filter, Grid, List, TrendingUp, Star, DollarSign, Users, Zap, ChevronDown, ChevronUp, X, RotateCcw } from 'lucide-react';

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
  
  // 新增优化状态
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [isCompact, setIsCompact] = useState<boolean>(false);
  const [userPreference, setUserPreference] = useState<'auto' | 'expanded' | 'compact'>('auto');
  
  const [filters, setFilters] = useState<FilterOptions>({
    pricing: [],
    rating: null,
    tags: [],
    company: [],
    features: []
  });

  // 监听滚动 - 新增
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 100;
      setIsScrolled(scrolled);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
        break;
    }

    return items;
  }, [activeCategory, searchTerm, sortBy, filters]);

  // 智能紧凑模式判断 - 新增
  const shouldAutoCompact = useMemo(() => {
    if (userPreference === 'expanded') return false;
    if (userPreference === 'compact') return true;
    
    // 自动模式：结果少于4个或滚动时收缩
    return filteredAndSortedItems.length <= 3 || isScrolled;
  }, [filteredAndSortedItems.length, isScrolled, userPreference]);

  // 最终的紧凑状态
  const finalCompactState = userPreference === 'auto' ? shouldAutoCompact : isCompact;

  // 是否有活跃的过滤条件 - 新增
  const hasActiveFilters = useMemo(() => {
    return activeCategory !== 'all' || 
           searchTerm !== '' || 
           filters.pricing.length > 0 || 
           filters.rating !== null || 
           filters.tags.length > 0 ||
           filters.company.length > 0 ||
           filters.features.length > 0;
  }, [activeCategory, searchTerm, filters]);

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
    setShowFilters(false);
  }, []);

  // 切换紧凑模式 - 新增
  const toggleCompact = useCallback(() => {
    setIsCompact(!isCompact);
    setUserPreference(isCompact ? 'expanded' : 'compact');
  }, [isCompact]);

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
        
        {/* 页面头部 - 优化：滚动时缩小 */}
        <header className={`text-center transition-all duration-500 ${
          isScrolled || finalCompactState ? 'mb-6' : 'mb-12'
        }`}>
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

          <h1 className={`font-extrabold text-text-main mb-4 transition-all duration-500 ${
            isScrolled || finalCompactState ? 'text-2xl md:text-3xl' : 'text-4xl sm:text-5xl lg:text-6xl'
          }`}>
            <span className="bg-gradient-to-r from-accent to-accent-secondary bg-clip-text text-transparent">
              GEO 工具大全
            </span>
          </h1>
          
          {/* 副标题 - 滚动时隐藏 */}
          {!isScrolled && !finalCompactState && (
            <p className="mt-4 text-lg md:text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed">
              发现和探索 <span className="text-accent font-semibold">{stats.total}+</span> 个最好用的生成式引擎优化工具，
              涵盖 <span className="text-accent-secondary font-semibold">{stats.categories_count}</span> 个分类，
              助您在GEO时代脱颖而出
            </p>
          )}

          {/* 统计卡片 - 紧凑模式时隐藏 */}
          {!finalCompactState && (
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
          )}
        </header>

        {/* 搜索和过滤区域 - 优化：智能收缩 */}
        <div className={`sticky z-30 bg-primary/90 backdrop-blur-md py-6 mb-8 rounded-2xl border border-border-primary shadow-dark-large transition-all duration-500 ${
          isScrolled ? 'top-4' : 'top-20'
        }`}>
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
                {(searchTerm || hasActiveFilters) && (
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-text-muted bg-tertiary/50 px-3 py-1 rounded-full">
                    {stats.filtered} 个结果
                  </div>
                )}
              </div>

              {/* 工具栏 */}
              <div className="flex items-center gap-3">
                {/* 排序选择 */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className={`bg-secondary/50 border border-border-secondary rounded-xl text-text-main focus:ring-2 focus:ring-accent focus:outline-none transition-all duration-200 ${
                    finalCompactState ? 'px-3 py-2 text-sm min-w-[120px]' : 'px-4 py-3 min-w-[140px]'
                  }`}
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
                  className={`flex items-center gap-2 rounded-xl font-medium transition-all duration-200 relative ${
                    finalCompactState ? 'px-3 py-2' : 'px-4 py-3'
                  } ${
                    showFilters
                      ? 'bg-accent text-primary shadow-md'
                      : 'bg-secondary/50 border border-border-secondary text-text-secondary hover:text-text-main hover:bg-tertiary/50'
                  }`}
                >
                  <Filter className="w-4 h-4" />
                  {!finalCompactState && '过滤'}
                  {hasActiveFilters && (
                    <span className="absolute -top-1 -right-1 w-3 h-3 bg-accent-secondary rounded-full border border-primary"></span>
                  )}
                </button>

                {/* 紧凑模式切换 - 新增 */}
                <button
                  onClick={toggleCompact}
                  className="p-3 bg-secondary/50 border border-border-secondary rounded-xl text-text-secondary hover:text-text-main hover:bg-tertiary/50 transition-all duration-200"
                  title={finalCompactState ? '展开搜索区域' : '收缩搜索区域'}
                >
                  {finalCompactState ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
                </button>

                {/* 重置按钮 - 新增 */}
                {hasActiveFilters && (
                  <button
                    onClick={resetFilters}
                    className="p-3 bg-warning/20 border border-warning/30 text-warning rounded-xl hover:bg-warning/30 transition-all duration-200"
                    title="重置所有过滤条件"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            {/* 高级分类过滤器 - 水平滚动版本 */}
            {(!finalCompactState || !isScrolled) && (
              <div className={`transition-all duration-500 overflow-hidden ${
                finalCompactState && isScrolled ? 'max-h-0 opacity-0' : 'max-h-20 opacity-100'
              }`}>
                <div className="relative mb-6">
                  {/* 左侧渐变遮罩 */}
                  <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-primary to-transparent z-10 pointer-events-none"></div>
                  
                  {/* 右侧渐变遮罩 */}
                  <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-primary to-transparent z-10 pointer-events-none"></div>
                  
                  {/* 水平滚动容器 */}
                  <div 
                    className="flex gap-3 overflow-x-auto scrollbar-hide px-8 py-2"
                    style={{
                      scrollbarWidth: 'none', /* Firefox */
                      msOverflowStyle: 'none', /* IE and Edge */
                    }}
                  >
                    {/* 全部工具按钮 */}
                    <button
                      onClick={() => setActiveCategory('all')}
                      className={`flex-shrink-0 px-5 py-2.5 text-sm font-medium rounded-full transition-all duration-200 border whitespace-nowrap ${
                        activeCategory === 'all'
                          ? 'bg-accent text-primary shadow-glow border-accent hover:bg-accent-hover'
                          : 'bg-secondary/50 text-text-secondary hover:bg-tertiary hover:text-text-main border-border-secondary hover:border-accent/50'
                      }`}
                    >
                      全部工具
                      <span className="ml-2 text-xs opacity-75">({navItems.length})</span>
                    </button>
                    
                    {/* 分类按钮 */}
                    {categories.map((category) => {
                      const count = navItems.filter(item => item.category === category.key).length;
                      return (
                        <button
                          key={category.key}
                          onClick={() => setActiveCategory(category.key)}
                          className={`flex-shrink-0 flex items-center gap-2 px-5 py-2.5 text-sm font-medium rounded-full transition-all duration-200 border whitespace-nowrap ${
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
                  
                  {/* 滚动提示（仅在移动端显示） */}
                  <div className="md:hidden text-center mt-2">
                    <p className="text-xs text-text-muted flex items-center justify-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                      </svg>
                      滑动查看更多分类
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* 添加自定义CSS样式到全局CSS或组件内 */}
            <style jsx>{`
              /* 隐藏滚动条但保持滚动功能 */
              .scrollbar-hide {
                -ms-overflow-style: none;  /* IE and Edge */
                scrollbar-width: none;  /* Firefox */
              }
              .scrollbar-hide::-webkit-scrollbar {
                display: none;  /* Chrome, Safari and Opera */
              }
              
              /* 平滑滚动 */
              .scrollbar-hide {
                scroll-behavior: smooth;
              }
              
              /* 在触摸设备上改善滚动体验 */
              @media (hover: none) and (pointer: coarse) {
                .scrollbar-hide {
                  -webkit-overflow-scrolling: touch;
                }
              }
            `}</style>

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
                    className="flex items-center gap-2 px-4 py-2 text-sm text-text-secondary hover:text-text-main transition-colors"
                  >
                    <RotateCcw className="w-4 h-4" />
                    重置所有过滤器
                  </button>
                </div>
              </div>
            )}

            {/* 当前过滤状态 - 新增 */}
            {hasActiveFilters && (
              <div className="flex items-center gap-3 text-sm">
                <span className="text-text-light">当前过滤:</span>
                <div className="flex gap-2 flex-wrap">
                  {activeCategory !== 'all' && (
                    <span className="inline-flex items-center gap-1 bg-success/10 text-success px-3 py-1.5 rounded-lg font-medium border border-success/20 backdrop-blur-sm">
                      {categories.find(cat => cat.key === activeCategory)?.name}
                      <button 
                        onClick={() => setActiveCategory('all')}
                        className="hover:text-success/80"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  )}
                  {searchTerm && (
                    <span className="inline-flex items-center gap-1 bg-accent-secondary/10 text-accent-secondary px-3 py-1.5 rounded-lg font-medium border border-accent-secondary/20 backdrop-blur-sm">
                      &ldquo;{searchTerm}&rdquo;
                      <button 
                        onClick={() => setSearchTerm('')}
                        className="hover:text-accent-secondary/80"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* 结果统计 - 优化 */}
            <div className={`flex justify-between items-center mt-4 transition-all duration-300 ${
              finalCompactState ? 'text-xs' : 'text-sm'
            }`}>
              <div className="text-text-secondary">
                <p>共找到 <span className="font-semibold text-accent">{stats.filtered}</span> 个工具</p>
              </div>
              
              {/* 性能提示 - 新增 */}
              {stats.filtered <= 3 && stats.filtered > 0 && (
                <div className="text-xs text-warning flex items-center gap-1">
                  <Zap className="w-3 h-3" />
                  结果较少，已自动优化显示
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 间距调整 */}
        <div className="mb-8"></div>

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

        {/* 加载更多按钮 */}
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