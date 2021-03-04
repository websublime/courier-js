// eslint-disable-next-line simple-import-sort/imports
import { resolve } from 'path';

// eslint-disable-next-line import/no-extraneous-dependencies
import esbuild from 'rollup-plugin-esbuild';

/**
 * @type {import('vite').UserConfig}
 */

const config = {
  plugins: [esbuild({
    // default, or 'es20XX', 'esnext'
    // Like @rollup/plugin-replace
    define: {
      __VERSION__: '"x.y.z"'
    },
    // default, inferred from `loaders` option
    exclude: /node_modules/,
    // All options are optional
    include: /\.[jt]sx?$/,
    // default
    // Add extra loaders
    loaders: {
      // Add .json files support
      // require @rollup/plugin-commonjs
      '.json': 'json'
    },
    // default
    minify: process.env.NODE_ENV === 'production',
    // default
    sourceMap: false,
    target: 'es2017',
    tsconfig: 'tsconfig.json'
  })],
  root: resolve(__dirname, 'src')
};

export default config;
