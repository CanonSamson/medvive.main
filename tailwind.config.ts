import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './layouts/**/*.{js,ts,jsx,tsx,mdx}',
    './context/**/*.{js,ts,jsx,tsx,mdx}',
    './utils/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
   
    extend: {
      fontSize: {
        sm: "0.8rem",
        base: "14px",
        xl: "1.25rem",
        "2xl": "1.563rem",
        "3xl": "1.953rem",
        "4xl": "2.441rem",
        "5xl": "3.052rem",
        "6xl": "4.052rem",
      },
      
      screens: {
        tablet: "640px",
  
        laptop: "1024px",
  
        desktop: "1280px",
      },  
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        container: "url('/container.png')",
        "hero-section-background":
          "url('/landing_page/hero-section-background-image.png')",
      },
      colors: {
        primary: "#1648CE",
        brandwhite: "#F8F8F8",
        secondary: "#3C3C43",
        accent: "#E2E8F9",
        dark: "#303733",
        "primary-dark": "#002856",
        "secondary-light": "#F2F3F7",
        "hero-overlay": "#3A495969",
        "dark-green": "#2B6462",
        "faint-text": "#767676",
      },

   
      fontFamily: {
        sans: ["PT Sans", "sans-serif"],
        poppins: ["var(--font-poppins)"],
        urbanist: ["Urbanist", "sans-serif"],
        raleway: ["Raleway", "sans-serif"],
        roboto: ["Roboto", "sans-serif"],
      },
    },
  },
  plugins: []
}

export default config