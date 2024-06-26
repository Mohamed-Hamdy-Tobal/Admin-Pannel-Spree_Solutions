module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        bgBlue: '#0A47C4',
        bgYellow: '#FFB946',
        bgRed: '#F7685B',
        bgGreen: '#2ED47A',
        bgPurple: '#885AF8',
        bgBlack: '#192A3E',
        bgTableBlack: '#323C47',
        bgTableGray: '#707683',
        textDarkBlue: '#334D6E',
        textGray: '#90A0B7',
        iconGray: '#C2CFE0',
      },
    },
    screens: {
      sm: '576px',
      md: '768px',
      lg: '992px',
      xl: '1200px',
      '2xl': '1400px'
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
