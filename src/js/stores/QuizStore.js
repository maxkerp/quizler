"use strict";

var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var QuizConstants = require('../constants/QuizConstants');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var _quizes = {}; // a private collection of quizes

/**
 * Create a Quiz
 * @param {object} quiz The JS Object describing a quiz.
 */
 function create ( quiz ) {
   // timestamp instead of an real id
   if ( !quiz.id ) {
     var id = Date.now();
     _quizes[id] = assign( {}, quiz, { id: id } );
   }
 }

 function destroy ( id ) {
   delete _quizes[id];
 }

 function update( id, updates ) {
   _quizes[id] = assign( {}, _quizes[id], updates );
 }

 var QuizStore = assign( {}, EventEmitter.prototype, {
   getAll: function () {
     return _quizes;
   },

   getFirst: function () {
     var first;
     for (var key in _quizes) {
       first = _quizes[key];
       break;
     }

     return first;
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

   dispactherIndex: AppDispatcher.register( function ( action ) {
     var quiz;

     switch ( action.actionType ) {

       case QuizConstants.CREATE:
         quiz = action.quiz;
         if ( quiz ) {
           create( quiz );
           QuizStore.emitChange();
         }
         break;

       case QuizConstants.UPDATE:
         quiz = action.quiz;
         if ( quiz ) {
           update( action.id, quiz );
           QuizStore.emitChange();
         }
         break;

       case QuizConstants.DELETE:
         destroy( action.id );
         QuizStore.emitChange();
         break;

       default:
         // no ops
     }
   })
 });

 module.exports = QuizStore;
