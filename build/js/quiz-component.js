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
  render: function () {
    sectionNodes = this.props.sections.map( function ( section ) {
      return (
        React.createElement(Section, {title:  section.title, description:  section.description, 
                number:  section.number, questions:  section.questions})
      );
    });
    return (
      React.createElement("div", {className: "sectionlist"}, 
         sectionNodes 
      )
    );
  }
});

var Section = React.createClass({displayName: "Section",
  render: function () {
    questionNodes = this.props.questions.map( function ( question ) {
      return (
        React.createElement(Question, {text:  question.text, points:  question.points, 
                  type:  question.type, answers:  question.answers})
      );
    });

    return (
      React.createElement("div", {className: "section"}, 
        React.createElement("span", null, " ", React.createElement("h4", null, " ",  this.props.number, " ",  this.props.title, " "), " "), 
        React.createElement("p", null, " ",  this.props.description, " "), 
        React.createElement("hr", null), 
         questionNodes 
      )
    );
  }
});

var Answer = React.createClass({displayName: "Answer",
  render: function () {
    return (
      React.createElement("div", {className: "answer list-group-item"}, 
        React.createElement("li", null, 
          React.createElement("input", {type: "checkbox", name: "answer", value: ""}), 
          this.props.text
        )
      )
    );
  }
});

var AnswerList = React.createClass({displayName: "AnswerList",
  render: function () {
    var answerNodes = this.props.list.map( function ( answer ) {
      return (
        React.createElement(Answer, {text:  answer.text, isCorrect:  answer.isCorrect})
      )
    });

    return (
        React.createElement("div", {className: "answerlist"}, 
          React.createElement("ul", {className: "list-group"}, 
            answerNodes
          )
        )
    );
  }
});

var Question = React.createClass({displayName: "Question",
  render: function () {
    return (
      React.createElement("div", {className: "question"}, 
        React.createElement("h4", null, " ", this.props.text, " ", React.createElement("span", null, " ( ",  this.props.points, " points ) "), " "), 
        React.createElement(AnswerList, {list:  this.props.answers})
      )
    );
  }
});

React.render(React.createElement(QuizBox, null), document.getElementById("content"));
