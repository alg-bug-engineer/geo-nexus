// src/components/NavigationCard.tsx (优化配色版本)
import React from 'react';
import Image from 'next/image';
import { NavItem } from '@/data/navigation';

interface NavigationCardProps {
  item: NavItem;
}

const NavigationCard: React.FC<NavigationCardProps> = ({ item }) => {
  return (
    <div className="bg-secondary/80 backdrop-blur-sm border border-border-primary rounded-2xl shadow-dark-medium overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-dark-large hover:border-accent/50 group relative">
      <a href={item.link} target="_blank" rel="noopener noreferrer" className="block h-full">
        {/* 图片区域 */}
        <div className="relative h-48 w-full overflow-hidden">
          <Image
            src={item.imageUrl}
            alt={item.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-110"
            onError={(e) => {
              e.currentTarget.src = `https://placehold.co/400x200/334155/cbd5e1?text=${encodeURIComponent(item.title)}`;
            }}
          />
          {/* 渐变遮罩 */}
          <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          
          {/* 悬停时的装饰 */}
          <div className="absolute top-3 right-3 w-8 h-8 bg-accent/20 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
            <svg className="w-4 h-4 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </div>
        </div>
        
        {/* 内容区域 */}
        <div className="p-6 space-y-4">
          {/* 标题 */}
          <h3 className="text-lg font-semibold text-text-main group-hover:text-accent transition-colors duration-300 line-clamp-1">
            {item.title}
          </h3>
          
          {/* 描述 */}
          <p className="text-text-secondary text-sm leading-relaxed line-clamp-3 group-hover:text-text-light transition-colors duration-300">
            {item.description}
          </p>
          
          {/* 底部区域 */}
          <div className="flex items-center justify-between pt-2">
            {/* 分类标签 */}
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-tertiary/50 text-text-light border border-border-secondary group-hover:bg-accent/10 group-hover:text-accent group-hover:border-accent/20 transition-all duration-300">
              {getCategoryDisplayName(item.category)}
            </span>
            
            {/* 访问指示器 */}
            <div className="flex items-center gap-1 text-xs text-text-muted group-hover:text-accent transition-colors duration-300">
              <span>访问</span>
              <svg className="w-3 h-3 transform group-hover:translate-x-0.5 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </div>
        
        {/* 底部装饰线 */}
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-accent to-accent-secondary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
      </a>
    </div>
  );
};

// 分类名称映射函数
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