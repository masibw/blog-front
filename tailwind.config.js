module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    backgroundColor: (theme) => ({
      primary: '#006c83',
      secondary: '#6eb4bf',
      white: '#ffffff',
    }),
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
