
var React = require('react');

// Components
var Quiz = require('./Quiz.jsx');

// Store (just a mock for now)
var QUIZDATA = require('../stores/QUIZDATA.js');


var QuizBox = React.createClass({

  render: function () {
    return (
      <div className = "quizbox">
        <Quiz src = { QUIZDATA }/>
      </div>
    );
  }
});

module.exports = QuizBox;
