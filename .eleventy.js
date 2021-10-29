const shortcodes = require('./src/_includes/shortcodes')

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("./src/fonts/");
  eleventyConfig.addPassthroughCopy("./src/img/");
  eleventyConfig.addPassthroughCopy("./src/admin/");
  eleventyConfig.setBrowserSyncConfig({
    ...eleventyConfig.browserSyncConfig,
    files: [
      'dist/css/**/*.css',
      'dist/js/**/*.js',
    ],
    ghostMode: false
  })
  
  shortcodes.forEach(fn => eleventyConfig.addShortcode(fn.name, fn))

  return {
    dir: {
      input: "src",
      output: "dist",
    },
  };
};