/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#0D1B4D', // Darker Deep Blue
        secondary: '#F1F5F9', // Light Cool Gray
        accent: '#00ACC1',   // Teal
        'text-primary': '#334155', // Dark Gray for text
        'text-secondary': '#64748B', // Lighter Gray for text
        
        // Dark mode colors
        'dark-primary': '#1A2B5D', // Slightly lighter blue for dark mode
        'dark-secondary': '#111827', // Dark background
        'dark-accent': '#00C9E0', // Brighter teal for dark mode
        'dark-text-primary': '#E2E8F0', // Light text color
        'dark-text-secondary': '#94A3B8', // Slightly darker light gray
      },
      fontFamily: {
        sans: ['Source Sans 3', 'system-ui', 'sans-serif'],
        heading: ['Montserrat', 'sans-serif'],
        display: ['Lora', 'serif'],
      },
      // We can also customize spacing, borderRadius, etc. here if needed later.
    },
  },
  plugins: [],
}
