/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        sm: '490px',  // Adjusted small breakpoint
        md: '680px',  // Adjusted medium breakpoint
        lg: '991px', // Adjusted large breakpoint
        extralg : '1345px',
        xl: '1400px', // Adjusted extra-large breakpoint
      },
      animation: {
        fadeIn: "fadeIn 1s ease-out",
        slideInLeft: "slideInLeft 0.8s ease-out",
        slideInRight: "slideInRight 0.8s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        slideInLeft: {
          "0%": { transform: "translateX(-50px)", opacity: 0 },
          "100%": { transform: "translateX(0)", opacity: 1 },
        },
        slideInRight: {
          "0%": { transform: "translateX(50px)", opacity: 0 },
          "100%": { transform: "translateX(0)", opacity: 1 },
        },
      },
    },
  },
  plugins: [],
};
