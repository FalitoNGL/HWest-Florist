import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: ["class"],
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                background: 'hsl(var(--background))',
                foreground: 'hsl(var(--foreground))',
                card: {
                    DEFAULT: 'hsl(var(--card))',
                    foreground: 'hsl(var(--card-foreground))'
                },
                popover: {
                    DEFAULT: 'hsl(var(--popover))',
                    foreground: 'hsl(var(--popover-foreground))'
                },
                primary: {
                    DEFAULT: '#FF2E93',
                    foreground: '#ffffff'
                },
                "background-light": "#fdf2f8",
                "background-dark": "#2A121F",
                "surface-light": "#ffffff",
                "surface-dark": "#1a2e22",
                secondary: {
                    DEFAULT: 'hsl(var(--secondary))',
                    foreground: 'hsl(var(--secondary-foreground))'
                },
                muted: {
                    DEFAULT: 'hsl(var(--muted))',
                    foreground: 'hsl(var(--muted-foreground))'
                },
                accent: {
                    DEFAULT: 'hsl(var(--accent))',
                    foreground: 'hsl(var(--accent-foreground))'
                },
                destructive: {
                    DEFAULT: 'hsl(var(--destructive))',
                    foreground: 'hsl(var(--destructive-foreground))'
                },
                border: 'hsl(var(--border))',
                input: 'hsl(var(--input))',
                ring: 'hsl(var(--ring))',
            },
            borderRadius: {
                lg: 'var(--radius)',
                md: 'calc(var(--radius) - 2px)',
                sm: 'calc(var(--radius) - 4px)'
            },
            fontFamily: {
                serif: ['var(--font-playfair)', 'serif'],
                display: ['var(--font-manrope)', 'sans-serif'],
            },
            keyframes: {
                "fade-in-up": {
                    "0%": { opacity: "0", transform: "translateY(20px)" },
                    "100%": { opacity: "1", transform: "translateY(0)" },
                },
                "slow-zoom": {
                    "0%": { transform: "scale(1)" },
                    "100%": { transform: "scale(1.1)" },
                },
                "float": {
                    "50%": { transform: "translateY(-10px)" },
                },
                "marquee": {
                    "0%": { transform: "translateX(0)" },
                    "100%": { transform: "translateX(-50%)" },
                },
            },
            animation: {
                "fade-in-up": "fade-in-up 1s ease-out forwards",
                "slow-zoom": "slow-zoom 20s linear infinite alternate",
                "float": "float 3s ease-in-out infinite",
                "bounce": "bounce 2s infinite",
                "marquee": "marquee 25s linear infinite",
            },
            backgroundImage: {
                "rose-gradient": "linear-gradient(135deg, #FF2E93 0%, #c026d3 100%)",
                "rose-gradient-hover": "linear-gradient(135deg, #E01D83 0%, #a21caf 100%)",
            }
        }
    },
    plugins: [require("tailwindcss-animate")],
};
import { withUt } from "uploadthing/tw";

export default withUt(config);
