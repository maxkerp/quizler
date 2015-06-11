
var React = require('react');

var ReactInput = React.createClass({

  propTypes: {
    value: React.PropTypes.string,
    name: React.PropTypes.string.isRequired,
    type: React.PropTypes.string.isRequired,
    placeholder: React.PropTypes.string.isRequired,
    callBack: React.PropTypes.func.isRequired
  },

  getInitialState: function () {
    var value = this.props.value ? this.props.value : this.props.placeholder;

    return {
      edit: false,
      placeholder: this.props.placeholder,
      value: value
    };
  },

  shouldComponentUpdate: function (nextProps, nextState) {

    // only updtae the component if state or props have changed
    if (nextState !== this.state) {
      return true;
    } else {
     return (nextProps.id !== this.props.id);
    }
  },

  render: function () {
    // Not in edit mode!
    if ( !this.state.edit ) {

      // What type of Input do we want?
      if ( this.props.type === "text") {

        return (
          <span className="reactInputTag" onClick={this._handleClick}>
            { this.state.value }
          </span>
        );

      } else if ( this.props.type === "textarea") {

        return (
          <p className="reactInputTag" onClick={this._handleClick}>
            { this.state.value }
          </p>
        );

      }
    } else {
    // In edit mode!
      if ( this.props.type === "text" ) {

        return (
          <input ref="refText"
                 type="text"
                 placeholder = { this.state.value }
                 onKeyDown={ this._handleKeyDown }
                 className="reactInputInput"
                 autoFocus={ this.state.edit }
          />
        );

      } else if ( this.props.type === "textarea" ) {

        return (
          <textarea
            ref="refTextarea"
            placeholder={ this.state.value }
            onKeyDown={ this._handleKeyDown }
            className="reactInputInput"
            autoFocus={ this.state.edit }
          />
        );

      }
    }
  },

  _handleClick: function (e) {
    e.preventDefault();
    this.setState({
      edit: true
    });
    //TODO: set value of ReactInput to its last value
    // refs apparently don't work -.-
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

      if ( !value ) {

        // If value empty, cancel and use placeholder
        this.setState({
          value: this.props.placeholder,
          edit: false,
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
