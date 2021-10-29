const esbuild = require('esbuild');
const browserslist = require('browserslist');
const browserslistProd = require('./package.json').browserslist.production;
const { esbuildPluginBrowserslist, resolveToEsbuildTarget } = require('esbuild-plugin-browserslist');


async function buildProd() {
  const browserslistConfigString = browserslistProd.join(', ')
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