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
      <div className = "sectionlist">
        <Section title = { section.title } description = { section.description }
                number = { section.number } questions = { section.questions }
                onNext = { this.onNext } />
      </div>
    );
  }
});

var Section = React.createClass({
  getInitalState: function () {
    return {
      done: false
    };
  }
  clickDone: function () {
    console.log( this.props.title + " button done clicked")
    // console.log( this.props.questions );
    //this.props.onNext();

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
              <button ref = "button" className = " btn btn-success pull-right" type = "button" onClick = { this.clickDone }>Done</button>
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
      <div className = "answer list-group-item">
        <li>
          {this.props.text}
          <input ref = "checked" className = "pull-right" type = "checkbox" name = "answer" value = ""/>
        </li>
      </div>
    );
  }
});


var Question = React.createClass({
  points: 0,
  getAnswers: function () {
    React.Children.map( this.props.children, function (child) {
      console.log(child);
    });
  },

  render: function () {
    var answerNodes = this.props.answers.map( function ( answer ) {
      return (
        <Answer text = { answer.text } isCorrect = { answer.isCorrect } />
      )
    });

    return (

          <div className = "question panel panel-default">
            <div className = "panel-body"> {this.props.text} <span className = "pull-right"> ( { this.points} / { this.props.points } points ) </span>
            </div>
            <ul className = "list-group list-unstyled">
              {answerNodes}
            </ul>
          </div>

    );
  }
});

React.render(<QuizBox/>, document.getElementById("content"));
