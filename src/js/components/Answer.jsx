
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
      <div className = { this.getColor() }>
        <li>
          {this.props.text}
          <input ref = "input" className = "pull-right" type = "checkbox"/>
        </li>
      </div>
    );
  }
});

module.exports = Answer;
