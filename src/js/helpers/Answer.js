
var assign = require('object-assign');

var Answer = function(text ) {
  this.text = text;
}

// Answer.prototype
var _proto = {

  setText: function (text) {
    this.text = text;
    return this;
  },

  getText: function () {
    return this.text;
  },

  setCorrect: function (bool) {
    this.correct = bool;
    return this;
  },

  getCorrect: function () {
    this.correct;
  },

  toggleCorrect: function () {
    this.correct = !this.correct;
  },
}

assign(Answer.prototype, _proto);

module.exports = Answer;
