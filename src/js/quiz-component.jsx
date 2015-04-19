// static prototype

var QuizBox = React.createClass({

  render: function () {
    return (
      <div className = "quizbox">
        <Quiz title = { QUIZDATA.title } author = { QUIZDATA.author }
              date = { QUIZDATA.date } description = { QUIZDATA.description }/>
      </div>
    );
  }
});

var Quiz = React.createClass({
  render: function () {
    return (
      <div className = "quiz" >
        <h3> { this.props.title } </h3>
        <span> { this.props.author } </span> <span> { this.props.date } </span>
        <p> { this.props.description } </p>
        <SectionList sections = { QUIZDATA.sections } />
      </div>
    );
  }
});

var SectionList = React.createClass({
  render: function () {
    sectionNodes = this.props.sections.map( function ( section ) {
      return (
        <Section title = { section.title } description = { section.description }
                number = { section.number } questions = { section.questions } />
      );
    });
    return (
      <div className = "sectionlist">
        { sectionNodes }
      </div>
    );
  }
});

var Section = React.createClass({
  render: function () {
    questionNodes = this.props.questions.map( function ( question ) {
      return (
        <Question text = { question.text } points = { question.points }
                  type = { question.type } answers = { question.answers }/>
      );
    });

    return (
      <div className = "section">
        <span> <h4> { this.props.number } { this.props.title } </h4> </span>
        <p> { this.props.description } </p>
        <hr/>
        { questionNodes }
      </div>
    );
  }
});

var Answer = React.createClass({
  render: function () {
    return (
      <div className = "answer list-group-item">
        <li>
          {this.props.text}
          <input className = "pull-right" type = "checkbox" name = "answer" value = ""/>
        </li>
      </div>
    );
  }
});

var AnswerList = React.createClass({
  render: function () {
    var answerNodes = this.props.list.map( function ( answer ) {
      return (
        <Answer text = { answer.text } isCorrect = { answer.isCorrect } />
      )
    });

    return (

          <ul className = "list-group list-unstyled">
            {answerNodes}
          </ul>
    );
  }
});

var Question = React.createClass({
  render: function () {
    return (
      <div className = "row">
        <div className = "col-md-4">
          <div className = "question panel panel-default">
            <div className = "panel-body"> {this.props.text} <span className = "pull-right"> ( { this.props.points } points ) </span> </div>
            <AnswerList list = { this.props.answers } />
          </div>
        </div>
      </div>
    );
  }
});

React.render(<QuizBox/>, document.getElementById("content"));
