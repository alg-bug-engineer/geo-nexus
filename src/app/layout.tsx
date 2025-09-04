// src/app/layout.tsx (更新AdSense配置)
import type { Metadata } from 'next'
import Script from 'next/script';
import './globals.css'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'

export const metadata: Metadata = {
  title: 'GEO Nexus - Your GEO Intelligence Hub',
  description: 'The leading Generative Engine Optimization (GEO) information and tool evaluation center.',
  keywords: ['GEO', '生成式引擎优化', 'AI工具', 'SEO', '数字营销'],
  authors: [{ name: 'GEO Nexus Team' }],
}

// 添加这个新的导出：
export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#3b82f6',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN" className="scroll-smooth dark"> 

      <head>
        {/* ✅ 更新后的 AdSense Script - 使用新的 client ID */}
        <script 
          async 
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6590151921493796"
          crossOrigin="anonymous"
        />
        
        {/* Google Analytics Scripts */}
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=G-LWQ658HC60`}
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-LWQ658HC60');
            `,
          }}
        />
        
        {/* 预加载关键资源 */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        
        {/* PWA配置 */}
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="msapplication-TileColor" content="#3b82f6" />
      </head>
      
      <body className='bg-primary text-text-main antialiased selection:bg-accent/20 selection:text-accent min-h-screen'>
        {/* 全局背景装饰 */}
        <div className="fixed inset-0 pointer-events-none">
          {/* 主背景渐变 */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary via-secondary/20 to-primary"></div>
          
          {/* 动态背景光点 */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent/30 rounded-full mix-blend-multiply filter blur-3xl"></div>
            <div className="absolute top-0 right-1/4 w-96 h-96 bg-accent-secondary/30 rounded-full mix-blend-multiply filter blur-3xl" style={{ animationDelay: '2s' }}></div>
            <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-success/20 rounded-full mix-blend-multiply filter blur-3xl" style={{ animationDelay: '4s' }}></div>
          </div>
          
          {/* 网格背景 */}
          <div className="absolute inset-0 opacity-[0.02]">
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(59,130,246,0.3)_1px,transparent_1px),linear-gradient(180deg,rgba(59,130,246,0.3)_1px,transparent_1px)] bg-[size:100px_100px]"></div>
          </div>
        </div>
        
        {/* 主要布局容器 */}
        <div className="relative z-10 flex flex-col min-h-screen">
          {/* 头部导航 */}
          <Header />
          
          {/* 主内容区域 */}
          <main className="flex-grow">
            {children}
          </main>
          
          {/* 页脚 */}
          <Footer />
        </div>
        
        {/* 全局加载状态装饰 */}
        <div id="loading-overlay" className="fixed inset-0 bg-primary/90 backdrop-blur-md z-[9999] flex items-center justify-center pointer-events-none opacity-0 transition-opacity duration-300">
          <div className="flex flex-col items-center space-y-4">
            <div className="w-12 h-12 border-4 border-accent/20 border-t-accent rounded-full"></div>
            <p className="text-text-secondary text-sm">正在加载中...</p>
          </div>
        </div>
        
        {/* 返回顶部按钮 */}
        <button 
          id="back-to-top"
          className="fixed bottom-8 right-8 w-12 h-12 bg-gradient-to-r from-accent to-accent-secondary text-primary rounded-full shadow-glow hover:shadow-[0_0_30px_rgba(59,130,246,0.4)] transition-all duration-300 transform hover:scale-110 z-50 opacity-0 pointer-events-none"
          aria-label="返回顶部"
        >
          <svg className="w-5 h-5 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </button>
        
        {/* 客户端脚本 */}
        <Script id="client-scripts" strategy="afterInteractive">
          {`
            // 返回顶部按钮逻辑
            window.addEventListener('scroll', function() {
              const backToTop = document.getElementById('back-to-top');
              if (window.scrollY > 300) {
                backToTop.style.opacity = '1';
                backToTop.style.pointerEvents = 'auto';
              } else {
                backToTop.style.opacity = '0';
                backToTop.style.pointerEvents = 'none';
              }
            });
            // 添加返回顶部点击事件
            document.getElementById('back-to-top')?.addEventListener('click', function() {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            });
            
            // 平滑滚动增强
            document.addEventListener('click', function(e) {
              if (e.target.tagName === 'A' && e.target.getAttribute('href')?.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(e.target.getAttribute('href'));
                if (target) {
                  target.scrollIntoView({ behavior: 'smooth' });
                }
              }
            });
            
            // 性能优化：图片懒加载
            if ('IntersectionObserver' in window) {
              const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                  if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                  }
                });
              });
              
              document.querySelectorAll('img[data-src]').forEach(img => {
                imageObserver.observe(img);
              });
            }
            
            // 页面切换时的加载状态
            let loadingTimeout;
            document.addEventListener('click', function(e) {
              if (e.target.tagName === 'A' && e.target.href && !e.target.href.includes('#') && !e.target.target) {
                const overlay = document.getElementById('loading-overlay');
                overlay.style.opacity = '1';
                overlay.style.pointerEvents = 'auto';
                
                // 防止加载状态卡住
                loadingTimeout = setTimeout(() => {
                  overlay.style.opacity = '0';
                  overlay.style.pointerEvents = 'none';
                }, 3000);
              }
            });
            
            window.addEventListener('beforeunload', () => {
              clearTimeout(loadingTimeout);
            });
          `}
        </Script>
      </body>
    </html>
  )
}