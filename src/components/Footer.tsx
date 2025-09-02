// src/components/Footer.tsx
import Link from 'next/link';

export const Footer = () => {
  const year = new Date().getFullYear();
  const icpNumber = '鲁ICP备2024085839号';

  // 友情链接数据
  const friendlyLinks = {
    seoAuthorities: [
      { name: 'Moz', url: 'https://moz.com', description: 'SEO权威指南' },
      { name: 'Search Engine Journal', url: 'https://www.searchenginejournal.com', description: 'SEO新闻资讯' },
      { name: 'Search Engine Land', url: 'https://searchengineland.com', description: '搜索引擎资讯' },
      { name: 'Ahrefs Blog', url: 'https://ahrefs.com/blog', description: 'SEO工具博客' }
    ],
    aiTech: [
      { name: 'OpenAI', url: 'https://openai.com', description: 'AI技术领导者' },
      { name: 'Google AI', url: 'https://ai.google', description: 'Google AI研究' },
      { name: 'Anthropic', url: 'https://www.anthropic.com', description: 'AI安全研究' },
      { name: 'Perplexity', url: 'https://www.perplexity.ai', description: 'AI搜索引擎' }
    ],
    marketing: [
      { name: 'Content Marketing Institute', url: 'https://contentmarketinginstitute.com', description: '内容营销权威' },
      { name: 'HubSpot Blog', url: 'https://blog.hubspot.com', description: '营销自动化' },
      { name: 'MarketingProfs', url: 'https://www.marketingprofs.com', description: '营销教育平台' },
      { name: 'Neil Patel', url: 'https://neilpatel.com', description: '数字营销专家' }
    ]
  };

  // 网站内部导航
  const siteLinks = {
    main: [
      { name: 'GEO资讯', href: '/insights' },
      { name: '工具导航', href: '/navigate' },
      { name: '工具评测', href: '/tools' },
      { name: '咨询服务', href: '/consulting' }
    ],
    company: [
      { name: '关于我们', href: '/about' },
      { name: '联系方式', href: '/contact' },
      { name: '隐私政策', href: '/privacy-policy' }
    ]
  };

  return (
    <footer className="bg-primary border-t border-gray-800">
      <div className="container mx-auto px-4 py-12">
        {/* 主要内容区域 */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-8">
          
          {/* 网站介绍 */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="text-2xl font-bold text-text-main">GEO Nexus</div>
            </div>
            <p className="text-text-secondary text-sm leading-relaxed mb-6">
              领先的生成式引擎优化（GEO）资讯与工具评测中心，助您在AI时代脱颖而出。
            </p>
            
            {/* 可选：社交媒体链接 */}
            <div className="flex space-x-3">
              <a 
                href="mailto:contact@geo-nexus.com" 
                className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center text-text-secondary hover:text-accent hover:bg-accent/10 transition-colors"
                aria-label="邮箱"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                </svg>
              </a>
              <a 
                href="#" 
                className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center text-text-secondary hover:text-accent hover:bg-accent/10 transition-colors"
                aria-label="微信"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 0 1 .213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 0 0 .167-.054l1.903-1.114a.864.864 0 0 1 .717-.098 10.16 10.16 0 0 0 2.837.403c.276 0 .543-.027.811-.05-.857-2.578.157-4.972 1.932-6.446 1.703-1.415 3.882-1.98 5.853-1.838-.576-3.583-4.196-6.348-8.596-6.348zM5.785 5.991c.642 0 1.162.529 1.162 1.18 0 .659-.52 1.188-1.162 1.188-.642 0-1.162-.529-1.162-1.188 0-.651.52-1.18 1.162-1.18zm5.813 0c.642 0 1.162.529 1.162 1.18 0 .659-.52 1.188-1.162 1.188-.642 0-1.162-.529-1.162-1.188 0-.651.52-1.18 1.162-1.18zm5.34 2.867c-1.797-.052-3.746.512-5.28 1.786-1.72 1.428-2.687 3.72-1.78 6.22.942 2.453 3.666 4.229 6.884 4.229 2.098 0 3.862-.53 5.253-1.42l1.194.685c.042.02.089.038.135.038.133 0 .241-.11.241-.234 0-.06-.023-.12-.038-.177l-.307-1.141a.463.463 0 0 1 .167-.525C23.035 17.466 24 15.942 24 14.235c0-3.699-3.146-6.7-7.062-6.7zm-2.68 2.52c.54 0 .97.436.97.974 0 .546-.43.982-.97.982-.54 0-.97-.436-.97-.982 0-.538.43-.974.97-.974zm5.34 0c.54 0 .97.436.97.974 0 .546-.43.982-.97.982-.54 0-.97-.436-.97-.982 0-.538.43-.974.97-.974z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* 网站导航 */}
          <div>
            <h4 className="text-text-main font-semibold mb-4">网站导航</h4>
            <div className="space-y-3">
              {siteLinks.main.map((link) => (
                <Link 
                  key={link.name}
                  href={link.href}
                  className="block text-text-secondary hover:text-accent transition-colors text-sm"
                >
                  {link.name}
                </Link>
              ))}
            </div>
            
            <h5 className="text-text-main font-semibold mt-6 mb-3">公司信息</h5>
            <div className="space-y-3">
              {siteLinks.company.map((link) => (
                <Link 
                  key={link.name}
                  href={link.href}
                  className="block text-text-secondary hover:text-accent transition-colors text-sm"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* SEO & AI 权威网站 */}
          <div>
            <h4 className="text-text-main font-semibold mb-4">SEO权威资源</h4>
            <div className="space-y-3 mb-6">
              {friendlyLinks.seoAuthorities.map((link) => (
                <a 
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-text-secondary hover:text-accent transition-colors text-sm"
                  title={link.description}
                >
                  {link.name}
                </a>
              ))}
            </div>

            <h5 className="text-text-main font-semibold mb-3">AI技术平台</h5>
            <div className="space-y-3">
              {friendlyLinks.aiTech.map((link) => (
                <a 
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-text-secondary hover:text-accent transition-colors text-sm"
                  title={link.description}
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>

          {/* 营销资源 */}
          <div>
            <h4 className="text-text-main font-semibold mb-4">营销资源</h4>
            <div className="space-y-3">
              {friendlyLinks.marketing.map((link) => (
                <a 
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-text-secondary hover:text-accent transition-colors text-sm"
                  title={link.description}
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* 分割线 */}
        <div className="border-t border-gray-800 pt-8">
          {/* 底部信息 */}
          <div className="flex flex-col md:flex-row justify-between items-center text-text-light text-sm">
            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6">
              <p>© {year} GEO Nexus. All Rights Reserved.</p>
              <a
                href="http://beian.miit.gov.cn/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-accent transition-colors"
              >
                {icpNumber}
              </a>
            </div>
            
            {/* 友情链接声明 */}
            <div className="mt-4 md:mt-0">
              <p className="text-xs text-text-secondary">
                友情链接仅为用户提供参考，不代表本站立场
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};