module.exports = {
  content: ['./**/*.html'],
  theme: {
    extend: {
      fontSize: {
        'h1-heading': '2.027rem',
        'h2-heading': '1.602rem',
        'h3-heading': '1.424rem',
        'h4-heading': '1.2rem',
        'paragraph-body1': '1rem',
        'paragraph-body2': '0.889rem',
      },
      lineHeight: {
        heading: '149.5%',
      },
    },
    screens: {
      sm: '640px',
      md: '1040px',
      lg: '1324px',
      xl: '1280px',
      '2xl': '1536px',
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
