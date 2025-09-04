// src/components/OptimizedSearchArea.tsx
import React from 'react';
import { 
  Search, Filter, Grid, List, ChevronDown, ChevronUp, X, 
  DollarSign, Star, Users, Zap, RotateCcw 
} from 'lucide-react';

interface OptimizedSearchAreaProps {
  // 搜索状态
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  sortBy: string;
  setSortBy: (sort: string) => void;
  viewMode: 'grid' | 'list';
  setViewMode: (mode: 'grid' | 'list') => void;
  showFilters: boolean;
  setShowFilters: (show: boolean) => void;
  
  // 分类和过滤
  activeCategory: string;
  setActiveCategory: (category: string) => void;
  categories: Array<{ name: string; key: string; }>;
  
  // 优化状态
  isCompact: boolean;
  toggleCompact: () => void;
  isScrolled: boolean;
  shouldShowCategories: boolean;
  
  // 统计
  resultsCount: number;
  hasActiveFilters: boolean;
  
  // 操作
  resetFilters: () => void;
}

export const OptimizedSearchArea: React.FC<OptimizedSearchAreaProps> = ({
  searchTerm,
  setSearchTerm,
  sortBy,
  setSortBy,
  viewMode,
  setViewMode,
  showFilters,
  setShowFilters,
  activeCategory,
  setActiveCategory,
  categories,
  isCompact,
  toggleCompact,
  isScrolled,
  shouldShowCategories,
  resultsCount,
  hasActiveFilters,
  resetFilters,
}) => {
  
  const sortOptions = [
    { value: 'relevance', label: '相关性' },
    { value: 'name', label: '名称 A-Z' },
    { value: 'rating', label: '评分最高' },
    { value: 'popularity', label: '最受欢迎' },
  ];

  return (
    <div className={`sticky z-30 bg-secondary/95 backdrop-blur-md rounded-2xl border border-border-primary shadow-dark-large transition-all duration-500 ${
      isScrolled ? 'top-4' : 'top-20'
    }`}>
      <div className="p-4">
        
        {/* 主搜索栏 */}
        <div className="flex flex-col lg:flex-row gap-3 mb-4">
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="搜索工具名称、描述、公司或标签..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border-2 border-border-secondary rounded-xl bg-tertiary/50 text-text-main placeholder-text-muted focus:ring-2 focus:ring-accent focus:border-accent focus:outline-none transition-all duration-200"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-text-muted" />
            
            {/* 搜索结果计数 */}
            {(searchTerm || hasActiveFilters) && (
              <div className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-text-muted bg-tertiary/50 px-3 py-1 rounded-full border border-border-secondary">
                {resultsCount} 个结果
              </div>
            )}
          </div>

          {/* 工具栏 */}
          <div className="flex items-center gap-2">
            {/* 排序选择 */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className={`bg-tertiary/50 border border-border-secondary rounded-xl text-text-main focus:ring-2 focus:ring-accent focus:outline-none transition-all duration-200 ${
                isCompact ? 'px-3 py-2 text-sm min-w-[120px]' : 'px-4 py-3 min-w-[140px]'
              }`}
            >
              {sortOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>

            {/* 视图切换 */}
            <div className="flex bg-tertiary/50 rounded-xl border border-border-secondary p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-all duration-200 ${
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
                className={`p-2 rounded-lg transition-all duration-200 ${
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
                isCompact ? 'px-3 py-2' : 'px-4 py-3'
              } ${
                showFilters
                  ? 'bg-accent text-primary shadow-md'
                  : 'bg-tertiary/50 border border-border-secondary text-text-secondary hover:text-text-main hover:bg-tertiary'
              }`}
            >
              <Filter className="w-4 h-4" />
              {!isCompact && '过滤'}
              {hasActiveFilters && (
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-accent-secondary rounded-full border border-primary"></span>
              )}
            </button>

            {/* 紧凑模式切换 */}
            <button
              onClick={toggleCompact}
              className="p-2 bg-tertiary/50 border border-border-secondary rounded-xl text-text-secondary hover:text-text-main hover:bg-tertiary transition-all duration-200"
              title={isCompact ? '展开搜索区域' : '收缩搜索区域'}
            >
              {isCompact ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
            </button>

            {/* 重置按钮 - 仅在有过滤条件时显示 */}
            {hasActiveFilters && (
              <button
                onClick={resetFilters}
                className="p-2 bg-warning/20 border border-warning/30 text-warning rounded-xl hover:bg-warning/30 transition-all duration-200"
                title="重置所有过滤条件"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* 分类过滤器 - 条件显示 */}
        {shouldShowCategories && (
          <div className={`transition-all duration-500 overflow-hidden ${
            isCompact ? 'max-h-0 opacity-0 mb-0' : 'max-h-20 opacity-100 mb-4'
          }`}>
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map((category) => {
                const count = 10; // 这里应该是实际的计数
                return (
                  <button
                    key={category.key}
                    onClick={() => setActiveCategory(category.key)}
                    className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 border ${
                      activeCategory === category.key
                        ? 'bg-accent text-primary shadow-glow border-accent hover:bg-accent-hover'
                        : 'bg-tertiary/50 text-text-secondary hover:bg-tertiary hover:text-text-main border-border-secondary hover:border-accent/50'
                    }`}
                  >
                    {category.name}
                    <span className="text-xs opacity-75">({count})</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* 高级过滤器面板 */}
        {showFilters && (
          <div className="bg-tertiary/30 backdrop-blur-sm rounded-xl p-4 border border-border-secondary mb-4 animate-fade-in">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-semibold text-text-main flex items-center gap-2">
                <Filter className="w-5 h-5 text-accent" />
                高级过滤器
              </h4>
              <button
                onClick={() => setShowFilters(false)}
                className="text-text-muted hover:text-text-main transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* 价格过滤 */}
              <div>
                <h5 className="text-sm font-semibold text-text-main mb-3 flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-success" />
                  价格模式
                </h5>
                <div className="space-y-2">
                  {[
                    { value: 'free', label: '免费', color: 'success' },
                    { value: 'freemium', label: '免费增值', color: 'accent' },
                    { value: 'paid', label: '付费', color: 'warning' }
                  ].map(pricing => (
                    <label key={pricing.value} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        className="w-4 h-4 text-accent focus:ring-accent focus:ring-2 rounded border-border-secondary"
                      />
                      <span className="text-sm text-text-secondary">{pricing.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* 评分过滤 */}
              <div>
                <h5 className="text-sm font-semibold text-text-main mb-3 flex items-center gap-2">
                  <Star className="w-4 h-4 text-warning" />
                  最低评分
                </h5>
                <div className="space-y-2">
                  {[4.5, 4.0, 3.5, 3.0].map(rating => (
                    <label key={rating} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        name="rating"
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

              {/* 热门标签 */}
              <div>
                <h5 className="text-sm font-semibold text-text-main mb-3 flex items-center gap-2">
                  <Zap className="w-4 h-4 text-accent-secondary" />
                  热门标签
                </h5>
                <div className="flex flex-wrap gap-2">
                  {['AI写作', 'SEO优化', '内容分析', '关键词研究', '竞争分析'].map(tag => (
                    <button
                      key={tag}
                      className="px-3 py-1 text-xs rounded-full transition-all duration-200 bg-tertiary/50 text-text-muted hover:bg-accent hover:text-primary border border-border-secondary hover:border-accent"
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

        {/* 当前过滤状态 - 紧凑显示 */}
        {hasActiveFilters && (
          <div className="flex items-center gap-3 text-sm mb-3">
            <span className="text-text-light">当前过滤:</span>
            <div className="flex gap-2 flex-wrap">
              {activeCategory !== 'all' && (
                <span className="inline-flex items-center gap-1 bg-success/10 text-success px-3 py-1.5 rounded-lg font-medium border border-success/20 backdrop-blur-sm">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" clipRule="evenodd" />
                  </svg>
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
                <span className="inline-flex items-center gap-1 bg-accent/10 text-accent px-3 py-1.5 rounded-lg font-medium border border-accent/20 backdrop-blur-sm">
                  <Search className="w-3 h-3" />
                  &ldquo;{searchTerm}&rdquo;
                  <button 
                    onClick={() => setSearchTerm('')}
                    className="hover:text-accent/80"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
            </div>
          </div>
        )}

        {/* 结果统计 - 始终显示但样式可变 */}
        <div className={`flex justify-between items-center text-sm transition-all duration-300 ${
          isCompact ? 'text-xs' : 'text-sm'
        }`}>
          <div className="text-text-secondary">
            <p>共找到 <span className="font-semibold text-accent">{resultsCount}</span> 个工具</p>
          </div>
          
          {/* 性能提示 */}
          {resultsCount <= 3 && resultsCount > 0 && (
            <div className="text-xs text-warning flex items-center gap-1">
              <Zap className="w-3 h-3" />
              结果较少，已自动优化显示
            </div>
          )}
        </div>
      </div>
    </div>
  );
};