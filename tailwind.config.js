/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        popIn: 'popIn 0.3s ease-out',
      },
      keyframes: {
        popIn: {
          'from': {
            opacity: '0',
            transform: 'scale(0.9) translateY(20px)',
          },
          'to': {
            opacity: '1',
            transform: 'scale(1) translateY(0)',
          },
        },
      },
      backgroundColor : {
        primary : '#4169E1',
        secondary : '#5A7DFF',
        light : '#F3F4F6',
        dark : '#1F2937',
        darker : '#111827',
        darkest : '#0F172A',

      }
    },
  },
  plugins: [],
}

