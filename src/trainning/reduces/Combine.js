var redux = require('redux'); // add thư viện redux

var StateOne = require('./StateOne.js');
var StateTest = require('./StateTest.js')
//Khai báo các state

var reducer = redux.combineReducers({
    StateOne: StateOne,
    StateTest: StateTest,
});

module.exports = reducer;	
