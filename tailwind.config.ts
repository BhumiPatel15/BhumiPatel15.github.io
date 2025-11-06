import type { Config } from 'tailwindcss';

export default {
  content: [
    './src/**/*.{astro,html,js,jsx,ts,tsx}',
    './public/**/*.html'
  ],
  theme: {
    extend: {
      colors: {
        accent: {
          DEFAULT: 'hsl(var(--accent) / <alpha-value>)',
          400: 'hsl(var(--accent-400) / <alpha-value>)',
          600: 'hsl(var(--accent-600) / <alpha-value>)'
        },
        base: '#0b0f14',
        panel: '#0f151d'
      },
      boxShadow: {
        glow: '0 0 0.5rem hsl(var(--accent) / 0.6), 0 0 1.25rem hsl(var(--accent) / 0.35)'
      },
      fontFamily: {
        mono: [
          'ui-monospace',
          'SFMono-Regular',
          'Menlo',
          'Monaco',
          'Consolas',
          'Liberation Mono',
          'monospace'
        ]
      },
      borderRadius: {
        '2xl': '1rem'
      }
    }
  },
  plugins: []
} satisfies Config;
