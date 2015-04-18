React.render(
  React.createElement(Quiz, {author: "", date: "", title: "", description: ""}, 
    React.createElement(SectionList, {sections: ""}, 
      React.createElement(Section, {title: "", description: "", number: ""}, 
        React.createElement(Question, {text: "", points: "", type: ""}, 
          React.createElement(Answer, {text: "", isCorrect: ""}), 
          React.createElement(Answer, {text: "", isCorrect: ""}), 
          React.createElement(Answer, {text: "", isCorrect: ""})
        )
      )
    )
  )
  ,document.getElementById('content'));
