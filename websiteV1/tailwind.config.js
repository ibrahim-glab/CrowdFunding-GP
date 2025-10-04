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
          
            colors: {
                    customGreen: '#4acd8d',  // Custom green color
                    customWhite: '#ffffff',  // Custom white color
                    customPurple: '#735fe6', 
                     // Custom gray color
                    // Add more custom colors here
                  },
             
        },
    },
    plugins: [],
}