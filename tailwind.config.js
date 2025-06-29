module.exports = {
    content: [
        "./src/**/*.{html,js,ts,jsx,tsx}",
        "app/**/*.{ts,tsx}",
        "components/**/*.{ts,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                "avatar-user-squaredemi-wilkinson-color-background":
                    "var(--avatar-user-squaredemi-wilkinson-color-background)",
                "avatar-user-squaredrew-cano-color-background":
                    "var(--avatar-user-squaredrew-cano-color-background)",
                "avatar-user-squarenatali-craig-color-background":
                    "var(--avatar-user-squarenatali-craig-color-background)",
                basewhite: "var(--basewhite)",
                "gray-200": "var(--gray-200)",
                "gray-25": "var(--gray-25)",
                "gray-300": "var(--gray-300)",
                "gray-400": "var(--gray-400)",
                "gray-50": "var(--gray-50)",
                "gray-500": "var(--gray-500)",
                "gray-600": "var(--gray-600)",
                "gray-700": "var(--gray-700)",
                "gray-800": "var(--gray-800)",
                "gray-900": "var(--gray-900)",
                "primary-100": "var(--primary-100)",
                "primary-50": "var(--primary-50)",
                "primary-500": "var(--primary-500)",
                "primary-600": "var(--primary-600)",
                "primary-700": "var(--primary-700)",
                border: "hsl(var(--border))",
                input: "hsl(var(--input))",
                ring: "hsl(var(--ring))",
                background: "hsl(var(--background))",
                foreground: "hsl(var(--foreground))",
                primary: {
                    DEFAULT: "hsl(var(--primary))",
                    foreground: "hsl(var(--primary-foreground))",
                },
                secondary: {
                    DEFAULT: "hsl(var(--secondary))",
                    foreground: "hsl(var(--secondary-foreground))",
                },
                destructive: {
                    DEFAULT: "hsl(var(--destructive))",
                    foreground: "hsl(var(--destructive-foreground))",
                },
                muted: {
                    DEFAULT: "hsl(var(--muted))",
                    foreground: "hsl(var(--muted-foreground))",
                },
                accent: {
                    DEFAULT: "hsl(var(--accent))",
                    foreground: "hsl(var(--accent-foreground))",
                },
                popover: {
                    DEFAULT: "hsl(var(--popover))",
                    foreground: "hsl(var(--popover-foreground))",
                },
                card: {
                    DEFAULT: "hsl(var(--card))",
                    foreground: "hsl(var(--card-foreground))",
                },
            },
            fontFamily: {
                "display-sm-medium": "var(--display-sm-medium-font-family)",
                "text-lg-medium": "var(--text-lg-medium-font-family)",
                "text-md-medium": "var(--text-md-medium-font-family)",
                "text-md-normal": "var(--text-md-normal-font-family)",
                "text-sm-medium": "var(--text-sm-medium-font-family)",
                "text-sm-normal": "var(--text-sm-normal-font-family)",
                "text-xs-medium": "var(--text-xs-medium-font-family)",
                sans: [
                    "ui-sans-serif",
                    "system-ui",
                    "sans-serif",
                    '"Apple Color Emoji"',
                    '"Segoe UI Emoji"',
                    '"Segoe UI Symbol"',
                    '"Noto Color Emoji"',
                ],
            },
            boxShadow: {
                "shadow-md": "var(--shadow-md)",
                "shadow-sm": "var(--shadow-sm)",
                "shadow-xs": "var(--shadow-xs)",
            },
            borderRadius: {
                lg: "var(--radius)",
                md: "calc(var(--radius) - 2px)",
                sm: "calc(var(--radius) - 4px)",
            },
            keyframes: {
                "accordion-down": {
                    from: { height: "0" },
                    to: { height: "var(--radix-accordion-content-height)" },
                },
                "accordion-up": {
                    from: { height: "var(--radix-accordion-content-height)" },
                    to: { height: "0" },
                },
            },
            animation: {
                "accordion-down": "accordion-down 0.2s ease-out",
                "accordion-up": "accordion-up 0.2s ease-out",
            },
        },
        container: { center: true, padding: "2rem", screens: { "2xl": "1400px" } },
    },
    plugins: [],
    darkMode: ["class"],
};
