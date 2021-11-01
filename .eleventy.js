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
    function p(content) {
      return `
      <p class="text-xs md:text-sm lg:text-base">
        ${content}
      </p>
    `
    },

    function sectTitle(pair) {
      return `
      <h2 class="text-lg xl:text-5xl tracking-wider text-gray-500 leading-snug xl:leading-normal">
        ${pair[0] ? pair[0] : ''}
        <br>
        <span class="text-4xl xl:text-8xl font-bold">${pair[1] || pair[1]}</span>
      </h2>
    `
    }
  ]
}