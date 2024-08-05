/** @type {import('tailwindcss').Config} */
module.exports = {
    prefix: 'swise-',
    content: ['./src/**/*.{html,js,ts,tsx,jsx}'],
    theme: {
        extend: {},
    },
    plugins: [
        require( '@tailwindcss/forms' ),
        require( 'daisyui' ),
    ],
}