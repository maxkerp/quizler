
var StateConstants = require('../constants/StateConstants');
var AppDispatcher = require('../dispatcher/AppDispatcher');

var StateActions = {

  update: function (state) {
    console.log("[ACTIONS]: call StateActions.update()");
    AppDispatcher.dispatch({
      actionType: StateConstants.UPDATE,
      state: state
    });
  },
}

module.exports = StateActions;
