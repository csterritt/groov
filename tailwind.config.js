module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [require('daisyui')],
  daisyui: {
    styled: true,
    themes: ['autumn', 'synthwave', 'cmyk'],
    darkTheme: 'synthwave',
    base: true,
    utils: true,
    logs: true,
    rtl: false,
    prefix: '',
  },
}
