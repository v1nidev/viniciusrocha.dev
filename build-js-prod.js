const esbuild = require('esbuild');
const browserslist = require('browserslist');
const browserslistConfig = require('./package.json').browserslist;
const { esbuildPluginBrowserslist, resolveToEsbuildTarget } = require('esbuild-plugin-browserslist');


async function buildProd() {
  const browserslistConfigString = browserslistConfig.production.join(', ')
  const target = resolveToEsbuildTarget(browserslist(browserslistConfigString), {
    printUnknownTargets: false,
  });

  await esbuild.build({
    entryPoints: ['./src/js/index.js'],
    minify: true,
    bundle: true,
    outdir: './dist/js',
    target,
  });
}

buildProd()