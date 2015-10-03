/*!
 * vue-format v0.2.1
 * (c) 2015 Haixing Hu
 * Released under the MIT License.
 */
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * A plugin of Vue.js providing a function for formatting messages.
	 *
	 * @author Haixing Hu
	 */
	exports.install = function (Vue, options) {
	  var format = __webpack_require__(1);
	  // add the $format function
	  Vue.prototype.$format = format;
	  // register the format filter
	  Vue.filter("format", format);
	};

/***/ },
/* 1 */
/***/ function(module, exports) {

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

/***/ }
/******/ ]);
//# sourceMappingURL=vue-format.js.map