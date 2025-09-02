// src/components/Footer.tsx
import Link from 'next/link';

export const Footer = () => {
  const year = new Date().getFullYear();
  const icpNumber = '鲁ICP备2024085839号';

  return (
    <footer className="bg-primary border-t border-gray-800">
      <div className="container mx-auto p-8 text-center text-text-light">
        {/* 导航链接 */}
        <div className="flex justify-center space-x-6 mb-4">
          <Link href="/about" className="hover:text-accent">关于我们</Link>
          <Link href="/privacy-policy" className="hover:text-accent">隐私政策</Link>
          <Link href="/contact" className="hover:text-accent">联系方式</Link>
        </div>

        {/* 版权信息 */}
        <p className="mb-2">© {year} GEO Nexus. All Rights Reserved.</p>
        
        {/* ICP 备案号 */}
        <a
          href="http://beian.miit.gov.cn/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-accent" // 与其他链接样式保持一致
        >
          {icpNumber}
        </a>
      </div>
    </footer>
  );
};
