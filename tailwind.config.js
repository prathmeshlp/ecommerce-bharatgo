/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      width:{
        containerLarge: "100%",
        containerSmall: "1024px",
      },
      height:{
        navBarHeight: "5rem",
      },
      margin: {
        navBarMargin: "5rem",
      },
      spacing: {
        card: '1.5rem', // p-card base value
      },
      fontSize: {
        responsive: ['0.875rem', { sm: '1rem' }], // text-sm sm:text-base
        heading: ['1.25rem', { sm: '1.5rem' }], // text-xl sm:text-2xl
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.p-card': {
          padding: '1.5rem',
          '@screen sm': {
            padding: '2rem',
          },
        },
        '.input-base': {
          width: '100%',
          padding: '0.75rem 1rem',
          border: '1px solid #d1d5db',
          borderRadius: '0.5rem',
          fontSize: '0.875rem',
          outline: 'none',
          transition: 'all 0.2s',
          '&:focus': {
            ringWidth: '2px',
          },
        },
        '.btn-base': {
          width: '100%',
          padding: '0.75rem 1rem',
          borderRadius: '0.5rem',
          transition: 'background-color 0.2s',
        },
      });
    },
  ],
}