
 var React = require('react');

 var Answer = require('./Answer.jsx');

 // Question is also a stateless component whihc only renders data
 var Question = React.createClass({

   render: function () {
     var answerNodes = this.props.answers.map( function ( answer, index ) {
       return (
         <Answer text = { answer.text } isCorrect = { answer.isCorrect }
                color = { this.props.done } key = { index } ref = { index } />
       )
     }, this );


     return (
       <div>
         <div className = "panel-body">
           <p>
             {this.props.text}
           </p>
           <ul className = "list-group list-unstyled">
             {answerNodes}
           </ul>
         </div>
       </div>
     );
   }
 });


module.exports = Question;
