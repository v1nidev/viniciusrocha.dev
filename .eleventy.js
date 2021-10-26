module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("./src/fonts/");
  eleventyConfig.addPassthroughCopy("./src/img/");
  eleventyConfig.addPassthroughCopy("./src/admin/");
  eleventyConfig.setBrowserSyncConfig({
    ...eleventyConfig.browserSyncConfig,
    files: [
      'dist/css/**/*.css'
    ],
    ghostMode: false
  })
  
  return {
    dir: {
      input: "src",
      output: "dist",
    },
  };
};