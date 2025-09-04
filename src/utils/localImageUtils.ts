
// ===========================================
// 3. 图片管理工具函数
// ===========================================

// src/utils/localImageUtils.ts
import { TOOL_IMAGE_CONFIGS, CATEGORY_IMAGES, type ToolImageConfig } from '@/config/imageConfig';

/**
 * 根据工具名称获取工具配置
 */
export function getToolConfig(toolName: string): ToolImageConfig | null {
  const normalizedName = normalizeToolName(toolName);
  return TOOL_IMAGE_CONFIGS.find(config => 
    config.id === normalizedName || 
    config.name.toLowerCase() === toolName.toLowerCase()
  ) || null;
}

/**
 * 标准化工具名称为ID格式
 */
export function normalizeToolName(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '')  // 移除特殊字符
    .replace(/\s+/g, '-')         // 空格转换为连字符
    .replace(/-+/g, '-')          // 多个连字符合并为一个
    .replace(/^-|-$/g, '');       // 移除首尾连字符
}

/**
 * 获取工具的主要展示图片（用于卡片）
 */
export function getToolImage(
  toolName: string, 
  type: 'banner' | 'logo' = 'banner',
  category?: string
): string {
  const config = getToolConfig(toolName);
  
  if (config) {
    const imagePath = type === 'banner' ? config.banner : config.logo;
    if (imagePath) {
      return imagePath;
    }
  }
  
  // 回退到分类默认图片
  if (category && category in CATEGORY_IMAGES) {
    return CATEGORY_IMAGES[category as keyof typeof CATEGORY_IMAGES];
  }
  
  // 最终回退图片
  return '/images/tools/default/fallback.webp';
}

/**
 * 获取工具的所有可用图片
 */
export function getToolImages(toolName: string): {
  logo?: string;
  banner?: string;
  screenshots: string[];
  fallback: string;
} {
  const config = getToolConfig(toolName);
  
  const result = {
    logo: config?.logo,
    banner: config?.banner,
    screenshots: [] as string[],
    fallback: getToolImage(toolName, 'banner', config?.category)
  };
  
  // 如果有截图，生成截图路径
  if (config?.hasScreenshots) {
    const screenshotBase = `/images/tools/screenshots/${config.id}`;
    result.screenshots = [
      `${screenshotBase}/main.webp`,
      `${screenshotBase}/interface.webp`,
      `${screenshotBase}/features.webp`,
    ];
  }
  
  return result;
}

/**
 * 检查图片是否存在（可选：用于开发时调试）
 */
export async function checkImageExists(imagePath: string): Promise<boolean> {
  if (typeof window === 'undefined') return true; // SSR环境下直接返回true
  
  try {
    const response = await fetch(imagePath, { method: 'HEAD' });
    return response.ok;
  } catch {
    return false;
  }
}

/**
 * 生成响应式图片源集
 */
export function generateImageSrcSet(basePath: string, sizes: number[]): string {
  return sizes
    .map(size => {
      const extension = basePath.split('.').pop();
      const pathWithoutExt = basePath.replace(`.${extension}`, '');
      return `${pathWithoutExt}@${size}w.${extension} ${size}w`;
    })
    .join(', ');
}
