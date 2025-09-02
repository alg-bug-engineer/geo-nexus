/*
 * @filename: alg-bug-engineer/geo-nexus/geo-nexus-c0022f76688310702ab7bc516010d393a92d80dc/src/components/Header.tsx
 */
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  // 重新组织导航链接，区分“工具导航”和“工具评测”
  const navLinks = [
    { name: 'GEO资讯', href: '/insights' },
    { name: '工具导航', href: '/navigate' }, // 新的导航页
    { name: '工具评测', href: '/tools' },   // 保留的评测页
    { name: '关于我们', href: '/about' },
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-primary-blue/95 backdrop-blur-md sticky top-0 z-[100] shadow-lg border-b border-white/10">
      <nav className="container mx-auto flex items-center justify-between p-4 text-text-main">
        
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2 px-2 transition-transform duration-300 hover:scale-105 z-50">
          <Image
            src="/logo.svg"
            alt="GEO Nexus Logo"
            width={150}
            height={40}
            priority
          />
        </Link>

        {/* 桌面端导航链接 */}
        <ul className="hidden md:flex items-center space-x-2 bg-secondary/30 backdrop-blur-sm rounded-full p-1 border border-white/10">
          {navLinks.map((link) => {
            const isActive = pathname.startsWith(link.href);
            return (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className={`block px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    isActive
                      ? 'bg-accent-blue text-text-main shadow-md'
                      : 'text-text-secondary hover:text-text-main hover:bg-accent-blue/50'
                  }`}
                >
                  {link.name}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* 桌面端 CTA 按钮 */}
        <Link
          href="/consulting"
          className="hidden md:block bg-accent-blue/90 backdrop-blur-sm text-primary font-bold py-2 px-5 rounded-full hover:bg-accent-blue hover:scale-105 hover:shadow-lg hover:shadow-accent-blue/30 transition-all duration-300 whitespace-nowrap border border-accent-blue/20"
        >
          咨询服务
        </Link>

        {/* 移动端菜单按钮 */}
        <div className="md:hidden z-50">
          <button
            onClick={toggleMenu}
            className="text-white focus:outline-none"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* 移动端菜单 */}
        {isMenuOpen && (
          <div className="md:hidden fixed inset-0 bg-primary-blue/95 backdrop-blur-lg z-40 flex flex-col items-center justify-center">
            <ul className="flex flex-col items-center space-y-8">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    onClick={toggleMenu}
                    className="text-2xl font-semibold text-text-secondary hover:text-text-main transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              href="/consulting"
              onClick={toggleMenu}
              className="mt-12 bg-accent-blue text-primary font-bold py-3 px-8 rounded-full text-lg hover:scale-105 transition-transform duration-300"
            >
              咨询服务
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;