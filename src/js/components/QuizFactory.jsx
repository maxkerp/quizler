
var React = require('react');

var QuizFactory = React.createClass({

  getInitialState: function () {
    return {
      index: 0,
      quiz: {}
    };
  },

  render: function () {

    return (
      <div className = "panel panel-default" >
        <div className = "panel-heading">
          <input type = "text" placeholder = "Quiz Title" ref = "quizTitle"
            onKeyDown = { this._titleInput}/>
        </div>
        <div className = "panel-body">
          // questions and Answers or quizDesc
        </div>
        <div className = "panel-footer">
          <button className = "btn btn-default">Prev</button>
          <button className = "btn btn-default pull-right">Next</button>
          <div className = "clearfix"></div>
        </div>
      </div>
    );
  },

  _titleInput: function (e) {
    var input, quiz;
    if (e.key === 'Enter') {
      input = e.target.value.trim();
      quiz = this.state.quiz;
      quiz.title = input;

      this.setState({
        quiz: quiz
      });

      console.log('[QUIZ]:', quiz);
    }
  },
});

module.exports = QuizFactory;
