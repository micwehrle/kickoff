var $ = window.$ = require('jquery');
var _ = window._ = require('lodash');


var Application  = require('./application');
var DontPanic = require('./views/hhgttg/index.js');

console.log('#Yolo!, Kickoff.');

$(function () {
  // kick the app off, render main view
  var app = window.app = new Application();
  app.mainView.pageRender(new DontPanic());
});
