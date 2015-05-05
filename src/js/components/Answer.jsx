
var React = require('react');

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
        <li className = { this.getColor() } >
          {this.props.text}
          <input ref = "input" className = "pull-right" type = "checkbox"/>
        </li>
    );
  }
});

module.exports = Answer;
