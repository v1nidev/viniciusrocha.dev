const postcss = require('postcss')
const doiuse = require('doiuse')
const browserslistProd = require('./package.json').browserslist.production;
const isProd = process.env.NODE_ENV === 'production'

const plugins = [
  require('postcss-import')({
    root: 'src/css/index.css'
  }),
  require('tailwindcss/nesting'),
  require('tailwindcss')(`./tailwind.config.js`),
  isProd ? doiuse({
    browsers: browserslistProd,
    ignore: ['css3-tabsize', 'text-size-adjust', 'css-resize', 'multicolumn'],
    onFeatureUsage: function (usageInfo) {
      console.log(usageInfo.message)
    }
  }) : null,
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