import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        crimson: {
          DEFAULT: "#8B0000",
          light: "#A80000",
          dark: "#5a0000",
        },
        gold: "#F5C842",
        orange: {
          juice: "#F07B1D",
        },
        coral: "#E8714A",
        bissap: "#6B0F1A",
        cream: "#FDF6EC",
        leaf: "#2D5A27",
      },
      fontFamily: {
        playfair: ["Playfair Display", "serif"],
        dm: ["DM Sans", "sans-serif"],
      },
      backgroundImage: {
        "ananas-gradient": "linear-gradient(145deg, #F5C842, #E8A800)",
        "bissap-gradient": "linear-gradient(145deg, #8B1A2E, #5a0f1d)",
        "orange-gradient": "linear-gradient(145deg, #F07B1D, #c55a00)",
        "nzinga-gradient": "linear-gradient(145deg, #E8714A, #c04a25)",
      },
    },
  },
  plugins: [],
};
export default config;
