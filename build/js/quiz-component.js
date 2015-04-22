// static prototype

var QuizBox = React.createClass({displayName: "QuizBox",

  render: function () {
    return (
      React.createElement("div", {className: "quizbox"}, 
        React.createElement(Quiz, {src:  QUIZDATA })
      )
    );
  }
});

// This is a stateless component which just renders data from its parent
var QuizDescription = React.createClass({displayName: "QuizDescription",

  render: function () {
    return (
      React.createElement("div", {className: "row"}, 
        React.createElement("div", {className: "col-md-6 col-md-offset-3"}, 
          React.createElement("div", {className: "panel panel-default"}, 
            React.createElement("div", {className: "panel-heading"}, 
              React.createElement("p", null, this.props.title), 
              React.createElement("small", null, " Released by ", this.props.author, ", on ", this.props.date, " ")
            ), 
            React.createElement("div", {className: "panel-body"}, 
              this.props.description
            ), 
            React.createElement("div", {className: "panel-footer"}, 
              React.createElement("button", {className: "btn btn-success pull-right", onClick:  this.props.onClick}, "Start"), 
              React.createElement("div", {className: "clearfix"})
            )
          )
        )
      )
    );
  }
});

var Quiz = React.createClass({displayName: "Quiz",
  getInitialState: function () {
    return {
      mode: "beforeStart",
      points: 0
    };
  },
  _onClick: function () {
    this.setState({mode: "running"});
  },
  _onDone: function () {
    this.setState({ mode: "done" });
  },
  render: function () {
    if ( this.state.mode === "beforeStart" ) {
      return (
        React.createElement(QuizDescription, {title: this.props.src.title, author: this.props.src.author, 
                    date: this.props.src.date, description: this.props.src.description, 
                    onClick: this._onClick})
      )
    } else if ( this.state.mode === "running" ) {
      return (
        React.createElement(SectionList, {sections:  this.props.src.sections, onDone:  this._onDone})
      )
    } else {

      return (
        React.createElement(Summary, {points:  this.state.points})
      )
    }
  }
});

var Summary = React.createClass({displayName: "Summary",

  render: function () {
    return (
      React.createElement("div", {className: "row"}, 
        React.createElement("div", {className: "col-md-6 col-md-offset-3"}, 
          React.createElement("div", {className: "panel panel-default"}, 
            React.createElement("div", {className: "panel-heading"}, 
              "Summary"
            ), 
            React.createElement("div", {className: "panel-body"}, 
              React.createElement("p", null, "Congratulations!"), 
              React.createElement("p", null, "You achieved ", this.props.points, " !")
            ), 
            React.createElement("div", {className: "panel-footer"}, 
              React.createElement("button", {className: "btn btn-success pull-right", onClick:  this.props.onClick}, "Finish"), 
              React.createElement("div", {className: "clearfix"})
            )
          )
        )
      )
    );
  }
});

var SectionList = React.createClass({displayName: "SectionList",
  nextSection: function () {
    if ( this.state.index === this.props.sections.length - 1 ) {
      this.props.onDone();
      return;
    } else {
      this.setState({ index: this.state.index + 1 });
      console.log( "Section index at: " + this.state.index);
    }

  },
  getInitialState: function () {
    return {
      index: 0
    };
  },
  render: function () {
    var sectionNodes = this.props.sections.map( function ( section ) {
      return (
        React.createElement(Section, {title:  section.title, description:  section.description, 
                number:  section.number, questions:  section.questions, 
                nextSection:  this.nextSection})
      )
    }, this);

    return (
      React.createElement("div", {className: "sectionlist"}, 
         sectionNodes[ this.state.index] 
      )
    );
  }
});

var Section = React.createClass({displayName: "Section",
  getInitialState: function () {
    return {
      done: false
    };
  },
  handleClick: function () {
    if ( !this.state.done ) {
      this.setState({ done: true });
    } else {
      this.setState({ done: false });
      this.props.nextSection();
    }
  },
  render: function () {
    //var _this = this;
    var questionNodes = this.props.questions.map( function ( question ) {
      return (
        React.createElement(Question, {text:  question.text, points:  question.points, 
                  type:  question.type, answers:  question.answers, 
                  done:  this.state.done})
      );
    }.bind(this));

    var buttonText = !this.state.done ? "Done" : "Next";

    return (
      React.createElement("div", {className: "row"}, 
        React.createElement("div", {className: "col-md-6 col-md-offset-3"}, 
          React.createElement("div", {className: "section panel panel-default"}, 
            React.createElement("div", {className: "panel-heading"}, " ",  this.props.number, " ",  this.props.title, " "), 
            React.createElement("div", {className: "panel-body"}, 
            React.createElement("p", null, " ",  this.props.description, " "), 
            React.createElement("hr", null), 
             questionNodes 
            ), 
            React.createElement("div", {className: "panel-footer"}, 
              React.createElement("button", {className: " btn btn-success pull-right", onClick:  this.handleClick}, 
                 buttonText 
              ), 
              /* div.clearfix is needed since the button won"t show up properly if ommited */
              React.createElement("div", {className: " clearfix"})
            )
          )
        )
      )
    );
  }
});

var Answer = React.createClass({displayName: "Answer",

  getColor: function () {
    var colorClass = "";

    if ( this.props.color ) {
      if ( this.props.isCorrect ) {
        colorClass = "list-group-item-success";
      } else if ( !this.props.isCorrect ) {
        colorClass = "list-group-item-danger";
      }
    }


    return "answer list-group-item " + colorClass;
  },
  render: function () {
    return (
      React.createElement("div", {className:  this.getColor() }, 
        React.createElement("li", null, 
          this.props.text, 
          React.createElement("input", {ref: "input", className: "pull-right", type: "checkbox"})
        )
      )
    );
  }
});

// Question is also a stateless component whihc only renders data
var Question = React.createClass({displayName: "Question",

  render: function () {
    var _this = this;
    var answerNodes = this.props.answers.map( function ( answer ) {
      return (
        React.createElement(Answer, {text:  answer.text, isCorrect:  answer.isCorrect, color:  _this.props.done})
      )
    });

    return (

          React.createElement("div", {className: "question panel panel-default"}, 
            React.createElement("div", {className: "panel-body"}, " ", this.props.text, " ", React.createElement("span", {className: "pull-right"}, " ( ",  this.points, " / ",  this.props.points, " points ) ")
            ), 
            React.createElement("ul", {className: "list-group list-unstyled"}, 
              answerNodes
            )
          )

    );
  }
});

window.React = React;
React.render(React.createElement(QuizBox, null), document.getElementById("content"));
