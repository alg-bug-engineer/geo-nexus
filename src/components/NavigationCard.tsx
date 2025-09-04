
// ===========================================
// 5. 增强的 NavigationCard 组件
// ===========================================

// src/components/NavigationCard.tsx
import React from 'react';
import Image from 'next/image';
import { NavItem } from '@/data/navigation';
import { useToolImage } from '@/hooks/useToolImage';

interface NavigationCardProps {
  item: NavItem;
}

const NavigationCard: React.FC<NavigationCardProps> = ({ item }) => {
  const { imageSrc, isLoading, hasError, handleImageError } = useToolImage(
    item.title, 
    item.category, 
    'banner'
  );

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
          
          {/* 渐变遮罩 */}
          <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          
          {/* 悬停装饰 */}
          <div className="absolute top-3 right-3 w-8 h-8 bg-accent/20 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
            <svg className="w-4 h-4 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </div>
        </div>
        
        {/* 内容区域 */}
        <div className="p-6 space-y-4">
          <h3 className="text-lg font-semibold text-text-main group-hover:text-accent transition-colors duration-300 line-clamp-1">
            {item.title}
          </h3>
          
          <p className="text-text-secondary text-sm leading-relaxed line-clamp-3 group-hover:text-text-light transition-colors duration-300">
            {item.description}
          </p>
          
          <div className="flex items-center justify-between pt-2">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-tertiary/50 text-text-light border border-border-secondary group-hover:bg-accent/10 group-hover:text-accent group-hover:border-accent/20 transition-all duration-300">
              {getCategoryDisplayName(item.category)}
            </span>
            
            <div className="flex items-center gap-1 text-xs text-text-muted group-hover:text-accent transition-colors duration-300">
              <span>访问</span>
              <svg className="w-3 h-3 transform group-hover:translate-x-0.5 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-accent to-accent-secondary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
      </a>
    </div>
  );
};

function getCategoryDisplayName(category: string): string {
  const categoryMap: { [key: string]: string } = {
    'geo-suite': 'GEO套件',
    'content-generation': 'AI内容生成',
    'content-optimization': '内容优化与分析',
    'keyword-research': '关键词与趋势研究',
    'visibility-monitoring': '品牌可见度监控',
  };
  return categoryMap[category] || category;
}

export default NavigationCard;