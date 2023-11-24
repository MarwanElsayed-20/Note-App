/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "main-color": "rgb(var(--main-color) / <alpha-value>)",
        "secondary-color": "rgb(var(--secondary-color) / <alpha-value>)",
        "white-color": "rgb(var(--white-color) / <alpha-value>)",
        "background-color": "rgb(var(--background-color) / <alpha-value>)",
        "text-color": "rgb(var(--text-color) / <alpha-value>)",
      },
      keyframes: {
        bounceRight: {
          "50%,100%": { right: "8px" },
          "90%": { right: "-15px" },
        },
        disappear: {
          "0%": { right: "15px" },
          "100%": { right: "-100%" },
        },
      },
      animation: {
        bounceRight:
          "bounceRight 1s ease-in-out 1 forwards, disappear 1s 5s ease-in-out 1 forwards",
      },
    },
    container: {
      center: true,
    },
  },
  plugins: [],
};
