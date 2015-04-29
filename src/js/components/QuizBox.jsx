
var React = require('react');

// Components
var Quiz = require('./Quiz.jsx');

// Store
var QuizStore = require('../stores/QuizStore');
var QuizActions = require('../actions/QuizActions');
var QUIZ = require('../stores/QUIZDATA');

QuizActions.create(QUIZ);

var quiz = QuizStore.getFirst();

var QuizBox = React.createClass({

  render: function () {
    return (
      <div className = "quizbox">
        <Quiz src = { quiz }/>
      </div>
    );
  }
});

module.exports = QuizBox;
