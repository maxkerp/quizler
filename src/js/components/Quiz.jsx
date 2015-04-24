
var React = require('react');

var QuizDescription = require('./QuizDescription.jsx');
var SectionList = require('./SectionList.jsx');
var Summary = require('./Summary.jsx');

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

module.exports = Quiz;
