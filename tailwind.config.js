module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    backgroundColor: (theme) => ({
      primary: '#006c83',
      secondary: '#6eb4bf',
      gray: '#e2e8e4',
      white: '#ffffff',
    }),
    textColor: (theme) => ({
      primary: '#006c83',
      secondary: '#6eb4bf',
      gray: '#e2e8e4',
      white: '#ffffff',
    }),
    extend: {
      typography: {
        DEFAULT: {
          css: {
            h2: {
              'border-bottom':'solid 5px #62b4bf',
              // '&:hover': {
              //   color: '#2c5282',
              // },
            },
            a:{
              color:'#006c83',
            },
            h3:{
              'border-left':'solid 5px #62b4bf',
              'padding-left':'0.5rem',
            }
          },
        },
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};