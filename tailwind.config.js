/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
       colors : {
        'primary': '#013FC4',
        'abuabu': '#ADADAD',
        'abu': '#F7F7F7',
        'secondary': '#001C59',
       }
    },
  },
  plugins: [],
};
