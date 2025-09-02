// src/components/Header.tsx (优化配色版本)
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  // 重新组织导航链接
  const navLinks = [
    { name: 'GEO资讯', href: '/insights' },
    { name: '工具导航', href: '/navigate' },
    { name: '工具评测', href: '/tools' },
    { name: '关于我们', href: '/about' },
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-secondary/90 backdrop-blur-md sticky top-0 z-[100] shadow-dark-large border-b border-border-primary">
      <nav className="container mx-auto flex items-center justify-between p-4">
        
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2 px-2 transition-transform duration-300 hover:scale-105 z-50 relative group">
          <Image
            src="/logo.svg"
            alt="GEO Nexus Logo"
            width={150}
            height={40}
            priority
            className="group-hover:drop-shadow-[0_0_8px_rgba(59,130,246,0.3)] transition-all duration-300"
          />
        </Link>

        {/* 桌面端导航链接 */}
        <ul className="hidden md:flex items-center space-x-2 bg-tertiary/50 backdrop-blur-sm rounded-full p-1.5 border border-border-secondary shadow-dark-soft">
          {navLinks.map((link) => {
            const isActive = pathname.startsWith(link.href);
            return (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className={`block px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 relative overflow-hidden ${
                    isActive
                      ? 'bg-gradient-to-r from-accent to-accent-secondary text-primary shadow-glow'
                      : 'text-text-secondary hover:text-text-main hover:bg-accent/10 hover:backdrop-blur-sm'
                  }`}
                >
                  {/* 活跃状态的装饰 */}
                  {isActive && (
                    <div className="absolute inset-0 bg-shimmer opacity-20"></div>
                  )}
                  <span className="relative z-10">{link.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>

        {/* 桌面端 CTA 按钮 */}
        <Link
          href="/consulting"
          className="hidden md:flex items-center gap-2 bg-gradient-to-r from-accent to-accent-secondary text-primary font-bold py-2.5 px-6 rounded-full hover:shadow-glow hover:scale-105 transition-all duration-300 relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-shimmer opacity-20"></div>
          <svg className="w-4 h-4 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          <span className="relative z-10 whitespace-nowrap">咨询服务</span>
        </Link>

        {/* 移动端菜单按钮 */}
        <div className="md:hidden z-50">
          <button
            onClick={toggleMenu}
            className="text-text-main focus:outline-none p-2 rounded-xl bg-tertiary/50 backdrop-blur-sm border border-border-secondary hover:bg-accent/10 transition-all duration-300"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X size={24} className="text-accent" />
            ) : (
              <Menu size={24} className="text-text-secondary" />
            )}
          </button>
        </div>

        {/* 移动端菜单 */}
        {isMenuOpen && (
          <>
            {/* 背景遮罩 */}
            <div 
              className="md:hidden fixed inset-0 bg-primary/80 backdrop-blur-lg z-40"
              onClick={toggleMenu}
            ></div>
            
            {/* 菜单内容 */}
            <div className="md:hidden fixed inset-0 z-45 flex flex-col items-center justify-center bg-gradient-to-br from-primary via-secondary to-primary">
              {/* 装饰性背景 */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-accent rounded-full mix-blend-multiply filter blur-xl"></div>
                <div className="absolute top-1/3 right-1/4 w-32 h-32 bg-accent-secondary rounded-full mix-blend-multiply filter blur-xl" style={{ animationDelay: '2s' }}></div>
                <div className="absolute bottom-1/4 left-1/2 w-32 h-32 bg-success rounded-full mix-blend-multiply filter blur-xl" style={{ animationDelay: '4s' }}></div>
              </div>
              
              {/* 菜单项 */}
              <ul className="flex flex-col items-center space-y-8 relative z-10">
                {navLinks.map((link, index) => (
                  <li key={link.name} className="animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                    <Link
                      href={link.href}
                      onClick={toggleMenu}
                      className="text-2xl font-semibold text-text-secondary hover:text-accent transition-all duration-300 px-6 py-3 rounded-xl hover:bg-accent/10 backdrop-blur-sm border border-transparent hover:border-accent/20"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
              
              {/* 移动端 CTA 按钮 */}
              <Link
                href="/consulting"
                onClick={toggleMenu}
                className="mt-12 bg-gradient-to-r from-accent to-accent-secondary text-primary font-bold py-4 px-8 rounded-full text-lg hover:scale-105 transition-all duration-300 shadow-glow relative overflow-hidden group"
                style={{ animationDelay: '400ms' }}
              >
                <div className="absolute inset-0 bg-shimmer opacity-20"></div>
                <span className="relative z-10 flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  咨询服务
                </span>
              </Link>
            </div>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;