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
        // 主背景色 - 使用深蓝灰色而非纯黑
        'primary': '#0f172a', // slate-900 的现代化变体
        // 次要背景色 - 用于卡片和容器
        'secondary': '#1e293b', // slate-800 的现代化变体
        // 第三层背景色 - 用于更深层的容器
        'tertiary': '#334155', // slate-700
        // 主强调色 - 现代蓝色
        'accent': '#3b82f6', // blue-500
        'accent-hover': '#2563eb', // blue-600
        // 次要强调色 - 青色
        'accent-secondary': '#06b6d4', // cyan-500
        // 主文本色
        'text-main': '#f8fafc', // slate-50
        // 次要文本色
        'text-secondary': '#cbd5e1', // slate-300
        // 浅色文本
        'text-light': '#94a3b8', // slate-400
        // 静音文本
        'text-muted': '#64748b', // slate-500
        // 科技感蓝色主题
        'primary-blue': '#0f172a', // 与主色保持一致
        'accent-blue': '#3b82f6',   // 与主强调色保持一致
        // 状态颜色
        'success': '#10b981', // emerald-500
        'warning': '#f59e0b', // amber-500
        'error': '#ef4444', // red-500
        // 边框颜色
        'border-primary': '#334155', // slate-700
        'border-secondary': '#475569', // slate-600
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
      // 扩展阴影 - 为深色主题优化
      boxShadow: {
        'soft': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        'medium': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'large': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        'xl': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        'inner': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
        'glow': '0 0 20px rgba(59, 130, 246, 0.3)',
        'glow-blue': '0 0 20px rgba(59, 130, 246, 0.4)',
        'glow-cyan': '0 0 20px rgba(6, 182, 212, 0.3)',
        // 深色主题特殊阴影
        'dark-soft': '0 1px 3px 0 rgba(0, 0, 0, 0.3), 0 1px 2px 0 rgba(0, 0, 0, 0.2)',
        'dark-medium': '0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2)',
        'dark-large': '0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -2px rgba(0, 0, 0, 0.2)',
      },
      // 扩展动画
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'bounce-slow': 'bounce 2s infinite',
        'pulse-soft': 'pulse 3s ease-in-out infinite',
        'blob': 'blob 7s infinite',
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 2s infinite',
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
        shimmer: {
          '0%': {
            'background-position': '-1000px 0',
          },
          '100%': {
            'background-position': '1000px 0',
          },
        },
      },
      // 扩展渐变
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-primary': 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
        'gradient-secondary': 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
        'gradient-accent': 'linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)',
        'gradient-hero': 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)',
        'shimmer': 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.05) 50%, transparent 100%)',
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
            color: '#cbd5e1', // text-secondary
            lineHeight: '1.7',
            // 自定义标题样式
            'h1, h2, h3, h4, h5, h6': {
              color: '#f8fafc', // text-main
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
              borderLeftColor: '#3b82f6',
              paddingLeft: '1rem',
              backgroundColor: '#1e293b',
              padding: '1rem',
              margin: '1.5rem 0',
              borderRadius: '0.5rem',
            },
            // 自定义代码样式
            code: {
              backgroundColor: '#334155',
              color: '#f8fafc',
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
              backgroundColor: '#1e293b',
              color: '#f8fafc',
              padding: '1rem',
              borderRadius: '0.5rem',
              overflow: 'auto',
              fontSize: '0.875rem',
              lineHeight: '1.7',
              border: '1px solid #334155',
            },
            'pre code': {
              backgroundColor: 'transparent',
              padding: '0',
              color: 'inherit',
              fontSize: 'inherit',
            },
            // 自定义链接样式
            a: {
              color: '#3b82f6',
              textDecoration: 'underline',
              fontWeight: '500',
              '&:hover': {
                color: '#06b6d4',
                textDecoration: 'none',
              },
            },
            // 自定义表格样式
            table: {
              width: '100%',
              borderCollapse: 'collapse',
              margin: '1.5rem 0',
              backgroundColor: '#1e293b',
              borderRadius: '0.5rem',
              overflow: 'hidden',
            },
            'thead th': {
              backgroundColor: '#334155',
              fontWeight: '600',
              textAlign: 'left',
              padding: '0.75rem',
              borderBottom: '1px solid #475569',
              color: '#f8fafc',
            },
            'tbody td': {
              padding: '0.75rem',
              borderBottom: '1px solid #334155',
              color: '#cbd5e1',
            },
            'tbody tr:hover': {
              backgroundColor: '#334155',
            },
            // 自定义分隔线样式
            hr: {
              borderColor: '#334155',
              borderTopWidth: '1px',
              margin: '2rem 0',
            },
            // 自定义强调样式
            strong: {
              color: '#f8fafc',
              fontWeight: '600',
            },
            em: {
              color: '#94a3b8',
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
  ],
  // 启用暗色模式支持
  darkMode: 'class',
}

export default config