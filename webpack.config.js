//  Configuration file of webpack
//  Copyright 2010-2015 Shanghai Convertergy Energy Technology Co., Ltd.
var path = require("path");
var webpack = require("webpack");
var BowerWebpackPlugin = require("bower-webpack-plugin");
var pkg = require(path.join(__dirname, "package.json"));
var dirs = pkg.configs.directories;


module.exports = {
  entry: {
    "vue-format": path.join(__dirname, dirs.src, "vue-format.js")
  },
  resolve: {
    root: [path.join(__dirname, dirs.src)],
    modulesDirectories: [ "lib" ]
  },
  plugins: [
    new webpack.optimize.DedupePlugin(),
    new BowerWebpackPlugin({
      modulesDirectories: [ "lib" ],
      manifestFiles:      "bower.json",
      includes:           /.*/,
      excludes:           [],
      searchResolveModulesDirectories: true
    })
  ],
  output: {
    path: path.join(__dirname, dirs.dist),
    filename: "[name].all.js",
    sourceMapFilename: "[file].map"
  },
};
