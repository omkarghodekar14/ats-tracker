/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#0F172A', // Deep Tech Blue
        secondary: '#3B82F6', // Modern Blue
        accent: '#10B981', // Success Green
        background: '#0F172A', // Dark background
        'background-lighter': '#1E293B', // Lighter dark background
        text: '#E2E8F0', // Light text
        'text-muted': '#94A3B8', // Muted text
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        opensans: ['Open Sans', 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif'],
      },
      backgroundImage: {
        'hero-pattern': "url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1920')",
      },
    },
  },
  plugins: [],
};