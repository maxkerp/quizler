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
          <input type = "checkbox" name = "answer" value = ""/>
          {this.props.text}
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
        <div className = "answerlist" >
          <ul className = "list-group">
            {answerNodes}
          </ul>
        </div>
    );
  }
});

var Question = React.createClass({
  render: function () {
    return (
      <div className = "question">
        <h4> {this.props.text} <span> ( { this.props.points } points ) </span> </h4>
        <AnswerList list = { this.props.answers } />
      </div>
    );
  }
});

React.render(<QuizBox/>, document.getElementById("content"));
