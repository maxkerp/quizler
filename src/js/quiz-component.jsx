// static prototype

var QuizBox = React.createClass({

  render: function () {
    return (
      <div className = "quizbox">
        <Quiz src = { QUIZDATA }/>
      </div>
    );
  }
});

// This is a stateless component which just renders data from its parent
var QuizDescription = React.createClass({

  render: function () {
    return (
      <div className = "row" >
        <div className = "col-md-6 col-md-offset-3" >
          <div className = "panel panel-default" >
            <div className = "panel-heading">
              <p>{this.props.title}</p>
              <small> Released by {this.props.author}, on {this.props.date} </small>
            </div>
            <div className = "panel-body">
              {this.props.description}
            </div>
            <div className = "panel-footer">
              <button className = "btn btn-success pull-right" onClick = { this.props.onClick }>Start</button>
              <div className = "clearfix"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

var Quiz = React.createClass({
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
        <QuizDescription title = {this.props.src.title} author = {this.props.src.author}
                    date = {this.props.src.date} description = {this.props.src.description}
                    onClick = {this._onClick}/>
      )
    } else if ( this.state.mode === "running" ) {
      return (
        <SectionList sections = { this.props.src.sections } onDone = { this._onDone }/>
      )
    } else {

      return (
        <Summary points = { this.state.points }/>
      )
    }
  }
});

var Summary = React.createClass({

  render: function () {
    return (
      <div className = "row" >
        <div className = "col-md-6 col-md-offset-3" >
          <div className = "panel panel-default" >
            <div className = "panel-heading">
              Summary
            </div>
            <div className = "panel-body">
              <p>Congratulations!</p>
              <p>You achieved {this.props.points} !</p>
            </div>
            <div className = "panel-footer">
              <button className = "btn btn-success pull-right" onClick = { this.props.onClick }>Finish</button>
              <div className = "clearfix"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

var SectionList = React.createClass({
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
        // TODO Add keys so the diffrent components are actually treated like
        // different components by react. Checkbox bug will disappear :)
        <Section title = { section.title } description = { section.description }
                number = { section.number } questions = { section.questions }
                nextSection = { this.nextSection } />
      )
    }, this);

    return (
      <div className = "sectionlist">
        { sectionNodes[ this.state.index ] }
      </div>
    );
  }
});

var Section = React.createClass({
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
        <Question text = { question.text } points = { question.points }
                  type = { question.type } answers = { question.answers }
                  done = { this.state.done }/>
      );
    }.bind(this));

    var buttonText = !this.state.done ? "Done" : "Next";

    return (
      <div className = "row">
        <div className = "col-md-6 col-md-offset-3">
          <div className = "section panel panel-default">
            <div className = "panel-heading"> { this.props.number } { this.props.title } </div>
            <div className = "panel-body" >
            <p> { this.props.description } </p>
            <hr/>
            { questionNodes }
            </div>
            <div className = "panel-footer">
              <button className = " btn btn-success pull-right" onClick = { this.handleClick }>
                { buttonText }
              </button>
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
      <div className = { this.getColor() }>
        <li>
          {this.props.text}
          <input ref = "input" className = "pull-right" type = "checkbox"/>
        </li>
      </div>
    );
  }
});

// Question is also a stateless component whihc only renders data
var Question = React.createClass({

  render: function () {
    var _this = this;
    var answerNodes = this.props.answers.map( function ( answer ) {
      return (
        <Answer text = { answer.text } isCorrect = { answer.isCorrect } color = { _this.props.done } />
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

window.React = React;
React.render(<QuizBox/>, document.getElementById("content"));
