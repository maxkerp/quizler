
var React = require('react');

var ReactInput = require('./ReactInput.jsx');

// Private quiz object
var _quiz = {
  author: "",
  title: "",
  desc: "",
  questions: [
    // text:string, points:integer, type:string, answers:Array[object]
  ]
};

var QuizFactory = React.createClass({

  getInitialState: function () {

    _quiz.questions[0] = {
      text: "",
      points: 0,
      text: ""
    }

    return {
      index: 0,
    };
  },

  render: function () {

    return (
      <div className = "panel panel-default" >
        <div className = "panel-heading">
          <ReactInput type="text" name="quizTitle" placeholder="Quiz Title"
                      callBack={ this._onTitleChange }
          />
        </div>
        <div className = "panel-body">
          <ReactInput type="textarea" name="question"
                      placeholder="Enter your Question here."
                      callBack={ this._onQuestionChange }
          />
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

    _quiz.title = val;
    console.log(_quiz);
  },

  _onQuestionChange: function ( val ) {

    _quiz.questions[this.state.index].text = val;

  }

});

module.exports = QuizFactory;
