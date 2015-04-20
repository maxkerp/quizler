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
  clickHandler: function () {
    console.log( this.props.title + " button evaluate clicked")
    React.findDOMNode(this.refs.button).value = 'Next';
  },
  render: function () {
    questionNodes = this.props.questions.map( function ( question ) {
      return (
        <Question text = { question.text } points = { question.points }
                  type = { question.type } answers = { question.answers }/>
      );
    });

    return (
      <div className = "row">
        <div className = "col-md-6 col-md-offset-3">
          <div className = "section panel panel-default">
            <div className = "panel-heading"> { this.props.number } { this.props.title } </div>
            <div className = "panel-body">
            <p> { this.props.description } </p>
            <hr/>
            { questionNodes }
            </div>
            <div className = "panel-footer">
              <button ref = "button" className = " btn btn-success pull-right" type = "button" onClick = { this.clickHandler }>Done</button>
              {/* div.clearfix is needed since the button won"t show up properly if ommited */}
              <div className = " clearfix"></div>
            </div>
          </div>
        </div>
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

          <div className = "question panel panel-default">
            <div className = "panel-body"> {this.props.text} <span className = "pull-right"> ( { this.props.points } points ) </span> </div>
            <AnswerList list = { this.props.answers } />
          </div>

    );
  }
});

React.render(<QuizBox/>, document.getElementById("content"));
