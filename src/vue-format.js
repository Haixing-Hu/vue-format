/**
 * vue-format: A plugin of Vue.js providing a function for formatting messages.
 *
 * License: The MIT License
 * Author: Haixing Hu
 */
exports.install = function (Vue, options) {
  var format = require("string-template");
  Vue.prototype.$format = format;
};