# vue-format

[![Build Status](https://circleci.com/gh/Haixing-Hu/vue-format/tree/master.svg?style=shield)](https://circleci.com/gh/Haixing-Hu/vue-format/tree/master)
[![Coverage Status](https://coveralls.io/repos/Haixing-Hu/vue-format/badge.svg?branch=master&service=github)](https://coveralls.io/github/Haixing-Hu/vue-format?branch=master)


A Vue.js plugin provides a function for formatting messages.

# Requirements
- [Vue.js](https://github.com/yyx990803/vue) ^`0.12.0`

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
<div id="test-i18n" class="message">
  <p>Hello world, 123! world, and {0}</p>
  <p>Hello world, 456! world, and {0}</p>
  <p>Hello world, 789! world, and {0}</p>
</div>
```

Note that the double brackets, e.g., `{{0}}`, will escape the brackets.

# API

## Vue instance function `$format(message, arg1, arg2, ...)`

Formats the messages with arguments.
- message: the message template, which is a string contains zero or more placeholders, e.g., "{0}", "{1}", ...
- arg1, arg2, ...: zero or more arguments used to replace the corresponding placeholders in the message template.
- return: the formatted message.

## Vue filter `format`

A customized filter used to format messages.
- Usage example: `{{ message | format arg1 arg2 }}`

# Contributing
- Fork it !
- Create your top branch from `dev`: `git branch my-new-topic origin/dev`
- Commit your changes: `git commit -am 'Add some topic'`
- Push to the branch: `git push origin my-new-topic`
- Submit a pull request to `dev` branch of `Haixing-Hu/vue-format` repository !

# License

[The MIT License](http://opensource.org/licenses/MIT)
