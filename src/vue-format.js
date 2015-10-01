/**
 * A plugin of Vue.js providing a function for formatting messages.
 *
 * @author Haixing Hu
 */
exports.install = function (Vue, options) {
  var format = require("./format.js");
  // add the $format function
  Vue.prototype.$format = format;
  // register the format filter
  Vue.filter("format", format);
};