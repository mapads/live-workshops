// tailwind.config.js
module.exports = {
  content: [
      "./pages/**/*.{js,ts,jsx,tsx}",
      "./components/**/*.{js,ts,jsx,tsx}",
      "./app/**/*.{js,ts,jsx,tsx}", // If you’re using the `app` folder
  ],
  theme: {
      extend: {},
  },
  plugins: [
    require("@tailwindcss/typography"), 
    require("daisyui"),
  ],
  daisyui: {
      themes: ["synthwave"], // Optional themes configuration
  },
};
