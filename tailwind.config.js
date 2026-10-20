/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}', './playground/**/*.{ts,tsx}'],
  theme: { extend: { colors: { ink: '#182033', muted: '#69738a', brand: '#6257e8', canvas: '#f7f8fc' }, boxShadow: { soft: '0 18px 50px rgba(25, 35, 70, 0.09)' } } },
  plugins: [],
};