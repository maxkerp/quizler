
var React = require('react');

var Section = require('./Section.jsx');

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


module.exports = SectionList;
