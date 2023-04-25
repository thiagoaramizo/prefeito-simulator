/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'game': "url('/images/bg.jpg')",
        'radial-gradient': 'radial-gradient(circle, rgba(8, 145, 178,1) 0%, rgba(14,116,144,1) 100%)',
      },
      borderColor: {
        'opacity-white': 'rgba(255, 255, 255, 0.3)',
        'opacity-black': 'rgba(0, 0, 0, 0.1)',
      },
      gridTemplateColumns: {
        'header': '260px 1fr'
      },
    },
  },
  plugins: [],
}
