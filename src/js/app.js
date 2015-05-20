
var React = require('react');

// Components
var Quiz = require('./components/Quiz.jsx');
var QuizFactory = require('./components/QuizFactory.jsx');

// Store
var QuizStore = require('./stores/QuizStore');
var QuizActions = require('./actions/QuizActions');
var QUIZ = require('./stores/QUIZDATA');

QuizActions.create(QUIZ);

var quiz = QuizStore.getFirst();

React.render( <Quiz src={quiz}/>, document.getElementById('content'));
React.render( <QuizFactory/>, document.getElementById('factory'));
