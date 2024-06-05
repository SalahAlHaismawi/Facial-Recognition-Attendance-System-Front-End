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
        Lpurple: "#925FE2", // Light purple
        Lblack: "#1C1D21",  // Light black
        gradient: {
          scrollbar: 'linear-gradient(to bottom, #763FF4, #AB5B3E)', // Your preferred scrollbar gradient
        },
      },
      fontFamily: {
        "font-poppins": "var(--font-poppins)",
        "studio-pro": "var(--font-studio-pro)",
      },
      scrollbar: {
        width: '4px', // Adjust scrollbar width as needed (optional)
        track: 'bg-gray-200', // Set track background color (optional)
        thumb: {
          default: 'bg-blue-500', // Default thumb color
          hover: 'bg-blue-600', // Hover thumb color
        },
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar'), // Install and add the tailwind-scrollbar plugin
  ],
};

export default config;
