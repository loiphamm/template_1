/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  corePlugins: { preflight: false },
  theme: {
    extend: {
      fontFamily: {
        couple: ['"Fz Aghita"', 'Baskerville', '"Times New Roman"', 'serif'],
        qellia: ['"Fz Qellia"', 'serif'],
        serifb: ['Baskerville', '"Times New Roman"', 'serif'],
      },
    },
  },
  plugins: [],
}
