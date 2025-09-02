// src/app/contact/page.tsx (优化配色版本)
'use client';

import { useState } from 'react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // 模拟提交延迟
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // 这里可以集成真实的表单提交逻辑
      console.log('表单数据:', formData);
      
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      console.error('提交失败:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-16 px-4 bg-primary min-h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        
        {/* 左侧：联系信息 */}
        <div className="bg-secondary/80 backdrop-blur-sm border border-border-primary rounded-2xl p-8 shadow-dark-medium">
          <header className="mb-8">
            <h1 className="text-4xl font-bold text-text-main mb-4 bg-gradient-to-r from-accent to-accent-secondary bg-clip-text text-transparent">
              联系我们
            </h1>
            <p className="text-lg text-text-secondary">
              有问题或建议？我们很乐意听到您的声音
            </p>
          </header>

          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-accent/20 to-accent/10 backdrop-blur-sm rounded-xl flex items-center justify-center flex-shrink-0 border border-accent/20">
                <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-text-main mb-2">邮箱地址</h3>
                <p className="text-text-secondary">contact@geo-nexus.com</p>
                <p className="text-text-secondary">support@geo-nexus.com</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-success/20 to-success/10 backdrop-blur-sm rounded-xl flex items-center justify-center flex-shrink-0 border border-success/20">
                <svg className="w-6 h-6 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-text-main mb-2">办公地址</h3>
                <p className="text-text-secondary">中国 上海市</p>
                <p className="text-text-secondary">浦东新区张江高科技园区</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-accent-secondary/20 to-accent-secondary/10 backdrop-blur-sm rounded-xl flex items-center justify-center flex-shrink-0 border border-accent-secondary/20">
                <svg className="w-6 h-6 text-accent-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-text-main mb-2">工作时间</h3>
                <p className="text-text-secondary">周一至周五: 9:00 - 18:00</p>
                <p className="text-text-secondary">周六: 10:00 - 16:00</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-warning/20 to-warning/10 backdrop-blur-sm rounded-xl flex items-center justify-center flex-shrink-0 border border-warning/20">
                <svg className="w-6 h-6 text-warning" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-text-main mb-2">响应时间</h3>
                <p className="text-text-secondary">通常在 24 小时内回复</p>
                <p className="text-text-secondary">紧急事务会优先处理</p>
              </div>
            </div>
          </div>
        </div>

        {/* 右侧：联系表单 */}
        <div className="bg-secondary/80 backdrop-blur-sm border border-border-primary rounded-2xl p-8 shadow-dark-medium">
          <h2 className="text-2xl font-bold text-text-main mb-6 flex items-center gap-2">
            <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
            发送消息
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* 姓名 */}
            <div>
              <label htmlFor="name" className="block text-sm font-semibold text-text-main mb-3">
                姓名 *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border-2 border-border-secondary rounded-xl bg-tertiary/50 backdrop-blur-sm text-text-main placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition-all duration-200"
                placeholder="请输入您的姓名"
              />
            </div>

            {/* 邮箱 */}
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-text-main mb-3">
                邮箱地址 *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border-2 border-border-secondary rounded-xl bg-tertiary/50 backdrop-blur-sm text-text-main placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition-all duration-200"
                placeholder="your@email.com"
              />
            </div>

            {/* 主题 */}
            <div>
              <label htmlFor="subject" className="block text-sm font-semibold text-text-main mb-3">
                主题 *
              </label>
              <select
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border-2 border-border-secondary rounded-xl bg-tertiary/50 backdrop-blur-sm text-text-main focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition-all duration-200"
              >
                <option value="" className="bg-tertiary text-text-muted">请选择主题</option>
                <option value="general" className="bg-tertiary text-text-main">一般咨询</option>
                <option value="technical" className="bg-tertiary text-text-main">技术支持</option>
                <option value="business" className="bg-tertiary text-text-main">商务合作</option>
                <option value="feedback" className="bg-tertiary text-text-main">意见反馈</option>
                <option value="bug" className="bg-tertiary text-text-main">错误报告</option>
                <option value="other" className="bg-tertiary text-text-main">其他</option>
              </select>
            </div>

            {/* 消息内容 */}
            <div>
              <label htmlFor="message" className="block text-sm font-semibold text-text-main mb-3">
                消息内容 *
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={6}
                className="w-full px-4 py-3 border-2 border-border-secondary rounded-xl bg-tertiary/50 backdrop-blur-sm text-text-main placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent resize-vertical transition-all duration-200"
                placeholder="请详细描述您的问题或需求..."
              ></textarea>
            </div>

            {/* 提交状态消息 */}
            {submitStatus === 'success' && (
              <div className="p-4 bg-success/10 border border-success/20 rounded-xl text-success backdrop-blur-sm">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  消息发送成功！我们会尽快回复您。
                </div>
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="p-4 bg-error/10 border border-error/20 rounded-xl text-error backdrop-blur-sm">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  发送失败，请稍后重试或直接发送邮件至 contact@geo-nexus.com
                </div>
              </div>
            )}

            {/* 提交按钮 */}
            <button
              type="submit"
              disabled={isSubmitting || !formData.name || !formData.email || !formData.subject || !formData.message}
              className="w-full px-8 py-4 bg-gradient-to-r from-accent to-accent-secondary text-primary rounded-xl hover:shadow-glow disabled:from-text-muted disabled:to-text-muted disabled:cursor-not-allowed transition-all duration-200 font-medium focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-primary flex items-center justify-center gap-2 disabled:shadow-none"
            >
              {isSubmitting ? (
                <>
                  <svg className="w-5 h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  发送中...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                  发送消息
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}