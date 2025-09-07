// src/lib/articleUtils.ts

// 定义API响应的类型接口
interface StrapiArticleData {
  id: number;
  title: string;
  slug: string;
  summary: string;
  content: string;
  author?: string;
  publishedAt: string;
  publish_time?: string;
  category?: string;
  tags?: string;
  createdAt?: string;
  updatedAt?: string;
}

interface StrapiPagination {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}

interface StrapiResponse {
  data: StrapiArticleData[];
  meta: {
    pagination: StrapiPagination;
  };
}

// 处理后的文章类型
export interface ProcessedArticle {
  id: number;
  title: string;
  slug: string;
  summary: string;
  content: string;
  author?: string;
  publishedAt: string;
  category?: string;
  tags?: string;
}

export enum SortOption {
  LATEST = 'latest',
  OLDEST = 'oldest', 
  TITLE_ASC = 'title_asc',
  TITLE_DESC = 'title_desc'
}

export const SORT_CONFIG = {
  [SortOption.LATEST]: {
    label: '最新发布',
    sorts: ['publishedAt:desc', 'createdAt:desc']
  },
  [SortOption.OLDEST]: {
    label: '最早发布', 
    sorts: ['publishedAt:asc', 'createdAt:asc']
  },
  [SortOption.TITLE_ASC]: {
    label: '标题 A-Z',
    sorts: ['title:asc', 'publishedAt:desc']
  },
  [SortOption.TITLE_DESC]: {
    label: '标题 Z-A', 
    sorts: ['title:desc', 'publishedAt:desc']
  }
};

// 分页获取文章的函数
export async function getArticlesPaginated({
  page = 1,
  pageSize = 12,
  sortBy = SortOption.LATEST,
  category,
  searchTerm,
  tag // 新增 tag 参数
}: {
  page?: number;
  pageSize?: number;
  sortBy?: SortOption;
  category?: string;
  searchTerm?: string;
  tag?: string; // 新增 tag 类型
}): Promise<{
  articles: ProcessedArticle[];
  totalArticles: number;
  totalPages: number;
  currentPage: number;
}> {
  const STRAPI_URL = 'https://api.ai-knowledgepoints.cn/api/articles';
  
  const params = new URLSearchParams();
  
  params.append('pagination[page]', page.toString());
  params.append('pagination[pageSize]', pageSize.toString());
  
  const sortConfig = SORT_CONFIG[sortBy];
  if (sortConfig && sortConfig.sorts) {
    sortConfig.sorts.forEach((sort, index) => {
      params.append(`sort[${index}]`, sort);
    });
  }
  
  params.append('filters[publishedAt][$notNull]', 'true');
  
  if (category) {
    params.append('filters[category][$eq]', category);
  }
  
  // [新增] 标签过滤逻辑
  if (tag) {
    params.append('filters[tags][$containsi]', tag);
  }
  
  if (searchTerm) {
    params.append('$or[0][title][$containsi]', searchTerm);
    params.append('$or[1][summary][$containsi]', searchTerm);
    params.append('$or[2][content][$containsi]', searchTerm);
  }
  
  const apiUrl = `${STRAPI_URL}?${params.toString()}`;
  
  try {
    // 关键改动：将 cache: 'no-store' 修改为 next: { revalidate: 3600 }
    // 这将启用增量静态再生（ISR），数据每小时重新验证一次，而不是每次请求都重新获取
    const response = await fetch(apiUrl, { 
      next: { revalidate: 3600 }, // 每小时重新验证一次
      headers: {
        'Content-Type': 'application/json',
      }
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`❌ API request failed with status: ${response.status}`);
      console.error('Response:', errorText);
      return { articles: [], totalArticles: 0, totalPages: 0, currentPage: page };
    }
    
    const data: StrapiResponse = await response.json();
    
    if (data.data) {
      const articles: ProcessedArticle[] = data.data.map((item: StrapiArticleData) => ({
        id: item.id,
        title: item.title,
        slug: item.slug,
        summary: item.summary,
        content: item.content,
        author: item.author,
        publishedAt: item.publishedAt || item.publish_time || '',
        category: item.category,
        tags: item.tags
      }));
      
      const totalArticles = data.meta?.pagination?.total ?? 0;
      const totalPages = data.meta?.pagination?.pageCount ?? 0;
      
      return { articles, totalArticles, totalPages, currentPage: page };
    }
    
    return { articles: [], totalArticles: 0, totalPages: 0, currentPage: page };
    
  } catch (error) {
    console.error('❌ Error fetching articles:', error);
    return { articles: [], totalArticles: 0, totalPages: 0, currentPage: page };
  }
}
