/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],

  theme: {
    extend: {
      colors: {
        /* Primary Brand Colors */
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },

        /* Status Colors */
        status: {
          todo: {
            50: '#f8fafc',
            100: '#f1f5f9',
            200: '#e2e8f0',
            500: '#64748b',
            600: '#475569',
          },

          'in-progress': {
            50: '#eff6ff',
            100: '#dbeafe',
            200: '#bfdbfe',
            500: '#3b82f6',
            600: '#2563eb',
            700: '#1d4ed8',
          },

          review: {
            50: '#f5f3ff',
            100: '#ede9fe',
            200: '#ddd6fe',
            500: '#8b5cf6',
            600: '#7c3aed',
            700: '#6d28d9',
          },

          done: {
            50: '#ecfdf5',
            100: '#d1fae5',
            200: '#a7f3d0',
            500: '#10b981',
            600: '#059669',
            700: '#047857',
          },
        },

        /* Priority Colors */
        priority: {
          low: {
            50: '#f8fafc',
            100: '#f1f5f9',
            200: '#e2e8f0',
            500: '#64748b',
            600: '#475569',
          },

          medium: {
            50: '#fffbeb',
            100: '#fef3c7',
            200: '#fde68a',
            500: '#f59e0b',
            600: '#d97706',
            700: '#b45309',
          },

          high: {
            50: '#fff7ed',
            100: '#ffedd5',
            200: '#fed7aa',
            500: '#f97316',
            600: '#ea580c',
            700: '#c2410c',
          },

          urgent: {
            50: '#fef2f2',
            100: '#fee2e2',
            200: '#fecaca',
            500: '#ef4444',
            600: '#dc2626',
            700: '#b91c1c',
          },
        },

        /* Neutral Colors */
        surface: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
        },
      },

      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },

      spacing: {
        18: '4.5rem',
      },

      boxShadow: {
        card: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
        'card-hover':
          '0 4px 12px 0 rgb(0 0 0 / 0.08)',
      },

      borderRadius: {
        card: '0.625rem',
      },
    },
  },

  plugins: [],
};
