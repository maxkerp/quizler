
var React = require('react');

var Quiz = React.createClass({
  getInitialState: function () {
    var _answers = []
        ,question = this.props.src.questions[0];

    question.answers.forEach( function ( _, index) {
      _answers[index] = null;
    });

    return {
      index: 0,
      points: 0,
      answers: _answers,
      done: false,
      running: false,
      finished: false
    };
  },

  render: function () {
    console.log('[METHOD]: render()');

    // before running show Quiz description
    if ( !this.state.running ) {
      return (
        <div className = "row">
          <div className = "col-md-6 col-md-offset-3">
            <div className = "panel panel-default">
              <div className = "panel-heading">
                <span>{ this.props.src.title }</span>
                <span className = "pull-right"> {this.state.points}</span>
              </div>
              <div className = "panel-body">
                <p>
                  { this.props.src.desc }
                </p>
              </div>
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
    }

    // show summary if finished
    if ( this.state.finished ) {
      return (
        <div className = "row">
          <div className = "col-md-6 col-md-offset-3">
            <div className = "panel panel-default">
              <div className = "panel-heading">
                <span>{ this.props.src.title }</span>
                <span className = "pull-right"> {this.state.points}</span>
              </div>
              <div className = "panel-body">
                <p>
                  Congratulations you made { this.state.points } out of { this.props.src.maxPoints } Points!
                </p>
              </div>
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
    }

    var self = this;

    var question = this.props.src.questions[this.state.index];

    var answerNodes = question.answers.map( function (answer, i) {
      return (
        <li className = {this._getColor(i)} key = {i} >
          {answer.text}
          <input className = "pull-right" type = "checkbox"
                 onChange = { self._selectAnswer.bind(null, i) }
          />
        </li>
      );hoice
    }, this );

    return (
      <div className = "row">
        <div className = "col-md-6 col-md-offset-3">
          <div className = "panel panel-default">
            <div className = "panel-heading">
              <span>{ this.props.src.title }</span>
              <span className = "pull-right"> {this.state.points}</span>
            </div>
            <div className = "panel-body">
              <p>
                { question.text }
              </p>
              <ul className = "list-group list-unstyled" key = { this.state.index}>
                { answerNodes }
              </ul>
            </div>
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

  _selectAnswer: function(index, e) {
    if ( this.state.done ) {
      e.preventDefault();
      return;
    }

    var _answers = this.state.answers;
    if ( _answers[index] === null ) {
      _answers[index] = true;
    } else {
      _answers[index] = !(_answers[index]);
    }

    this.setState({
      answers: _answers
    });

    console.log('answer[' + index + '] = ' + this.state.answers[index]);

  },

  _checkAnswers: function () {
    console.log('[METHOD]: _checkAnswers');
    var userChoices,
        correctChoices,
        equal,
        newPoints = this.props.src.questions[this.state.index].points,
        i = 0;

    userChoices = this.state.answers;
    correctChoices = this.props.src
      .questions[this.state.index]
      .answers
      .map( function (answer) {
        return answer.correct;
      });

    var equal = true;
    for ( var i = 0; i < userChoices.length; i++ ) {
      if (userChoices[i] === null) {
        // userChoice is null, treating null as false -> userChoice = false
        // WHY IS NULL NOT FALSY!! Gosh -.-
        if ( correctChoices[i] ) {
          equal = false;
          break;
        }
      } else {
        // userChoice is not null, do the logical
        if ( correctChoices[i] !== userChoices[i] ) {
          equal = false;
          break;
        }
      }
    }

    console.log('userChoices: ' + userChoices);
    console.log('correctChoices: ' + correctChoices);
    console.log('equal? : ' + equal);
    if ( equal ) {
      this.setState({
        points: this.state.points + newPoints,
        done: true,
      });
    } else {
      this.setState({
        done: true
      });
    }
  },

  _handleClick: function () {
    var resetAnswers;


    // if not running set running and go forward
    // if running and not done set done
    // if running and down set undone and go forward
    if ( !this.state.running ) {
      this.setState({
        running: true,
      });
    }

    if ( this.state.finished ) {
      console.log('[MODE]: finished..');
      return;
    }

    // entering this state when user answers the question and wants feedback
    if ( this.state.running && !this.state.done ) {
      this._checkAnswers();

    }

    if ( this.state.running && this.state.done ) {
      // check if last answer, if so return
      if ( (this.state.index + 1) === this.props.src.questions.length ) {
        this.setState({
          finished: true
        });
        return;
      }
      resetAnswers = this.props.src
        .questions[this.state.index + 1]
        .answers
        .map( function () {
          return null;
        });

      this.setState({
        done: false,
        index : this.state.index + 1,
        answers: resetAnswers
      });
    }

  },


  _btnText: function () {
    return !this.state.done ? "Done" : "Next";
  },

  _getColor: function (i) {
    var userChoice,
        correctChoice,
        colorClass = "";

    if ( this.state.done ) {

      userChoice = this.state.answers[i];
      correctChoice = this.props.src
        .questions[this.state.index]
        .answers[i]
        .correct;

      console.log('userChoice: ' + userChoice,
                  'correctChoice: ' + correctChoice);

      if (userChoice === null) {
        // userChoice is null, treating null as false -> userChoice = false
        // WHY IS NULL NOT FALSY!! Gosh -.-
        if ( correctChoice ) {
          colorClass = "list-group-item-danger";
        }
      } else {
        // userChoice is not null, do the logical
        if ( correctChoice !== userChoice) {
          colorClass = "list-group-item-danger";
        } else {
          colorClass = "list-group-item-success";
        }
      }

    }

    return " list-group-item " + colorClass;
  },
});

module.exports = Quiz;
