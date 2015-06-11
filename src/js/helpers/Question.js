
var assign = require('object-assign');
var Answer = require('./Answer.js');

var Question = function () {
  this.answers = [ new Answer() ];
}

// Question.prototype
// using assign to merge both objects. This is much cleaner than to write out
// Question.prototype all the time or overriding the prototype
var _proto = {

  setText: function (text) {
    this.text = text;
    return this;
  },

  getText: function () {
    return this.text;
  },

  setPoints: function (points) {
    this.points = points;
    return this;
  },

  getPoints: function () {
    this.points;
  },

  setType: function (type) {
    this.type = type;
    return this;
  },

  getType: function () {
    this.type;
  },

  setAnswers: function (arr_answers ) {
    if ( Array.isArray(arr_answers) ) {
      this.answers = arr_answers;
      return this;
    } else {
      console.log("arguement must be of type array!");
    }
  },

  getAnswers: function () {
    return this.answers;
  },

  getAnswer: function (index) {
    return this.answers[index];
  },

  appendAnswer: function (answer) {
    this.answers.push(answer);
    return this;
  },

  removeAnswer: function (index) {
    console.log("[Question] answer at index "+ index, this.answers[index]);
    this.answers.splice(index, 1);
  },
}

assign(Question.prototype, _proto);

module.exports = Question;
