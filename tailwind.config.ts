import type { Config } from 'tailwindcss';

export default {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        surface: '#0B0D12',
        card: '#11161F',
        line: '#253044',
        brand: '#8B9EFF',
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(255,255,255,0.08), 0 20px 60px rgba(77,114,255,.2)',
      },
      backgroundImage: {
        grain: 'radial-gradient(circle at 20% 10%, rgba(139,158,255,.15) 0, transparent 25%), radial-gradient(circle at 80% 40%, rgba(66,224,195,.12) 0, transparent 30%), radial-gradient(circle at 40% 80%, rgba(255,255,255,.08) 0, transparent 35%)',
      },
    },
  },
  plugins: [],
} satisfies Config;
