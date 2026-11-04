/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'forest-green': '#25352D',
        'terracotta': '#D5A078',
        'terracotta-dark': '#A85A2A',
        'cream': '#F4EFE5',
        'charcoal': '#292725',
      },
    },
  },
  plugins: [],
};
