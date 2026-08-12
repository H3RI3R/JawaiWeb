/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Design tokens — see DESIGN.md for rationale
        void: {
          DEFAULT: '#0A0B0D',
          deep: '#05060A',
          soft: '#111318',
        },
        sand: '#F4F1EA',
        gold: {
          DEFAULT: '#D4A24C',
          bright: '#E8BE6E',
          dim: '#8A6A32',
        },
        rust: '#9C5A34',
        sage: '#6B7355',
        rosette: '#1B1B16', // fill colour for leopard-spot motif dividers
      },
      fontFamily: {
        display: ['Anton', 'sans-serif'],
        body: ['Manrope', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      letterSpacing: {
        tightest: '-0.04em',
        wideish: '0.08em',
        widest2: '0.35em',
      },
      backgroundImage: {
        'void-gradient': 'linear-gradient(180deg, #0A0B0D 0%, #111318 100%)',
      },
    },
  },
  plugins: [],
};
