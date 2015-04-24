
var React = require('react');

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

module.exports = QuizDescription;
