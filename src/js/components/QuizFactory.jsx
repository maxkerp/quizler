
var React = require('react');

var ReactInput = require('./ReactInput.jsx');

// Quiz and Answer act as the Stores in the flux architecture pattern
var Quiz = require('../helpers/Quiz.js');
var Question = require('../helpers/Question.js');
var Answer = require('../helpers/Answer.js');



var QuizFactory = React.createClass({

  componentDidMount: function () {
    Quiz.addChangeListener(this._onChange);
  },

  componentWillUnmount: function () {
    Quiz.removeChangeListener(this._onChange);
  },

  _onChange: function () {
    this.setState({
      quiz: Quiz
    });
  },

  getInitialState: function () {

    Quiz.initialize();

    return {
      index: 0,
      quiz: Quiz
    };
  },

  render: function () {

    console.log(Quiz);

    var answerNodes = this.state.quiz.getQuestion(this.state.index)
        .getAnswers()
        .map( function (answer, index) {
          return (
            <li className="list-group-item" key={ answer.text }>
              <span>
                <ReactInput type="text" name={ "answer" + index }
                          placeholder="answer"
                          value={ answer.text }
                          callBack={ this._onAnswerChange.bind(this, index) }
                />
                <input type="checkbox" className="pull-right" checked={ answer.correct }
                       onChange={this._onCheckedChange.bind(this, index)}
                  />
                <button type="button" className="btn btn-default pull-right"
                        onClick={ this._onRemoveAnswer.bind(this, index) }
                  >
                  x
                </button>
                <div className="clearfix"></div>
              </span>
            </li>
          );

    }, this);

    var questionText = this.state.quiz.getQuestion(this.state.index)
                                      .getText();

    return (
      <div className = "panel panel-default" >
        <div className = "panel-heading">
          <ReactInput type="text" name="quizTitle" placeholder="Quiz Title"
                      value={ this.state.quiz.title }
                      callBack={ this._onTitleChange }
          />
        </div>
        <div className = "panel-body" key={ "question" + this.state.index }>
          <ReactInput type="textarea" name="question"
                      placeholder="Enter your Question here."
                      value={ questionText }
                      callBack={ this._onQuestionChange }
          />
          <ul className="list-group list-unstyled">
            { answerNodes }
          </ul>
          <hr/>
          <span>
            <input type="text" name="answer" ref="nextanswer" placeholder="Next Answer" size="60"
                   onKeyPress={ this._onNextAnswer }/>
            <span className="pull-right">
              <input type="checkbox" ref="correct">Correct:</input>
            </span>
          </span>
        </div>
        <div className = "panel-footer">
          <button className = "btn btn-default" onClick={this._onPrev}>Prev</button>
          <button className = "btn btn-default pull-right" onClick={this._onNext}>Next</button>
          <div className = "clearfix"></div>
        </div>
      </div>
    );

  },

  _onTitleChange: function ( val ) {
    Quiz.setTitle(val);
  },

  _onQuestionChange: function ( val ) {
    Quiz.getQuestion(this.state.index).setText(val);
    Quiz.emitChange();
  },

  _onNextAnswer: function ( e ) {
    var answer;

    if ( e.key === "Enter" ) {
      answer = new Answer();

      answer.setText(e.target.value.trim())
            .setCorrect(React.findDOMNode(this.refs.correct).checked);

      Quiz.getQuestion(this.state.index).appendAnswer(answer);
      Quiz.emitChange();

      React.findDOMNode(this.refs.nextanswer).value = "";

    }

  },

  _onAnswerChange: function ( index, val) {
    console.log("[METHOD]: onAnswerChange()");
    Quiz.getQuestion(this.state.index).getAnswer(index).setText(val);
    Quiz.emitChange;
  },

  _onCheckedChange: function (index) {
    Quiz.getQuestion(this.state.index).getAnswer(index).toggleCorrect();
    Quiz.emitChange();
  },

  _onRemoveAnswer: function (ansIndex) {
    console.log("removeAnswer");
    Quiz.getQuestion(this.state.index).removeAnswer(ansIndex);
    Quiz.emitChange();
  },

  _onPrev: function () {
    this.setState({
      index: this.state.index - 1
    });
  },

  _onNext: function () {
    if (Quiz.getQuestion(this.state.index + 1) === undefined ) {
      Quiz.appendQuestion( new Question());
    }

    this.setState({
      index: this.state.index + 1
    });
  },

});

module.exports = QuizFactory;
