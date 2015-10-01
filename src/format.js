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

var PLACEHOLDER_REGEXP = /\{([0-9a-zA-Z]+)\}/g;

module.exports = function() {
  if (arguments.length === 0) {
    return "";
  } else if (arguments.length === 1) {
    return arguments[0];
  } else {
    var args = arguments;
    var message = args[0];
    return message.replace(PLACEHOLDER_REGEXP, function(match, placeholder, index) {
      if (message[index - 1] === "{" && message[index + match.length] === "}") {
        return placeholder; // deal with the escaped brackets
      } else {
        var i = parseInt(placeholder);
        var result = args[i + 1];
        if (result === null || result === undefined) {
          return "";
        } else {
          return result;
        }
      }
    });
  }
};