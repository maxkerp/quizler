
var React = require('react');

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

module.exports = Summary;
