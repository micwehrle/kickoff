'use strict';
var Backbone = require('backbone');
var $ = require('jquery');
var MainView = require('./views/main/');

var Application = function () {
  this.initialize();
};

Application.prototype.initialize = function () {
  this.mainView = new MainView({
    el: $('#app')
  });
  this.kickoff();
};

Application.prototype.kickoff = function() {
  this.mainView.render();
  Backbone.history.start({ pushState: true });
};

module.exports = Application;
