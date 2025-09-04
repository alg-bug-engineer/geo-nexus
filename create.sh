#!/bin/bash

# ===========================================
# 本地图片系统设置脚本
# ===========================================

echo "🚀 开始设置本地图片系统..."

# 1. 创建目录结构
echo "📁 创建目录结构..."

# 在 src 中创建 images 目录
mkdir -p src/images/tools/{logos,banners,screenshots,default}
mkdir -p src/images/{categories,ui,brand}
mkdir -p src/config
mkdir -p src/hooks
mkdir -p src/utils

# 在 public 中创建实际的图片目录（Next.js 静态资源）
mkdir -p public/images/tools/{logos,banners,screenshots,default}
mkdir -p public/images/{categories,ui,brand}

echo "✅ 目录结构创建完成"

# 2. 创建默认的分类图片（使用占位图）
echo "🎨 创建默认分类图片..."

# 下载分类默认图片（占位图）
curl -o public/images/tools/default/geo-suite.webp "https://placehold.co/400x200/3b82f6/ffffff?text=GEO+Suite&font=roboto"
curl -o public/images/tools/default/content-generation.webp "https://placehold.co/400x200/10b981/ffffff?text=AI+Content&font=roboto"
curl -o public/images/tools/default/content-optimization.webp "https://placehold.co/400x200/f59e0b/ffffff?text=Optimization&font=roboto"
curl -o public/images/tools/default/keyword-research.webp "https://placehold.co/400x200/ef4444/ffffff?text=Keywords&font=roboto"
curl -o public/images/tools/default/visibility-monitoring.webp "https://placehold.co/400x200/8b5cf6/ffffff?text=Monitoring&font=roboto"
curl -o public/images/tools/default/fallback.webp "https://placehold.co/400x200/64748b/ffffff?text=Tool+Image&font=roboto"

echo "✅ 默认分类图片创建完成"

# 3. 创建工具占位图（临时使用，后续可替换为真实图片）
echo "🛠️ 创建工具占位图..."

# Writesonic
curl -o public/images/tools/banners/writesonic.webp "https://placehold.co/400x200/7c3aed/ffffff?text=Writesonic&font=roboto"
curl -o public/images/tools/logos/writesonic.png "https://placehold.co/100x100/7c3aed/ffffff?text=W&font=roboto"

# Jasper
curl -o public/images/tools/banners/jasper.webp "https://placehold.co/400x200/ec4899/ffffff?text=Jasper&font=roboto"
curl -o public/images/tools/logos/jasper.png "https://placehold.co/100x100/ec4899/ffffff?text=J&font=roboto"

# Surfer SEO
curl -o public/images/tools/banners/surfer-seo.webp "https://placehold.co/400x200/6366f1/ffffff?text=Surfer+SEO&font=roboto"
curl -o public/images/tools/logos/surfer-seo.png "https://placehold.co/100x100/6366f1/ffffff?text=S&font=roboto"

# Frase
curl -o public/images/tools/banners/frase.webp "https://placehold.co/400x200/22c55e/ffffff?text=Frase&font=roboto"
curl -o public/images/tools/logos/frase.png "https://placehold.co/100x100/22c55e/ffffff?text=F&font=roboto"

# MarketMuse
curl -o public/images/tools/banners/marketmuse.webp "https://placehold.co/400x200/0ea5e9/ffffff?text=MarketMuse&font=roboto"
curl -o public/images/tools/logos/marketmuse.png "https://placehold.co/100x100/0ea5e9/ffffff?text=M&font=roboto"

# Semrush
curl -o public/images/tools/banners/semrush.webp "https://placehold.co/400x200/f97316/ffffff?text=Semrush&font=roboto"
curl -o public/images/tools/logos/semrush.png "https://placehold.co/100x100/f97316/ffffff?text=S&font=roboto"

# Ahrefs
curl -o public/images/tools/banners/ahrefs.webp "https://placehold.co/400x200/14b8a6/ffffff?text=Ahrefs&font=roboto"
curl -o public/images/tools/logos/ahrefs.png "https://placehold.co/100x100/14b8a6/ffffff?text=A&font=roboto"

# AthenaHQ
curl -o public/images/tools/banners/athena.webp "https://placehold.co/400x200/8b5cf6/ffffff?text=AthenaHQ&font=roboto"
curl -o public/images/tools/logos/athena.png "https://placehold.co/100x100/8b5cf6/ffffff?text=A&font=roboto"

# Copy.ai
curl -o public/images/tools/banners/copy-ai.webp "https://placehold.co/400x200/ef4444/ffffff?text=Copy.ai&font=roboto"
curl -o public/images/tools/logos/copy-ai.png "https://placehold.co/100x100/ef4444/ffffff?text=C&font=roboto"

# Clearscope
curl -o public/images/tools/banners/clearscope.webp "https://placehold.co/400x200/f59e0b/ffffff?text=Clearscope&font=roboto"
curl -o public/images/tools/logos/clearscope.png "https://placehold.co/100x100/f59e0b/ffffff?text=C&font=roboto"

# Mangools
curl -o public/images/tools/banners/mangools.webp "https://placehold.co/400x200/3b82f6/ffffff?text=Mangools&font=roboto"
curl -o public/images/tools/logos/mangools.png "https://placehold.co/100x100/3b82f6/ffffff?text=M&font=roboto"

# Profound
curl -o public/images/tools/banners/profound.webp "https://placehold.co/400x200/10b981/ffffff?text=Profound&font=roboto"
curl -o public/images/tools/logos/profound.png "https://placehold.co/100x100/10b981/ffffff?text=P&font=roboto"

echo "✅ 工具占位图创建完成"

# 4. 创建截图目录结构
echo "📸 创建截图目录结构..."
for tool in writesonic jasper surfer-seo frase marketmuse semrush ahrefs athena copy-ai clearscope mangools profound; do
  mkdir -p public/images/tools/screenshots/$tool
  # 创建示例截图占位图
  curl -o public/images/tools/screenshots/$tool/main.webp "https://placehold.co/800x600/f8fafc/64748b?text=$tool+Main+Interface&font=roboto"
  curl -o public/images/tools/screenshots/$tool/interface.webp "https://placehold.co/800x600/f1f5f9/64748b?text=$tool+UI&font=roboto"
  curl -o public/images/tools/screenshots/$tool/features.webp "https://placehold.co/800x600/e2e8f0/64748b?text=$tool+Features&font=roboto"
done

echo "✅ 截图目录结构创建完成"

# 5. 显示目录结构
echo ""
echo "📋 已创建的目录结构："
tree public/images -I "*.DS_Store" || ls -la public/images/

echo ""
echo "🎉 本地图片系统设置完成！"
echo ""
echo "📝 下一步："
echo "1. 将提供的代码文件添加到相应位置"
echo "2. 收集真实的工具图片替换占位图"
echo "3. 运行 npm run dev 测试效果"
echo ""
echo "💡 提示："
echo "- 图片建议尺寸: banners 400x200, logos 100x100"
echo "- 推荐格式: WebP (banners), PNG (logos)"
echo "- 可以逐步替换占位图为真实图片"