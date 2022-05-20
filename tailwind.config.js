module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [require('daisyui')],
  daisyui: {
    styled: true,
    themes: ['emerald', 'aqua', 'cmyk'],
    darkTheme: 'aqua',
    base: true,
    utils: true,
    logs: true,
    rtl: false,
    prefix: '',
  },
}
