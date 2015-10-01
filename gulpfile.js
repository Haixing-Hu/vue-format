//  Gulp building scripts
var fs = require("fs");
var path = require("path");
var gulp = require("gulp");
var glob = require("glob");
var del = require("del");
var archiver = require("archiver")("zip");
var uglify = require("gulp-uglify");
var gutil = require("gulp-util");
var webpack = require("webpack");
// var WebpackDevServer = require("webpack-dev-server");
var webpackConfig = require("./webpack.config.js");
var runSequence = require("run-sequence");
var pkg = require("./package.json");
var dirs = pkg.configs.directories;

// ---------------------------------------------------------------------
// | Helper tasks                                                      |
// ---------------------------------------------------------------------

gulp.task("archive:zip", function (done) {
  var archiveName = path.resolve(dirs.archive, pkg.name + "_v" + pkg.version + ".zip");
  var files = glob.sync("**/*.*", {
    "cwd": dirs.dist,
    "dot": true // include hidden files
  });
  var output = fs.createWriteStream(archiveName);
  archiver.on("error", function (error) {
    done();
    throw error;
  });
  output.on("close", done);
  files.forEach(function (file) {
    var filePath = path.resolve(dirs.dist, file);
    // `archiver.bulk` does not maintain the file
    // permissions, so we need to add files individually
    archiver.append(fs.createReadStream(filePath), {
      "name": file,
      "mode": fs.statSync(filePath)
    });
  });
  archiver.pipe(output);
  archiver.finalize();
});

gulp.task("clean", function (done) {
  del([ dirs.archive, dirs.dist ], done);
});

gulp.task("webpack", function(callback) {
  // modify some webpack config options
  var webpackProdConfig = Object.create(webpackConfig);
  webpackProdConfig.plugins.push(new webpack.DefinePlugin({
    "process.env": {
      // This has effect on the react lib size
      "NODE_ENV": JSON.stringify("production")
    }
  }), new webpack.optimize.UglifyJsPlugin());
  // run webpack
  webpack(webpackProdConfig, function(err, stats) {
    if(err) throw new gutil.PluginError("webpack:build", err);
    gutil.log("[webpack:build]", stats.toString({
      colors: true
    }));
    callback();
  });
});

gulp.task("webpack-dev", function(callback) {
  // modify some webpack config options
  var webpackDevConfig = Object.create(webpackConfig);
  webpackDevConfig.devtool = "sourcemap";
  webpackDevConfig.debug = true;
  // create a single instance of the compiler to allow caching
  var webpackDevCompiler = webpack(webpackDevConfig);
  // run webpack
  webpackDevCompiler.run(function(err, stats) {
    if(err) throw new gutil.PluginError("webpack:build-dev", err);
    gutil.log("[webpack:build-dev]", stats.toString({
      colors: true
    }));
    callback();
  });
});

// gulp.task("webpack-dev-server", function(callback) {
//   // modify some webpack config options
//   var devServerConfig = Object.create(webpackConfig);
//   devServerConfig.devtool = "eval";
//   devServerConfig.debug = true;
//   // Start a webpack-dev-server
//   new WebpackDevServer(webpack(devServerConfig), {
//     publicPath: "/" + devServerConfig.output.publicPath,
//     stats: {
//       colors: true
//     }
//   }).listen(8080, "localhost", function(err) {
//     if(err) throw new gutil.PluginError("webpack-dev-server", err);
//     gutil.log("[webpack-dev-server]", "http://localhost:8080/webpack-dev-server/index.html");
//   });
// });


// ---------------------------------------------------------------------
// | Main tasks                                                        |
// ---------------------------------------------------------------------

gulp.task("build-dev", function (done) {
  runSequence(
    "clean",
    "webpack-dev",
  done);
});

gulp.task("build", function (done) {
  runSequence(
    "clean",
    "webpack",
  done);
});

gulp.task("archive", function (done) {
  runSequence(
    "build",
    "archive:zip",
  done);
});

gulp.task("default", ["build"]);