
var React = require('react');

var Question = require('./Question.jsx');

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

module.exports = Section;
