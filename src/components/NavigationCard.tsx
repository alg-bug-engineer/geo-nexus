// src/components/NavigationCard.tsx - 更新后的组件
import React from 'react';
import Image from 'next/image';
import { NavItem } from '@/data/navigation';
import { useToolImage } from '@/hooks/useToolImage';
import { 
  Star, 
  ExternalLink, 
  Building2, 
  Users,
  Gift,
  Crown,
  Zap
} from 'lucide-react';

interface NavigationCardProps {
  item: NavItem;
  viewMode?: 'grid' | 'list'; // 新增可选的 viewMode 属性
}

const NavigationCard: React.FC<NavigationCardProps> = ({ 
  item, 
  viewMode = 'grid' // 默认为网格视图
}) => {
  const { imageSrc, isLoading, hasError, handleImageError } = useToolImage(
    item.title, 
    item.category, 
    'banner'
  );

  // 获取价格标签
  const getPricingBadge = (pricing?: string) => {
    switch (pricing) {
      case 'free':
        return { 
          label: '免费', 
          color: 'bg-success/20 text-success border-success/30',
          icon: Gift
        };
      case 'freemium':
        return { 
          label: '免费增值', 
          color: 'bg-accent/20 text-accent border-accent/30',
          icon: Zap
        };
      case 'paid':
        return { 
          label: '付费', 
          color: 'bg-warning/20 text-warning border-warning/30',
          icon: Crown
        };
      default:
        return null;
    }
  };

  // 获取评分星星
  const renderRating = (rating?: number) => {
    if (!rating) return null;
    
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <Star key={i} className="w-3 h-3 fill-warning text-warning" />
        );
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <div key={i} className="relative w-3 h-3">
            <Star className="w-3 h-3 text-gray-300 absolute" />
            <div className="overflow-hidden w-1.5">
              <Star className="w-3 h-3 fill-warning text-warning" />
            </div>
          </div>
        );
      } else {
        stars.push(
          <Star key={i} className="w-3 h-3 text-gray-300" />
        );
      }
    }
    
    return (
      <div className="flex items-center gap-1">
        {stars}
        <span className="text-xs font-medium text-text-light ml-1">
          {rating.toFixed(1)}
        </span>
      </div>
    );
  };

  // 网格视图（默认）
  if (viewMode === 'grid') {
    return (
      <div className="bg-secondary/80 backdrop-blur-sm border border-border-primary rounded-2xl shadow-dark-medium overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-dark-large hover:border-accent/50 group relative">
        <a href={item.link} target="_blank" rel="noopener noreferrer" className="block h-full">
          
          {/* 图片区域 */}
          <div className="relative h-48 w-full overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200">
            
            {/* 加载状态 */}
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 animate-pulse">
                <div className="w-8 h-8 border-2 border-slate-300 border-t-slate-500 rounded-full animate-spin"></div>
              </div>
            )}

            {/* 错误状态 */}
            {hasError ? (
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200">
                <div className="text-center p-4">
                  <div className="w-12 h-12 bg-slate-300 rounded-lg flex items-center justify-center mx-auto mb-2">
                    <svg className="w-6 h-6 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <p className="text-xs text-slate-600 font-medium">{item.title}</p>
                </div>
              </div>
            ) : (
              <Image
                src={imageSrc}
                alt={item.title}
                fill
                className={`object-cover transition-all duration-300 group-hover:scale-110 ${
                  isLoading ? 'opacity-0' : 'opacity-100'
                }`}
                onError={handleImageError}
                priority={false}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            )}
            
            {/* 价格标签 */}
            {item.pricing && (
              <div className="absolute top-3 left-3">
                {(() => {
                  const badge = getPricingBadge(item.pricing);
                  if (!badge) return null;
                  const IconComponent = badge.icon;
                  return (
                    <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-bold border backdrop-blur-sm ${badge.color}`}>
                      <IconComponent className="w-3 h-3" />
                      {badge.label}
                    </div>
                  );
                })()}
              </div>
            )}

            {/* 评分 */}
            {item.rating && (
              <div className="absolute top-3 right-3 bg-black/20 backdrop-blur-sm rounded-full px-2 py-1">
                {renderRating(item.rating)}
              </div>
            )}
            
            {/* 渐变遮罩 */}
            <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            {/* 悬停装饰 */}
            <div className="absolute bottom-3 right-3 w-8 h-8 bg-accent/20 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
              <ExternalLink className="w-4 h-4 text-accent" />
            </div>
          </div>
          
          {/* 内容区域 */}
          <div className="p-6 space-y-4">
            {/* 标题和公司 */}
            <div>
              <h3 className="text-lg font-semibold text-text-main group-hover:text-accent transition-colors duration-300 line-clamp-1 mb-1">
                {item.title}
              </h3>
              {item.company && (
                <p className="text-sm text-text-muted flex items-center gap-1">
                  <Building2 className="w-3 h-3" />
                  {item.company}
                </p>
              )}
            </div>
            
            {/* 描述 */}
            <p className="text-text-secondary text-sm leading-relaxed line-clamp-3 group-hover:text-text-light transition-colors duration-300">
              {item.description}
            </p>

            {/* 功能标签 */}
            {item.features && item.features.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {item.features.slice(0, 3).map((feature, index) => (
                  <span 
                    key={index}
                    className="inline-block px-2 py-1 text-xs bg-tertiary/50 text-text-muted rounded-md border border-border-secondary"
                  >
                    {feature}
                  </span>
                ))}
                {item.features.length > 3 && (
                  <span className="text-xs text-text-muted px-2 py-1">
                    +{item.features.length - 3}
                  </span>
                )}
              </div>
            )}
            
            {/* 底部信息 */}
            <div className="flex items-center justify-between pt-2">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-tertiary/50 text-text-light border border-border-secondary group-hover:bg-accent/10 group-hover:text-accent group-hover:border-accent/20 transition-all duration-300">
                {getCategoryDisplayName(item.category)}
              </span>
              
              {item.popularity && (
                <div className="flex items-center gap-1 text-xs text-text-muted">
                  <Users className="w-3 h-3" />
                  <span>{item.popularity}</span>
                </div>
              )}
            </div>
          </div>
          
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-accent to-accent-secondary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
        </a>
      </div>
    );
  }

  // 列表视图
  return (
    <div className="bg-secondary/80 backdrop-blur-sm border border-border-primary rounded-2xl shadow-dark-medium overflow-hidden transition-all duration-300 hover:shadow-dark-large hover:border-accent/50 group">
      <a href={item.link} target="_blank" rel="noopener noreferrer" className="block">
        <div className="flex flex-col md:flex-row">
          
          {/* 左侧图片 */}
          <div className="relative w-full md:w-48 h-32 md:h-40 flex-shrink-0 overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200">
            {hasError ? (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center p-4">
                  <Building2 className="w-8 h-8 text-slate-500 mx-auto mb-2" />
                  <p className="text-xs text-slate-600 font-medium">{item.title}</p>
                </div>
              </div>
            ) : (
              <Image
                src={imageSrc}
                alt={item.title}
                fill
                className="object-cover transition-all duration-300 group-hover:scale-105"
                onError={handleImageError}
              />
            )}

            {/* 价格标签 */}
            {item.pricing && (
              <div className="absolute top-2 left-2">
                {(() => {
                  const badge = getPricingBadge(item.pricing);
                  if (!badge) return null;
                  const IconComponent = badge.icon;
                  return (
                    <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-bold border backdrop-blur-sm ${badge.color}`}>
                      <IconComponent className="w-3 h-3" />
                      {badge.label}
                    </div>
                  );
                })()}
              </div>
            )}
          </div>

          {/* 右侧内容 */}
          <div className="flex-1 p-6">
            <div className="h-full flex flex-col">
              
              {/* 头部信息 */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-text-main group-hover:text-accent transition-colors duration-300 mb-1">
                    {item.title}
                  </h3>
                  <div className="flex items-center gap-4 text-sm text-text-muted">
                    {item.company && (
                      <span className="flex items-center gap-1">
                        <Building2 className="w-3 h-3" />
                        {item.company}
                      </span>
                    )}
                    {item.launchYear && (
                      <span className="flex items-center gap-1">
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                        </svg>
                        {item.launchYear}
                      </span>
                    )}
                  </div>
                </div>
                
                {/* 评分和热度 */}
                <div className="flex flex-col items-end gap-2 ml-4">
                  {item.rating && renderRating(item.rating)}
                  {item.popularity && (
                    <div className="flex items-center gap-1 text-xs text-text-muted">
                      <Users className="w-3 h-3" />
                      <span>{item.popularity}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* 描述 */}
              <p className="text-text-secondary leading-relaxed mb-4 flex-1">
                {item.description}
              </p>

              {/* 功能和标签 */}
              {(item.features || item.tags) && (
                <div className="mb-4">
                  <div className="flex flex-wrap gap-2">
                    {/* 主要功能 */}
                    {item.features?.slice(0, 4).map((feature, index) => (
                      <span 
                        key={`feature-${index}`}
                        className="inline-flex items-center gap-1 px-2 py-1 text-xs bg-accent/10 text-accent rounded-md border border-accent/20"
                      >
                        <Zap className="w-3 h-3" />
                        {feature}
                      </span>
                    ))}
                    
                    {/* 标签 */}
                    {item.tags?.slice(0, 3).map((tag, index) => (
                      <span 
                        key={`tag-${index}`}
                        className="inline-flex items-center gap-1 px-2 py-1 text-xs bg-tertiary/50 text-text-muted rounded-md border border-border-secondary"
                      >
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h5c.256 0 .512.098.707.293l7 7zM5 6a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                        </svg>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* 底部操作区 */}
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-tertiary/50 text-text-light border border-border-secondary group-hover:bg-accent/10 group-hover:text-accent group-hover:border-accent/20 transition-all duration-300">
                  {getCategoryDisplayName(item.category)}
                </span>
                
                <div className="flex items-center gap-2 text-accent group-hover:text-accent-secondary font-medium text-sm transition-colors duration-300">
                  <span>查看详情</span>
                  <ExternalLink className="w-4 h-4 transform group-hover:translate-x-0.5 transition-transform duration-300" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </a>
    </div>
  );
};

// 分类显示名称映射
function getCategoryDisplayName(category: string): string {
  const categoryMap: { [key: string]: string } = {
    'geo-suite': 'GEO套件',
    'content-generation': 'AI内容生成',
    'content-optimization': '内容优化',
    'keyword-research': '关键词研究',
    'brand-monitoring': '品牌监控',
    'ai-models': 'AI模型',
    'competitor-analysis': '竞争分析',
    'structured-data': '结构化数据',
    'local-seo': '本地SEO',
    'voice-search': '语音搜索',
    'ecommerce-seo': '电商SEO',
    'automation': '自动化',
  };
  return categoryMap[category] || category;
}

export default NavigationCard;