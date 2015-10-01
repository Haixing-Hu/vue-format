var assert = require("power-assert");
var Vue = require("vue");
var VueFormat = require("../../src/vue-format");

describe("vue-format", function() {

  before(function() {
    Vue.use(VueFormat);
  });

  describe("$format function", function() {
    context("normal", function() {
      it("should be replaced with arguments", function() {
        var template = "name: {0}, email: {1}, name: {0}, email: {1}";
        var vm = new Vue();
        assert.equal(vm.$format(template, "starfish", "foo@domain.com"),
          "name: starfish, email: foo@domain.com, name: starfish, email: foo@domain.com");
      });
    });

    context("not specify", function() {
      it("should not perform the replacement", function() {
        var template = "name: {0}, email: {1}, name: {0}, email: {1}";
        var vm = new Vue();
        assert.equal(vm.$format(template),
          "name: {0}, email: {1}, name: {0}, email: {1}");
      });
      it("the second placeholder should be replaced with empty", function() {
        var template = "name: {0}, email: {1}, name: {0}, email: {1}";
        var vm = new Vue();
        assert.equal(vm.$format(template, "starfish"),
          "name: starfish, email: , name: starfish, email: ");
      });
    });

    context("null", function() {
      it("should be replaced with empty", function() {
        var template = "name: {0}, email: {1}, name: {0}, email: {1}";
        var vm = new Vue();
        assert.equal(vm.$format(template, null, null),
            "name: , email: , name: , email: ");
      });
    });

    context("undefined", function() {
      it("should be replaced with empty", function() {
        var template = "name: {0}, email: {1}, name: {0}, email: {1}";
        var vm = new Vue();
        assert.equal(vm.$format(template, undefined, undefined),
          "name: , email: , name: , email: ");
      });
    });

    context("no argument", function() {
      it("should return empty string", function() {
        var vm = new Vue();
        assert.equal(vm.$format(), "");
      });
    });

    context("escaped brackets", function() {
      it("should not replace the escaped brackets", function() {
        var template = "name: {{0}}, email: {1}, name: {0}, email: {{1}}";
        var vm = new Vue();
        assert.equal(vm.$format(template, "starfish", "foo@domain.com"),
          "name: {0}, email: foo@domain.com, name: starfish, email: {1}");
      });
    });
  });

  describe("format filter", function() {

    context("normal", function() {
      it("should be replaced with arguments", function(done) {
        var ViewModel = Vue.extend({
          template: "<div><p>{{ message | format name email}}</p></div>",
          data: function() {
            return {
              message: "name: {0}, email: {1}, name: {0}, email: {1}",
              name: "starfish",
              email: "foo@domain.com"
            };
          },
          el: function() {
            var el = document.createElement("div");
            el.id = "test-normal";
            document.body.appendChild(el);
            return el;
          }
        });
        var vm = new ViewModel();
        vm.$nextTick(function() {
          var el = document.querySelector("#test-normal");

          assert.equal(el.textContent,
            "name: starfish, email: foo@domain.com, name: starfish, email: foo@domain.com");
          done();
        });
      });
    });

    context("not specify", function() {
      it("should not perform the replacement", function(done) {
        var ViewModel = Vue.extend({
          template: "<div><p>{{ message | format }}</p></div>",
          data: function() {
            return {
              message: "name: {0}, email: {1}, name: {0}, email: {1}",
              name: "starfish",
              email: "foo@domain.com"
            };
          },
          el: function() {
            var el = document.createElement("div");
            el.id = "test-not-specify";
            document.body.appendChild(el);
            return el;
          }
        });
        var vm = new ViewModel();
        vm.$nextTick(function() {
          var el = document.querySelector("#test-not-specify");
          assert.equal(el.textContent,
            "name: {0}, email: {1}, name: {0}, email: {1}");
          done();
        });
      });

      it("the second placeholder should be replaced with empty", function(done) {
        var ViewModel = Vue.extend({
          template: "<div><p>{{ message | format name }}</p></div>",
          data: function() {
            return {
              message: "name: {0}, email: {1}, name: {0}, email: {1}",
              name: "starfish",
              email: "foo@domain.com"
            };
          },
          el: function() {
            var el = document.createElement("div");
            el.id = "test-not-specify-second";
            document.body.appendChild(el);
            return el;
          }
        });
        var vm = new ViewModel();
        vm.$nextTick(function() {
          var el = document.querySelector("#test-not-specify-second");
          assert.equal(el.textContent,
            "name: starfish, email: , name: starfish, email: ");
          done();
        });
      });
    });

    context("null", function() {
      it("should be replaced with empty", function(done) {
        var ViewModel = Vue.extend({
          template: "<div><p>{{ message | format name email }}</p></div>",
          data: function() {
            return {
              message: "name: {0}, email: {1}, name: {0}, email: {1}",
              name: null,
              email: null
            };
          },
          el: function() {
            var el = document.createElement("div");
            el.id = "test-null";
            document.body.appendChild(el);
            return el;
          }
        });
        var vm = new ViewModel();
        vm.$nextTick(function() {
          var el = document.querySelector("#test-null");
          assert.equal(el.textContent,
            "name: , email: , name: , email: ");
          done();
        });
      });
    });

    // context("undefined", function() {
    //   it("should be replaced with empty", function(done) {
    //     var ViewModel = Vue.extend({
    //       template: "<div><p>{{ message | format name email }}</p></div>",
    //       data: function() {
    //         return {
    //           message: "name: {0}, email: {1}, name: {0}, email: {1}",
    //           name: undefined,
    //           email: undefined
    //         };
    //       },
    //       el: function() {
    //         var el = document.createElement("div");
    //         el.id = "test";
    //         document.body.appendChild(el);
    //         return el;
    //       }
    //     });
    //     var vm = new ViewModel();
    //     vm.$nextTick(function() {
    //       var el = document.querySelector("#test");
    //       assert.equal(el.textContent,
    //         "name: , email: , name: , email: ");
    //       done();
    //     });
    //   });
    // });

    context("escaped brackets", function() {
      it("should not replace the escaped brackets", function(done) {
        var ViewModel = Vue.extend({
          template: "<div><p>{{ message | format name email}}</p></div>",
          data: function() {
            return {
              message: "name: {{0}}, email: {1}, name: {0}, email: {{1}}",
              name: "starfish",
              email: "foo@domain.com"
            };
          },
          el: function() {
            var el = document.createElement("div");
            el.id = "test-normal";
            document.body.appendChild(el);
            return el;
          }
        });
        var vm = new ViewModel();
        vm.$nextTick(function() {
          var el = document.querySelector("#test-escaped-brackets");
          assert.equal(el.textContent,
            "name: {0}, email: foo@domain.com, name: starfish, email: {1}");
          done();
        });
      });
    });
  });
});
