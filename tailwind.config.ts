/*
 * @filename: alg-bug-engineer/geo-nexus/geo-nexus-c0022f76688310702ab7bc516010d393a92d80dc/tailwind.config.ts
 */
// tailwind.config.ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#0a0a0a', // 更深的黑色背景
        'secondary': '#1a1a1a', // 用于容器的深灰色
        'accent': '#00aaff', // 鲜艳的蓝色作为强调色
        'text-main': '#f0f0f0', // 主文本使用灰白色
        'text-secondary': '#a0a0a0', // 辅助文本使用浅灰色
        'text-light': '#d0d0d0', // 更亮的辅助文本
        // --- 新增: 科技感蓝色主题 ---
        'primary-blue': '#0d1b2a', // 深海军蓝
        'accent-blue': '#00c4ff',   // 亮蓝色
      },
      // 扩展字体系列
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
        'mono': ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      // 扩展间距
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      // 扩展阴影
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
        'medium': '0 4px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 30px -5px rgba(0, 0, 0, 0.05)',
        'strong': '0 10px 40px -10px rgba(0, 0, 0, 0.15), 0 20px 50px -15px rgba(0, 0, 0, 0.1)',
        'glow': '0 0 20px rgba(0, 170, 255, 0.3)',
        'glow-blue': '0 0 20px rgba(0, 196, 255, 0.4)',
      },
      // 扩展动画
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'bounce-slow': 'bounce 2s infinite',
        'pulse-soft': 'pulse 3s ease-in-out infinite',
        'blob': 'blob 7s infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        blob: {
          '0%': {
            transform: 'translate(0px, 0px) scale(1)',
          },
          '33%': {
            transform: 'translate(30px, -50px) scale(1.1)',
          },
          '66%': {
            transform: 'translate(-20px, 20px) scale(0.9)',
          },
          '100%': {
            transform: 'translate(0px, 0px) scale(1)',
          },
        },
        float: {
          '0%, 100%': {
            transform: 'translateY(0px)',
          },
          '50%': {
            transform: 'translateY(-20px)',
          },
        },
      },
      // 扩展渐变
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-tech': 'linear-gradient(135deg, #0d1b2a 0%, #1a1a1a 50%, #2a2f3a 100%)',
        'gradient-accent': 'linear-gradient(135deg, #00aaff 0%, #00c4ff 100%)',
      },
      // 扩展边框半径
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
      },
      // 响应式断点
      screens: {
        'xs': '475px',
        '3xl': '1680px',
      },
      // Typography插件自定义样式
      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none',
            color: '#d0d0d0', // 默认为浅灰色
            lineHeight: '1.7',
            // 自定义标题样式
            'h1, h2, h3, h4, h5, h6': {
              color: '#f0f0f0', // 标题使用灰白色
              fontWeight: '700',
              letterSpacing: '-0.025em',
            },
            h1: {
              fontSize: '2.25rem',
              marginTop: '0',
              marginBottom: '1rem',
              lineHeight: '1.2',
            },
            h2: {
              fontSize: '1.875rem',
              marginTop: '2rem',
              marginBottom: '1rem',
              lineHeight: '1.3',
            },
            h3: {
              fontSize: '1.5rem',
              marginTop: '1.5rem',
              marginBottom: '0.75rem',
              lineHeight: '1.4',
            },
            // 自定义段落样式
            p: {
              marginTop: '1rem',
              marginBottom: '1rem',
            },
            // 自定义列表样式
            'ul > li': {
              paddingLeft: '0.375rem',
            },
            'ol > li': {
              paddingLeft: '0.375rem',
            },
            // 自定义引用样式
            blockquote: {
              fontStyle: 'italic',
              borderLeftWidth: '4px',
              borderLeftColor: '#00aaff',
              paddingLeft: '1rem',
              backgroundColor: '#1a1a1a', // 深灰色背景
              padding: '1rem',
              margin: '1.5rem 0',
            },
            // 自定义代码样式
            code: {
              backgroundColor: '#2a2f3a', // 较浅的深灰色
              color: '#f0f0f0', // 灰白色文本
              padding: '0.125rem 0.25rem',
              borderRadius: '0.25rem',
              fontSize: '0.875rem',
              fontWeight: '500',
            },
            'code::before': {
              content: '""',
            },
            'code::after': {
              content: '""',
            },
            pre: {
              backgroundColor: '#1a1a1a',
              color: '#f0f0f0',
              padding: '1rem',
              borderRadius: '0.5rem',
              overflow: 'auto',
              fontSize: '0.875rem',
              lineHeight: '1.7',
            },
            'pre code': {
              backgroundColor: 'transparent',
              padding: '0',
              color: 'inherit',
              fontSize: 'inherit',
            },
            // 自定义链接样式
            a: {
              color: '#00aaff',
              textDecoration: 'underline',
              fontWeight: '500',
              '&:hover': {
                color: '#00c4ff',
                textDecoration: 'none',
              },
            },
            // 自定义表格样式
            table: {
              width: '100%',
              borderCollapse: 'collapse',
              margin: '1.5rem 0',
            },
            'thead th': {
              backgroundColor: '#2a2f3a',
              fontWeight: '600',
              textAlign: 'left',
              padding: '0.75rem',
              borderBottom: '2px solid #3a3f4a', // 较深的边框色
            },
            'tbody td': {
              padding: '0.75rem',
              borderBottom: '1px solid #3a3f4a',
            },
            'tbody tr:hover': {
              backgroundColor: '#2a2f3a',
            },
            // 自定义分隔线样式
            hr: {
              borderColor: '#3a3f4a',
              borderTopWidth: '1px',
              margin: '2rem 0',
            },
            // 自定义强调样式
            strong: {
              color: '#f0f0f0',
              fontWeight: '600',
            },
            em: {
              color: '#a0a0a0',
              fontStyle: 'italic',
            },
          },
        },
        // 大字体变体
        lg: {
          css: {
            fontSize: '1.125rem',
            lineHeight: '1.8',
            h1: {
              fontSize: '2.5rem',
            },
            h2: {
              fontSize: '2rem',
            },
            h3: {
              fontSize: '1.75rem',
            },
            p: {
              marginTop: '1.25rem',
              marginBottom: '1.25rem',
            },
          },
        },
        // 小字体变体
        sm: {
          css: {
            fontSize: '0.875rem',
            lineHeight: '1.6',
            h1: {
              fontSize: '1.5rem',
            },
            h2: {
              fontSize: '1.25rem',
            },
            h3: {
              fontSize: '1.125rem',
            },
            p: {
              marginTop: '0.75rem',
              marginBottom: '0.75rem',
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    // 可选：添加其他有用的插件
    // require('@tailwindcss/forms'),
    // require('@tailwindcss/aspect-ratio'),
  ],
  // 启用暗色模式支持
  darkMode: 'class',
}

export default config