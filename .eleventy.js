const shortcodes = getShortcodes();

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("./src/fonts/");
  eleventyConfig.addPassthroughCopy("./src/img/");
  eleventyConfig.addPassthroughCopy("./src/admin/");
  eleventyConfig.addPassthroughCopy({ "./src/public/": "/" });
  eleventyConfig.setBrowserSyncConfig({
    ...eleventyConfig.browserSyncConfig,
    files: ["dist/css/**/*.css", "dist/js/**/*.js"],
    ghostMode: false,
  });

  shortcodes.forEach((fn) => eleventyConfig.addShortcode(fn.name, fn));

  return {
    dir: {
      input: "src",
      output: "dist",
    },
  };
};

function getShortcodes() {
  return [
    function bodyText(content, classes) {
      return `
      <div class="body-text text-sm lg:text-base ${classes}">
        ${content}
      </div>
    `;
    },
  ];
}
