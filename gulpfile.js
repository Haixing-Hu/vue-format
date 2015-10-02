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
var webpackConfig = require("./webpack.config.js");
var runSequence = require("run-sequence");
var karma = require("gulp-karma");
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
  del([ dirs.archive, dirs.dist, dirs.coverage ], done);
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

gulp.task("webpack", function(callback) {
  // modify some webpack config options
  var webpackProdConfig = Object.create(webpackConfig);
  webpackProdConfig.plugins.push(new webpack.DefinePlugin({
    "process.env": {
      // This has effect on the react lib size
      "NODE_ENV": JSON.stringify("production")
    }
  }), new webpack.optimize.UglifyJsPlugin());
  webpackProdConfig.output.filename = "[name].min.js";
  // run webpack
  webpack(webpackProdConfig, function(err, stats) {
    if(err) throw new gutil.PluginError("webpack:build", err);
    gutil.log("[webpack:build]", stats.toString({
      colors: true
    }));
    callback();
  });
});

gulp.task('test', function() {
  // Be sure to return the stream
  //process.env.TEST_TYPE = "coverage";
  return gulp.src([
      path.join(dirs.test, "specs", "**", "*.js")
    ], {
      dot: false
    }).pipe(karma({
      configFile: 'karma.conf.js',
      action: 'run'
    })).on('error', function(err) {
      console.log("error: " + err);
      // Make sure failed tests cause gulp to exit non-zero
      throw err;
    });
});

// ---------------------------------------------------------------------
// | Main tasks                                                        |
// ---------------------------------------------------------------------

gulp.task("build-dev", function (done) {
  runSequence(
    "clean",
    "test",
    "webpack-dev",
  done);
});

gulp.task("build", function (done) {
  runSequence(
    "clean",
    "test",
    "webpack-dev",
    "webpack",
  done);
});

gulp.task("archive", function (done) {
  runSequence(
    "test",
    "build",
    "archive:zip",
  done);
});

gulp.task("default", ["build"]);