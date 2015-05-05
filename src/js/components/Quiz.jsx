
var React = require('react');

var QuizStore = require('../stores/QuizStore');

var QuizDescription = require('./QuizDescription.jsx');
var Question = require('./Question.jsx');
var Summary = require('./Summary.jsx');

var Quiz = React.createClass({
  getInitialState: function () {
    return {
      index: 0,
      done: false,
      running: false,
      points: 0
    };
  },

  componentDidMount: function () {
    QuizStore.addChangeListener(this._onDone);
  },

  componentWillUnmount: function () {
    QuizStore.removeChangeListener(this._onDone);
  },

  render: function () {

    var activeBodyNode = this._activeBodyNode();

    return (
      <div className = "row">
        <div className = "col-md-6 col-md-offset-3">
          <div className = "panel panel-default">
            <div className = "panel-heading">
              <span>{ this.props.src.title }</span>
              <span className = "pull-right"> {this.state.points}</span>
            </div>
            { activeBodyNode }
            <div className = "panel-footer">
              <button className = "btn btn-success pull-right" onClick = { this._handleClick }>
                { this._btnText() }
              </button>
              <div className = "clearfix"></div>
            </div>
          </div>
        </div>
      </div>
    );
  },

  _handleClick: function () {
    if (!this.state.running) {
      this.setState({
        running: true
      });
    }
    this.setState({ index: this.state.index + 1 });
    console.log(this.state.index);'id'
  },

  _onDone: function () {
    this.setState({ mode: "done" });
  },

  _activeBodyNode: function () {
    if ( !this.state.running ) {
      return (
        <div>
          <div className = "panel-body">
            <p> <span> {this.props.src.author}</span> <span> {this.props.src.date}</span> </p>
            <p> {this.props.src.desc } </p>
          </div>
        </div>
      );
    }

    var bodyNodes = this.props.src.questions.map( function( question, index ){
      return (
        <Question text = {question.text} type = {question.type}
                  points = {question.points} answers = {question.answers}
                  key = {index} next = {this._handleClick } />
      );
    }, this );

    return bodyNodes[ this.state.index ];
  },

  _btnText: function () {
    return !this.state.done ? "Done" : "Next";
  }
});

module.exports = Quiz;
