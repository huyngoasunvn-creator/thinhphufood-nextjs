
import type { Config } from "tailwindcss";
import typography from '@tailwindcss/typography';

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  extend: {
    colors: {
      primary: {
        DEFAULT: '#15803d',
        light: '#16a34a',
        dark: '#166534',
      },
      accent: '#facc15',
      background: '#f8fafc',
    },
    boxShadow: {
      card: '0 10px 25px rgba(0,0,0,0.05)',
      hover: '0 15px 35px rgba(0,0,0,0.08)',
    },
    borderRadius: {
      xl: '14px',
      '2xl': '20px',
    },
    fontFamily: {
      sans: ['"Be Vietnam Pro"', 'sans-serif'],
    },
  },
},
  plugins: [typography],
};
export default config;
