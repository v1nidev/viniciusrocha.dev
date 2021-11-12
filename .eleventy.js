const shortcodes = getShortcodes()

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

function getShortcodes() {
  return [
    function p(content, classes) {
      return `
      <p class="text-sm lg:text-base ${classes}">
        ${content}
      </p>
    `
    },

    function sectTitle(pair, classes) {
      return `
      <h2 class="
        text-xl md:text-3xl lg:text-4xl tracking-wider
        leading-snug md:leading-snug lg:leading-normal xl:leading-normal
        text-gray-400 ${classes}
      ">
        ${pair[1] ? pair[0] : ''}
        <br>
        <span class="text-5xl md:text-6xl lg:text-7xl font-bold">${pair[1] || pair[0]}</span>
      </h2>
    `
    }
  ]
}