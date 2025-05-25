/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {      colors: {
        primary: '#0D1B4D', // Darker Deep Blue
        secondary: '#F1F5F9', // Light Cool Gray
        accent: '#00ACC1',   // Teal
        'text-primary': '#334155', // Dark Gray for text
        'text-secondary': '#64748B', // Lighter Gray for text
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        // If we wanted a separate heading font:
        // heading: ['Merriweather', 'serif'],
      },
      // We can also customize spacing, borderRadius, etc. here if needed later.
    },
  },
  plugins: [],
}
