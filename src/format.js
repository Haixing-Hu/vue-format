/**
 * Formats messages.
 *
 * @param template
 *    the message template, which contains zero or more placeholders, e.g.,
 *    "{0}", "{1}", ...
 * @param arg1, arg2, ...
 *    zero or more arguments used to replace the corresponding placeholders
 *    in the message template.
 * @return
 *    the formatted message.
 * @author Haixing Hu
 */
module.exports = function() {
  if (arguments.length === 0) {
    return "";
  } else if (arguments.length === 1) {
    return arguments[0];
  } else {
    var n = arguments.length;
    var message = arguments[0];
    for (var i = 1; i < n; ++i) {
      var regexp = new RegExp("\\{" + (i - 1) + "\\}", "gm");
      message = message.replace(regexp, arguments[i]);
    }
    return message;
  }
};