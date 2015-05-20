
var React = require('react');

var ReactInput = require('./ReactInput.jsx');

var QuizFactory = React.createClass({

  getInitialState: function () {

    return {
      index: 0,
      quizTitle: "",
      author: "",
      desc: "",
      questions: [
        {
          text: "",
          points: 0,
          type: "",
          answers: []
        }
      ]
    };
  },

  render: function () {

    var answerNodes = this.state.questions[this.state.index]
        .answers
        .map( function (answer, index) {
          console.log(answer);
          return (
            <li className="list-group-item" key={ index }>
              <span>
                <ReactInput type="text" name={ "answer" + index }
                          placeholder="answer"
                          value={ answer.text }
                          callBack={ this._onAnswerChange }
                />
                <input type="checkbox" className="pull-right" checked={ answer.correct }/>
                <div className="clearfix"></div>
              </span>
            </li>
          );

    }, this);



    return (
      <div className = "panel panel-default" >
        <div className = "panel-heading">
          <ReactInput type="text" name="quizTitle" placeholder="Quiz Title"
                      value={ this.state.quizTitle }
                      callBack={ this._onTitleChange }
          />
        </div>
        <div className = "panel-body" key={ this.state.index }>
          <ReactInput type="textarea" name="question"
                      placeholder="Enter your Question here."
                      value={ this.state.questions[this.state.index].text }
                      callBack={ this._onQuestionChange }
          />
          <ul className="list-group list-unstyled">
            { answerNodes }
          </ul>
          <hr/>
          <span>
            <input type="text" name="answer" placeholder="Next Answer" size="60"
                   onKeyPress={ this._onNextAnswer }/>
            <span className="pull-right">
              <input type="checkbox" ref="correct">Correct:</input>
            </span>
          </span>
        </div>
        <div className = "panel-footer">
          <button className = "btn btn-default">Prev</button>
          <button className = "btn btn-default pull-right">Next</button>
          <div className = "clearfix"></div>
        </div>
      </div>
    );
  },

  _onTitleChange: function ( val ) {
    console.log('[METHOD]: onChange() in QuizFactory: ', val);

    this.setState({
      title: val
    });
  },

  _onQuestionChange: function ( val ) {
    var questions = this.state.questions;
    questions[this.state.index].text = val;


    this.setState({
      questions: questions
    });
  },

  _onNextAnswer: function ( e ) {
    var answerText, answerCorrect,
        answers, questions;

    if ( e.key === "Enter" ) {
      answerText = e.target.value.trim();
      answerCorrect = React.findDOMNode(this.refs.correct).checked;

      answers = this.state.questions[this.state.index].answers;
      answers.push({text: answerText, correct: answerCorrect});

      questions = this.state.questions;
      questions[this.state.index].answers = answers;

      this.setState({
        questions: questions
      });
    }

  },

  _onAnswerChange: function () {
    console.log("[METHOD]: onAnswerChange()");
  },

});

module.exports = QuizFactory;
