import type { Config } from "tailwindcss";
const defaultTheme = require('tailwindcss/defaultConfig')

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    // extend: {
    //   backgroundImage: {
    //     "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
    //     "gradient-conic":
    //       "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
    //   },
    // },
    ...defaultTheme,
    colors:{
      ...defaultTheme.colors,
      primary:"#3B81F6",
      white: "#ffffff",
      text: {
        DEFAULT: "#1f2937",
        light: "#6C7281"
      },
      light: {
        DEFAULT: "#fafbfc",
        lighter: "#F3F4F6"

      }
    }
  },
  plugins: [],
};
export default config;
