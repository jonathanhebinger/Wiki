const path = require('path');
const cracoBabelLoader = require('craco-babel-loader');

const resolvePackage = relativePath => path.resolve(__dirname, relativePath);

module.exports = {
  webpack: {
    alias: {
      react: resolvePackage('./node_modules/react')
    }
  },
  plugins: [
    {
      plugin: cracoBabelLoader,
      options: {
        includes: [
          resolvePackage('../common'),
          resolvePackage('../ui'),
        ],
        excludes: [/node_modules/]
      }
    }
  ]
}