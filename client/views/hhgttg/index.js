var BaseView = require('../base_view');
var Component = require('./component.jsx');

var View = BaseView.extend({
  component: function () {
    return Component;
  }
});

module.exports = View;
