
 var React = require('react');

 var Answer = require('./Answer.jsx');

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


module.exports = Question;
