
var React = require('react');

var ReactInput = React.createClass({

  propTypes: {
    name: React.PropTypes.string.isRequired,
    type: React.PropTypes.string.isRequired,
    placeholder: React.PropTypes.string.isRequired,
    callBack: React.PropTypes.func.isRequired
  },

  getInitialState: function () {
    var placeholder = this.props.placeholder ? this.props.placeholder : "placeholder";
    return {
      edit: false,
      placeholder: placeholder,
      value: placeholder
    };
  },

  render: function () {
    console.log('[METHOD]: render()');
    // Not in edit mode!
    if ( !this.state.edit ) {

      // What type of Input do we want?
      if ( this.props.type === "text") {

        return (
          <p className="reactInputTag" onDoubleClick={this._handleDbClick}>
            { this.state.value }
          </p>
        );

      } else if ( this.props.type === "textarea") {

        return (
          <p className="reactInputTag" onDoubleClick={this._handleDbClick}>
            { this.state.value }
          </p>
        );

      }
    } else {
    // In edit mode!
      if ( this.props.type === "text" ) {

        return (
          <input type="text"
                 placeholder = { this.state.value }
                 onKeyDown={ this._handleKeyDown }
                 className="reactInputInput"
                 autoFocus={ this.state.edit }
          />
        );

      } else if ( this.props.type === "textarea" ) {

        return (
          <textarea
            placeholder={ this.state.value }
            onKeyDown={ this._handleKeyDown }
            className="reactInputInput"
            autoFocus={ this.state.edit }
          />
        );

      }
    }
  },

  _handleDbClick: function (e) {
    e.preventDefault();
    console.log("[METHOD]: _handleDbClick()");
    this.setState({
      edit: true
    });
  },

  _handleKeyDown: function (e) {
    var value;

    if ( e.key === 'Escape') {
      // Cancel and use previous value

      this.setState({
        edit: false
      });

    } else if ( e.key === 'Enter') {
      value = e.target.value.trim();

      if ( value === "" ) {

        // If value empty, cancel and use previous value
        this.setState({
          edit: false
        });
        
      } else {

        // Value has changed, set new value and execute callback
        this.setState({
          value: value,
          edit: false
        });

        this.props.callBack( value, this.props.name );

      }

    }
  }
});

module.exports = ReactInput;
