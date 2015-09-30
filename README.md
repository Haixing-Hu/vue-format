# vue-format

A Vue.js plugin provides a function for formatting messages.

# Requirements
- [Vue.js](https://github.com/yyx990803/vue) ^`0.12.0`
- [string-template](https://github.com/Matt-Esch/string-template) ^`0.2.0`

# Instllation

## npm

```shell
$ npm install vuejs-format
```

## bower

```shell
$ bower install vuejs-format
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
    template1: "Hello {name}!",     // named formatting template
    template2: "Hello {0}, {1}!"    // list formatting template
  },
  methods: {
    foo: function(str) {
      return this.$format(template1, {name: str});
    },
    bar: function(arg1, arg2) {
      return this.$format(template2, [arg1, arg2]);
    }
  }
})
```

Template the following:

```html
<div id="test-format" class="message">
  <p>{{ foo("world") }}</p>
  <p>{{ bar("world", 123) }}</p>
  <p>{{ $format(template1, {name: "world"}) }}</p>
  <p>{{ $format(template2, ["world", 123]) }}</p>
</div>
```

Output the following:

```html
<div id="test-i18n" class="message">
  <p>Hello world!</p>
  <p>Hello world, 123!</p>
  <p>Hello world!</p>
  <p>Hello world, 123!</p>
</div>
```

# API

## $format(message, [arguments])
- Formats the messages.
- message: `String` **required**
- arguments: `Array | Object` **optional**

# Contributing
- Fork it !
- Create your top branch from `dev`: `git branch my-new-topic origin/dev`
- Commit your changes: `git commit -am 'Add some topic'`
- Push to the branch: `git push origin my-new-topic`
- Submit a pull request to `dev` branch of `Haixing-Hu/vue-format` repository !

# License

## MIT

[MIT](http://opensource.org/licenses/MIT)
