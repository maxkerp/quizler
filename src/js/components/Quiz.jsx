
var React = require('react');

var StateStore = require('../stores/StateStore');
var StateActions = require('../actions/StateActions');

var QuizDescription = require('./QuizDescription.jsx');
var Question = require('./Question.jsx');
var Summary = require('./Summary.jsx');

var Quiz = React.createClass({
  getInitialState: function () {
    return {
      index: 0,
      done: false,
      running: false,
      finished: false,
      points: 0
    };
  },

  componentDidMount: function () {
    StateStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function () {
    StateStore.removeChangeListener(this._onChange);
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
    // if not running set running and go forward
    // if running and not done set done
    // if running and down set undone and go forward
    if ( !this.state.running ) {
      StateActions.update({
        running: true,
        index: this.state.index + 1
      });
    }


    if ( this.state.running && !this.state.done ) {
      StateActions.update({ done: true });
    }

    if ( this.state.running && this.state.done ) {
      StateActions.update({ done: false, index : this.state.index + 1 });
    }
  },

  _onChange: function () {
    this.setState(StateStore.getState());
  },

  _activeBodyNode: function () {
    var questionNodes = [];

    questionNodes.push(
      <div>
        <div className = "panel-body">
          <p> <span> {this.props.src.author}</span> <span> {this.props.src.date}</span> </p>
          <p> {this.props.src.desc } </p>
        </div>
      </div>
    );

    questionNodes = questionNodes.concat(this.props.src.questions.map( function( question, index ){
      var answerNodes = question.answers.map( function (answer, i) {
        return (
          <li className = {this._getColor()} key = {i} >
            {answer.text}
            <input ref = "input" className = "pull-right" type = "checkbox" />
          </li>
        );
      }, this );

      return (
          <div className = "panel-body" key = { index }>
            <p>
              {question.text}
            </p>
            <ul className = "list-group list-unstyled">
              { answerNodes }
            </ul>
          </div>
      );
    }, this ));

    return questionNodes[ this.state.index ];
  },

  _btnText: function () {
    return !this.state.done ? "Done" : "Next";
  },

  _getColor: function () {
    
    var colorClass = "";

    if ( this.props.color ) {
      if ( this.props.isCorrect ) {
        colorClass = "list-group-item-success";
      } else if ( !this.props.isCorrect ) {
        colorClass = "list-group-item-danger";
      }
    }


    return " list-group-item " + colorClass;
  },
});

module.exports = Quiz;
