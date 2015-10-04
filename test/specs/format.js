var assert = require("assert");
var format = require("../../src/format.js");

describe("format", function() {
  describe("argument", function() {

    context("normal", function() {
      it("should be replaced with arguments", function() {
        var template = "name: {0}, email: {1}, name: {0}, email: {1}";
        assert.equal(format(template, "starfish", "foo@domain.com"),
          "name: starfish, email: foo@domain.com, name: starfish, email: foo@domain.com");
      });
    });

    context("not specify", function() {
      it("should not perform the replacement", function() {
        var template = "name: {0}, email: {1}, name: {0}, email: {1}";
        assert.equal(format(template),
          "name: {0}, email: {1}, name: {0}, email: {1}");
      });
      it("the second placeholder should be replaced with empty", function() {
        var template = "name: {0}, email: {1}, name: {0}, email: {1}";
        assert.equal(format(template, "starfish"),
          "name: starfish, email: , name: starfish, email: ");
      });
    });

    context("null", function() {
      it("should be replaced with empty", function() {
        var template = "name: {0}, email: {1}, name: {0}, email: {1}";
        assert.equal(format(template, null, null),
            "name: , email: , name: , email: ");
      });
    });

    context("undefined", function() {
      it("should be replaced with empty", function() {
        var template = "name: {0}, email: {1}, name: {0}, email: {1}";
        assert.equal(format(template, undefined, undefined),
          "name: , email: , name: , email: ");
      });
    });

    context("no argument", function() {
      it("should return empty string", function() {
        assert.equal(format(), "");
      });
    });

    context("escaped brackets", function() {
      it("should not replace the escaped brackets", function() {
        var template = "name: {{0}}, email: {1}, name: {0}, email: {{1}}";
        assert.equal(format(template, "starfish", "foo@domain.com"),
          "name: {0}, email: foo@domain.com, name: starfish, email: {1}");
      });
    });
  });
});
