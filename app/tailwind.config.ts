// tailwind.config.js

import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        Lpurple: "#925FE2",
        Lblack: "#1C1D21",
        gradient: {
          scrollbar: 'linear-gradient(to bottom, #763FF4, #AB5B3E)', // Define your linear gradient for the scrollbar
        },
      },
      fontFamily: {
        "font-poppins": "var(--font-poppins)", 
        "studio-pro": "var(--font-studio-pro)", 
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
};

export default config;
