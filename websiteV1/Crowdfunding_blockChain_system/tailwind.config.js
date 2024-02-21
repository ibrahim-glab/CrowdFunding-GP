/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                epilogue: ['Epilogue', 'sans-serif'],
            },
            boxShadow: {
                secondary: '10px 10px 20px rgba(2, 2, 2, 0.25)',
                anim1: '0px 0px 5px 0 rgba(0,0,0,0.3)'
            },
        },
    },
    plugins: [],
}