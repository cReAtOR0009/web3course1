module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  mode: "jit",
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      display: ["Open Sans", "sans-serif"],
      body: ["Open Sans", "sans-serif"],
    },
    extend: {
      screens: {
        mf: "990px",
      },
      keyframes: {
        "slide-in": {
          "0%": {
            "-webkit-transform": "translateX(120%)",
            transform: "translateX(120%)",
          },
          "100%": {
            "-webkit-transform": "translateX(0%)",
            transform: "translateX(0%)",
          },
        },
        "borderBlur ": {
          "0%" : {
            filter: "blur(0)"
          },
          "100%" : {
            filter : "blur(5px)",

          }
        }
      },
      animation: {
        "slide-in": "slide-in 0.5s ease -out",
      },
      themes: {
        dark: {
          // Dark theme colors and styles
          backgroundColor: "#1a202c",
          textColor: "#ffffff",
          // Add more dark theme styles as needed
        },
        light: {
          // Light theme colors and styles
          backgroundColor: "#ffffff",
          textColor: "#1a202c",
          // Add more light theme styles as needed
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  // plugins: [require("@tailwindcss/forms")],
};