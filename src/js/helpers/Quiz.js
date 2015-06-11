
var assign = require('object-assign');
var EventEmitter = require('events').EventEmitter;

var Question = require('./Question.js');
var Answer = require('./Answer.js');

var CHANGE_EVENT = 'change';

var Quiz =  { };

// Quiz.prototype
var _proto = {

  initialize: function () {
    this.title = "";
    this.author = "";
    this.desc = "";
    this.date = "";
    this.questions = [ new Question() ];
  },

  setTitle: function (title) {
    this.title = title;
    this.emitChange();
    return this;
  },

  getTitle: function () {
    return this.title;
  },

  setAuthor: function (author) {
    this.author = author;
    this.emitChange();
    return this;
  },

  getAuthor: function () {
    this.author;
  },

  setDate: function (date) {
    // TODO: evaluate if using Date instead of String is better
    this.date = date;
    this.emitChange();
    return this;
  },

  getDate: function () {
    return this.date;
  },

  setDescription: function (desc) {
    this.desc = desc;
    this.emitChange();
    return this;
  },

  getDescription: function () {
    return this.desc;
  },

  setAllQuestions: function (questions) {
    // TODO: Maybe check if contents of arguement are of type Question
    if ( questions instanceof Array ) {
      this.questions = questions;
      this.emitChange();
      return this;
    }
  },

  getAllQuestions: function () {
    return this.questions;
  },

  setQuestion: function (index, obj) {
    this.question[index] = obj;
    this.emitChange();
    return this;
  },

  getQuestion: function (index) {
    return this.questions[index];

  },

  appendQuestion: function (question) {
    this.questions.push(question);
    this.emitChange();
    return this;
  },

  removeQuestion: function (index) {
    this.questions.splice(index, 1);
    this.emitChange();
    return this;
  },

  addChangeListener: function (cb) {
    this.on(CHANGE_EVENT, cb);
  },

  removeChangeListener: function(cb) {
    this.removeListener(CHANGE_EVENT, cb);
  },

  emitChange: function () {
    this.emit(CHANGE_EVENT);
  }
};

assign(Quiz, _proto, EventEmitter.prototype);

module.exports = Quiz;
