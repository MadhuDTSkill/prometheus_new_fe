// tailwind.config.js
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        main: "var(--color-main)",
        bg: "black",
        normal: "#1e1e1e",
      },
    },
  },
  plugins: [],
};
