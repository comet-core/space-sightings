/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        space: {
          950: '#050507',
          900: '#09090b',
          850: '#0e0f14',
          800: '#14161f',
          750: '#1a1d29',
          700: '#232737',
          600: '#343a4e',
          500: '#4c5470',
          400: '#717b9b',
          300: '#9ea7c2',
          200: '#cbd1e1',
          100: '#e6eaf3',
        },
        telemetry: {
          cyan: '#00f0ff',
          emerald: '#10b981',
          amber: '#f59e0b',
          rose: '#f43f5e',
          violet: '#a855f7',
          blue: '#3b82f6',
        },
      },
      fontFamily: {
        mono: ['"JetBrains Mono"', '"SF Mono"', 'Menlo', 'Consolas', 'monospace'],
        sans: ['"Inter"', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'glow-cyan': '0 0 20px -3px rgba(0, 240, 255, 0.35)',
        'glow-emerald': '0 0 20px -3px rgba(16, 185, 129, 0.35)',
        'glow-amber': '0 0 20px -3px rgba(245, 158, 11, 0.35)',
        'hud': '0 0 0 1px rgba(0, 240, 255, 0.2), 0 8px 24px -4px rgba(0, 0, 0, 0.7)',
      },
      backgroundImage: {
        'grid-pattern': 'radial-gradient(rgba(255, 255, 255, 0.08) 1px, transparent 1px)',
        'hud-scanline': 'linear-gradient(to bottom, rgba(255,255,255,0), rgba(255,255,255,0) 50%, rgba(0, 240, 255, 0.03) 50%, rgba(0, 240, 255, 0.03))',
      },
    },
  },
  plugins: [],
};

