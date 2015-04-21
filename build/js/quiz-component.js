// static prototype

var QuizBox = React.createClass({displayName: "QuizBox",

  render: function () {
    return (
      React.createElement("div", {className: "quizbox"}, 
        React.createElement(Quiz, {title:  QUIZDATA.title, author:  QUIZDATA.author, 
              date:  QUIZDATA.date, description:  QUIZDATA.description})
      )
    );
  }
});

var Quiz = React.createClass({displayName: "Quiz",
  render: function () {
    return (
      React.createElement("div", {className: "quiz"}, 
        React.createElement("h3", null, " ",  this.props.title, " "), 
        React.createElement("span", null, " ",  this.props.author, " "), " ", React.createElement("span", null, " ",  this.props.date, " "), 
        React.createElement("p", null, " ",  this.props.description, " "), 
        React.createElement(SectionList, {sections:  QUIZDATA.sections})
      )
    );
  }
});

var SectionList = React.createClass({displayName: "SectionList",
  onNext: function () {
    if ( this.state.index === this.props.sections.length - 1 ) {
      console.log( "End of sections reached..." );
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
    var index = this.state.index,
        section = this.props.sections[index];



    return (
      React.createElement("div", {className: "sectionlist"}, 
        React.createElement(Section, {title:  section.title, description:  section.description, 
                number:  section.number, questions:  section.questions, 
                onNext:  this.onNext})
      )
    );
  }
});

var Section = React.createClass({displayName: "Section",
  clickDone: function () {
    console.log( this.props.title + " button done clicked")
    // console.log( this.props.questions );
    this.props.onNext();
  },
  render: function () {
    questionNodes = this.props.questions.map( function ( question ) {
      return (
        React.createElement(Question, {text:  question.text, points:  question.points, 
                  type:  question.type, answers:  question.answers})
      );
    });

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
              React.createElement("button", {ref: "button", className: " btn btn-success pull-right", type: "button", onClick:  this.clickDone}, "Done"), 
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
  getInitialState: function () {
    return {
      correct: false
    }
  },
  getClassName: function () {
    var colorClass = "",
        checked;


    return "answer list-group-item" + colorClass;
  },
  render: function () {
    return (
      React.createElement("div", {className: "answer list-group-item"}, 
        React.createElement("li", null, 
          this.props.text, 
          React.createElement("input", {ref: "checked", className: "pull-right", type: "checkbox", name: "answer", value: ""})
        )
      )
    );
  }
});


var Question = React.createClass({displayName: "Question",
  points: 0,
  getAnswers: function () {
    React.Children.map( this.props.children, function (child) {
      console.log(child);
    });
  },

  render: function () {
    var answerNodes = this.props.answers.map( function ( answer ) {
      return (
        React.createElement(Answer, {text:  answer.text, isCorrect:  answer.isCorrect})
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

React.render(React.createElement(QuizBox, null), document.getElementById("content"));
