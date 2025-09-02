// src/app/privacy-policy/page.tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '隐私政策 | GEO Nexus',
  description: 'GEO Nexus 隐私政策和数据保护声明',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto py-16 px-4 bg-primary min-h-screen">
      <div className="bg-secondary border border-accent/20 rounded-2xl p-8 shadow-soft">
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-text-main mb-4">
            隐私政策
          </h1>
          <p className="text-lg text-text-light">
            最后更新：{new Date().toLocaleDateString('zh-CN')}
          </p>
        </header>

        <div className="prose prose-lg max-w-none text-text-main">
          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-semibold mb-4 text-text-main">1. 信息收集</h2>
              <p className="text-text-secondary leading-relaxed">
                我们致力于保护您的隐私。本隐私政策说明我们如何收集、使用和保护您的个人信息。
                当您使用我们的服务时，我们可能会收集以下信息：
              </p>
              <ul className="list-disc list-inside mt-4 space-y-2 text-text-secondary">
                <li>访问我们网站时的基本信息（IP地址、浏览器类型等）</li>
                <li>您主动提供的信息（如联系表单中的信息）</li>
                <li>使用分析工具收集的匿名使用数据</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-text-main">2. 信息使用</h2>
              <p className="text-text-secondary leading-relaxed">
                我们使用收集的信息用于：
              </p>
              <ul className="list-disc list-inside mt-4 space-y-2 text-text-secondary">
                <li>提供和改进我们的服务</li>
                <li>回应您的询问和请求</li>
                <li>分析网站使用情况以改善用户体验</li>
                <li>发送重要的服务通知</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-text-main">3. 信息保护</h2>
              <p className="text-text-secondary leading-relaxed">
                我们采取适当的技术和组织措施来保护您的个人信息，防止未经授权的访问、使用或披露。
                这包括使用加密技术、访问控制和定期安全审查。
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-text-main">4. Cookie 使用</h2>
              <p className="text-text-secondary leading-relaxed">
                我们的网站使用 Cookie 来改善您的浏览体验。Cookie 是存储在您设备上的小文件，
                用于记住您的偏好设置和提供个性化内容。您可以通过浏览器设置管理 Cookie 偏好。
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-text-main">5. 第三方服务</h2>
              <p className="text-text-secondary leading-relaxed">
                我们可能使用第三方服务来提供某些功能，如分析服务。这些第三方有自己的隐私政策，
                我们建议您查看这些政策以了解他们如何处理您的信息。
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-text-main">6. 您的权利</h2>
              <p className="text-text-secondary leading-relaxed">
                您有权：
              </p>
              <ul className="list-disc list-inside mt-4 space-y-2 text-text-secondary">
                <li>访问我们持有的关于您的个人信息</li>
                <li>要求更正不准确的信息</li>
                <li>要求删除您的个人信息</li>
                <li>反对处理您的个人信息</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-text-main">7. 联系我们</h2>
              <p className="text-text-secondary leading-relaxed">
                如果您对本隐私政策有任何疑问或关于您个人信息的处理有任何担忧，
                请通过以下方式联系我们：
              </p>
              <div className="mt-4 p-4 bg-primary rounded-xl border border-accent/20">
                <p className="text-text-secondary">
                  邮箱: privacy@geo-nexus.com<br />
                  地址: 中国 上海市
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-text-main">8. 政策更新</h2>
              <p className="text-text-secondary leading-relaxed">
                我们可能会不时更新本隐私政策。任何重大变更将在我们网站上发布通知。
                继续使用我们的服务即表示您接受更新后的政策。
              </p>
            </section>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-accent/20 text-center">
          <p className="text-sm text-text-light">
            本隐私政策自 {new Date().toLocaleDateString('zh-CN')} 起生效
          </p>
        </div>
      </div>
    </div>
  );
}