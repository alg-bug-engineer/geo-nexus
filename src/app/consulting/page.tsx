// src/app/consulting/page.tsx
"use client"; // <-- IMPORTANT: This makes the component interactive

import { useState } from 'react';
// We don't need Metadata here anymore since it's a client component.
// You can move the metadata to a `layout.tsx` file if needed.

export default function ConsultingPage() {
  // State to hold the form input values
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
  });

  // State to manage the submission status
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', company: '', message: '' }); // Clear form
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error('Submission error:', error);
      setStatus('error');
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-16 px-4">
      <header className="text-center mb-20">
        <h1 className="text-4xl md:text-6xl font-bold text-text-main mb-6 leading-tight">
          让您的业务在 <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-accent-blue">
            AI 时代脱颖而出
          </span>
        </h1>
        <p className="text-xl text-text-secondary max-w-3xl mx-auto">
          我们提供专业的生成式引擎优化（GEO）咨询，帮助您将挑战转化为增长机遇。
        </p>
      </header>
      
      {/* ... (The "Problems We Solve" section remains the same) ... */}
      <section className="mb-20">
        <h2 className="text-3xl font-bold text-center mb-12 text-text-main">我们为您解决的问题</h2>
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div className="bg-secondary p-8 rounded-xl border border-transparent hover:border-accent-blue/50 hover:scale-105 transition-all duration-300">
            <h3 className="text-xl font-bold text-accent-blue mb-3">内容AI友好度低</h3><p className="text-text-secondary">优化您的内容策略，确保其在AI驱动的搜索结果中获得最佳表现。</p>
          </div>
          <div className="bg-secondary p-8 rounded-xl border border-transparent hover:border-accent-blue/50 hover:scale-105 transition-all duration-300">
            <h3 className="text-xl font-bold text-accent-blue mb-3">搜索可见性下降</h3><p className="text-text-secondary">分析并实施最新的GEO技术，扭转流量颓势，提升品牌曝光。</p>
          </div>
          <div className="bg-secondary p-8 rounded-xl border border-transparent hover:border-accent-blue/50 hover:scale-105 transition-all duration-300">
            <h3 className="text-xl font-bold text-accent-blue mb-3">AI工具选择困难</h3><p className="text-text-secondary">根据您的业务需求，为您推荐并指导使用最高效、性价比最高的AI工具。</p>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-br from-secondary to-primary-blue p-8 md:p-12 rounded-2xl border border-accent-blue/30 shadow-2xl shadow-accent-blue/10">
        <h2 className="text-3xl font-bold text-center mb-8 text-text-main">开启您的GEO优化之旅</h2>
        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-2 text-text-secondary">姓名</label>
            <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required className="w-full bg-primary/80 border border-secondary text-text-main rounded-lg py-3 px-4 focus:ring-2 focus:ring-accent-blue focus:outline-none transition-colors" />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-2 text-text-secondary">邮箱</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required className="w-full bg-primary/80 border border-secondary text-text-main rounded-lg py-3 px-4 focus:ring-2 focus:ring-accent-blue focus:outline-none transition-colors" />
          </div>
          <div>
            <label htmlFor="company" className="block text-sm font-medium mb-2 text-text-secondary">公司 (可选)</label>
            <input type="text" id="company" name="company" value={formData.company} onChange={handleChange} className="w-full bg-primary/80 border border-secondary text-text-main rounded-lg py-3 px-4 focus:ring-2 focus:ring-accent-blue focus:outline-none transition-colors" />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium mb-2 text-text-secondary">简述您的需求</label>
            <textarea id="message" name="message" rows={4} value={formData.message} onChange={handleChange} required className="w-full bg-primary/80 border border-secondary text-text-main rounded-lg py-3 px-4 focus:ring-2 focus:ring-accent-blue focus:outline-none transition-colors"></textarea>
          </div>
          <div className="text-center pt-4">
            <button type="submit" disabled={status === 'loading'} className="bg-accent-blue text-primary font-bold py-3 px-10 rounded-full hover:scale-105 hover:shadow-lg hover:shadow-accent-blue/30 transition-all text-lg whitespace-nowrap disabled:bg-gray-500 disabled:scale-100 disabled:cursor-not-allowed">
              {status === 'loading' ? '正在提交...' : '提交并获取免费咨询'}
            </button>
            {status === 'success' && <p className="text-green-400 mt-4">感谢您的提交！我们会尽快与您联系。</p>}
            {status === 'error' && <p className="text-red-400 mt-4">提交失败，请稍后重试。</p>}
          </div>
        </form>
      </section>
    </div>
  );
}