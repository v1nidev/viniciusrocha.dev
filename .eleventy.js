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
  
  eleventyConfig.addShortcode(
    'p',
    (content) => `
    <p class="text-xs md:text-sm lg:text-base">
      ${content}
    </p>
  `
  );

  return {
    dir: {
      input: "src",
      output: "dist",
    },
  };
};