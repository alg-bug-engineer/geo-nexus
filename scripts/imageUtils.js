

// ===========================================
// 6. 图片管理工具脚本（开发辅助）
// ===========================================

// scripts/imageUtils.js - 可选的图片管理工具
/*
const fs = require('fs');
const path = require('path');

// 检查所有配置的图片是否存在
function checkAllImages() {
  const { TOOL_IMAGE_CONFIGS } = require('../src/config/imageConfig');
  
  TOOL_IMAGE_CONFIGS.forEach(config => {
    const publicPath = path.join(__dirname, '../public');
    
    if (config.logo) {
      const logoPath = path.join(publicPath, config.logo);
      if (!fs.existsSync(logoPath)) {
        console.warn(`Missing logo: ${config.logo}`);
      }
    }
    
    if (config.banner) {
      const bannerPath = path.join(publicPath, config.banner);
      if (!fs.existsSync(bannerPath)) {
        console.warn(`Missing banner: ${config.banner}`);
      }
    }
  });
}

// 生成图片清单
function generateImageManifest() {
  const { TOOL_IMAGE_CONFIGS } = require('../src/config/imageConfig');
  
  const manifest = TOOL_IMAGE_CONFIGS.map(config => ({
    id: config.id,
    name: config.name,
    images: {
      logo: config.logo || null,
      banner: config.banner || null,
      hasScreenshots: config.hasScreenshots || false
    }
  }));
  
  fs.writeFileSync(
    path.join(__dirname, '../src/config/imageManifest.json'),
    JSON.stringify(manifest, null, 2)
  );
  
  console.log('Image manifest generated!');
}

module.exports = { checkAllImages, generateImageManifest };
*/