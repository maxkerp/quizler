"use strict";

var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var StateConstants = require('../constants/StateConstants');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var _state = {}; // private object holding the quiz state


function update(updates) {
  _state = assign( {}, _state, updates );
  console.log("[STATE_STORE]: new state", _state );
}

var StateStore = assign({}, EventEmitter.prototype, {

  getState: function () {
    return _state;
  },

  emitChange: function () {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function (cb) {
    this.on(CHANGE_EVENT, cb);
  },

  removeChangeListener: function (cb) {
    this.removeListener(CHANGE_EVENT, cb);
  },

  dispatcherIndex: AppDispatcher.register( function(action){
    var state;

    switch (action.actionType) {
      case StateConstants.UPDATE:
        state = action.state;
        update(state);
        StateStore.emitChange();
        break;
      default:
        // no ops
    }
  })
});

module.exports = StateStore;
