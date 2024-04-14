import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))'
      },
      colors: {
        primary: {
          50: '#EEEDFC',
          100: '#DDDBFA',
          200: '#B6B3F4',
          300: '#948FEF',
          400: '#726BEA',
          500: '#4F46E5',
          600: '#271DD2',
          700: '#1D169D',
          800: '#130E67',
          900: '#0A0836',
          950: '#05041B'
        },
        secondary: {
          50: '#FFFAF0',
          100: '#FFF3DB',
          200: '#FFE6B8',
          300: '#FFDA94',
          400: '#FFCD70',
          500: '#FFC04F',
          600: '#FFA90A',
          700: '#C78100',
          800: '#855600',
          900: '#422B00',
          950: '#241700'
        }
      }
    }
  },
  plugins: []
}
export default config
