// src/app/contact/layout.tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '联系我们 | GEO Nexus',
  description: '联系 GEO Nexus 团队，获取技术支持、商务合作或提供意见反馈',
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
