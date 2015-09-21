var Backbone = require('backbone');
var BaseView = require('../base_view');
var MainComponent = require('./component.jsx');

var MainView = BaseView.extend({
  component: function () {
    return MainComponent;
  },
  pageRender: function (view) {
    this.$('main').html(view.render().$el);
  }
});

module.exports = MainView;
