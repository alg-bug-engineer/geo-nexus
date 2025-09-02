// src/app/layout.tsx
import type { Metadata } from 'next'
import Script from 'next/script'; // 1. Import the Script component
import './globals.css'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'

export const metadata: Metadata = {
  title: 'GEO Nexus - Your GEO Intelligence Hub',
  description: 'The leading Generative Engine Optimization (GEO) information and tool evaluation center.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        {/* AdSense Script */}
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4749029061464896"
          crossOrigin="anonymous"></script>
        
        {/* Google Analytics Scripts (Corrected and Optimized) */}
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
      </head>
      {/* I also corrected your body's className to use the main text color for the light theme */}
      <body className='bg-primary text-text-main'> 
        <div className="flex flex-col min-h-screen">
          <Header />
          {/* 修复：为sticky header添加padding-top，避免内容重叠 */}
          <main className="flex-grow container mx-auto p-4 md:p-8 pt-20 md:pt-24">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  )
}