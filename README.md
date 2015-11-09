# vue-format

[![Build Status](https://circleci.com/gh/Haixing-Hu/vue-format/tree/master.svg?style=shield)](https://circleci.com/gh/Haixing-Hu/vue-format/tree/master)
[![Coverage Status](https://coveralls.io/repos/Haixing-Hu/vue-format/badge.svg?branch=master&service=github)](https://coveralls.io/github/Haixing-Hu/vue-format?branch=master)
[![bitHound Score](https://www.bithound.io/github/Haixing-Hu/vue-format/badges/score.svg)](https://www.bithound.io/github/Haixing-Hu/vue-format)
[![Dependency Status](https://david-dm.org/Haixing-Hu/vue-format.svg)](https://david-dm.org/Haixing-Hu/vue-format)
[![devDependency Status](https://david-dm.org/Haixing-Hu/vue-format/dev-status.svg)](https://david-dm.org/Haixing-Hu/vue-format#info=devDependencies)

A Vue.js plugin provides a function for formatting messages.

# Requirements
- [Vue.js](https://github.com/yyx990803/vue) `^0.12.0`

# Instllation

## npm

```shell
$ npm install vue-format
```

## bower

```shell
$ bower install vue-format
```

# Usage

```javascript
var Vue = require('vue')
var format = require('vue-format')

// set plugin
Vue.use(format)

// create instance
new Vue({
  el: '#test-format',
  data: {
    template: "Hello {0}, {1}! {0}, and {{0}}"    // list formatting template
  },
  methods: {
    foo: function(arg1, arg2) {
      return this.$format(template2, arg1, arg2);
    }
  }
})
```

Template the following:

```html
<div id="test-format" class="message">
  <p>{{ foo("world", 123) }}</p>
  <p>{{ $format(template, "world", 456) }}</p>
  <p>{{ template | format "world" 789 }}</p>
</div>
```

Output the following:

```html
<div id="test-format" class="message">
  <p>Hello world, 123! world, and {0}</p>
  <p>Hello world, 456! world, and {0}</p>
  <p>Hello world, 789! world, and {0}</p>
</div>
```

Note that the double brackets, e.g., `{{0}}`, will escape the brackets.

# API

## `$format(message, arg1, arg2, ...)`

This is a Vue instance method used to format the messages with arguments.
- `message`: the message template, which is a string contains zero or more placeholders, e.g., "{0}", "{1}", ...
- `arg1`, `arg2`, ...: zero or more arguments used to replace the corresponding placeholders in the message template.
- return: the formatted message.
- If there is no formatting arguments provided, the function simply returns the message without any changes.
- If there is any argument which is `null` or `undefined`, or if there is no enough argument provided, the function will treat those arguments as empty strings.
- If there is no message nor arguments, the function returns an empty string.
- In order to escape a brackets, use double brackets; e.g., `{{0}}` will be treated as a string `{0}` with escaped brackets.

## `format`

This is a customized Vue filter used to format messages.
- Usage example: `{{ message | format arg1 arg2 }}`
- The effect of this filter is the same as the effect of the `$format()` function.

# Contributing
- Fork it !
- Create your top branch from `dev`: `git branch my-new-topic origin/dev`
- Commit your changes: `git commit -am 'Add some topic'`
- Push to the branch: `git push origin my-new-topic`
- Submit a pull request to `dev` branch of `Haixing-Hu/vue-format` repository !

# Building and Testing

First you should install all depended NPM packages. The NPM packages are used
for building and testing this package.

```shell
$ npm install
```

Then install all depended bower packages. The bower packages are depended by
this packages.

```shell
$ bower install
```

Now you can build the project.
```shell
$ gulp build
```

The following command will test the project.
```shell
$ gulp test
```

The following command will perform the test and generate a coverage report.
```shell
$ gulp test:coverage
```

The following command will perform the test, generate a coverage report, and
upload the coverage report to [coveralls.io](https://coveralls.io/).
```shell
$ gulp test:coveralls
```

You can also run `bower install` and `gulp build` together with the following
command:
```shell
npm build
```

Or run `bower install` and `gulp test:coveralls` together with the following
command:
```shell
npm test
```

# License

[The MIT License](http://opensource.org/licenses/MIT)
