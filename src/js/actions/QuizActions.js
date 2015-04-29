
var QuizConstants = require('../constants/QuizConstants');
var AppDispatcher = require('../dispatcher/AppDispatcher');

var QuizActions = {

  create: function ( quiz ) {
    AppDispatcher.dispatch({
      actionType: QuizConstants.CREATE,
      quiz: quiz
    });
  },

  update: function ( id, quiz ) {
    AppDispatcher.dispatch({
      actionType: QuizConstants.UPDATE,
      id: id,
      quiz: quiz
    });
  },

  destroy: function ( id ) {
    AppDispatcher.dispatch({
      actionType: QuizConstants.DESTROY,
      id: id
    })
  }

};

module.exports = QuizActions;
