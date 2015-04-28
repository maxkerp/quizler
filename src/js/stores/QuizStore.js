"use strict";

var AppDispatcher = require('../dispatcher/AppDispacther');
var EventEmitter = require('events').EventEmitter;
var TodoConstants = require('../constants/TodoConstants');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var _quizes = {}; // a private collection of quizes

/**
 * Create a Quiz
 * @param {object} quiz The JS Object describing a quiz.
 */
 function create ( quiz ) {
   // timestamp instead of an real id
   var id = Date.now();
   _quizes[id] = assign( { id: id }, quiz );
 }

 function destroy ( id ) {
   delete _quizes[id];
 }

 var QuizStore = assign( {}, EventEmitter.prototype, {
   getAll: function () {
     return _quizes;
   },

   emitChange: function () {
     this.emit(CHANGE_EVENT);
   },

   addChangeListener: function ( cb ) {
     this.on( CHANGE_EVENT, cb );
   },

   removeChangeListener: function ( cb ) {
     this.removeListener( CHANGE_EVENT, cb );
   },

   dispactherIndex: AppDispacther.register( function ( payload ) {
     var action = payload.action,
         quiz;

     switch ( action.actionType ) {
       case QuizConstants.QUIZ_CREATE:

         quiz = action.quiz;
         if ( quiz !== undefiend && quiz !== null ) {
           create( quiz );
           QuizStore.emitChange();
         }
         break;

       // TODO: Add more cases for other actionTypes like QUIZ_UPDATE, _DELETE
       default:

     }

     return true; // No errors. Needed by promise in Dispatcher.
   })
 });

 module.exports = QuizStore;
