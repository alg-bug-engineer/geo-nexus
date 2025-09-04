
// ===========================================
// 4. React Hook for 图片管理
// ===========================================

// src/hooks/useToolImage.ts
import { useState, useEffect } from 'react';
import { getToolImage } from '@/utils/localImageUtils';

export function useToolImage(
  toolName: string, 
  category?: string,
  type: 'banner' | 'logo' = 'banner'
) {
  const [imageSrc, setImageSrc] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setHasError(false);
    
    const src = getToolImage(toolName, type, category);
    setImageSrc(src);
    setIsLoading(false);
  }, [toolName, category, type]);

  const handleImageError = () => {
    setHasError(true);
    // 尝试使用fallback图片
    const fallbackSrc = getToolImage(toolName, 'banner', category);
    if (imageSrc !== fallbackSrc) {
      setImageSrc(fallbackSrc);
    }
  };

  return {
    imageSrc,
    isLoading,
    hasError,
    handleImageError
  };
}
