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
    },
  },
  plugins: [],
}