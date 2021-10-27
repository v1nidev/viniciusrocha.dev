const isProd = process.env.NODE_ENV === 'production'

const plugins = [
  require('postcss-import')({
    root: 'src/css/index.css'
  }),
  require('tailwindcss/nesting'),
  require('tailwindcss')(`./tailwind.config.js`),
  isProd ? require('autoprefixer') : null,
  isProd ? require('cssnano')({
    preset: ['default', {
      discardComments: {
        removeAll: true,
      },
    }]
  }) : null
]

module.exports = {
  plugins
}