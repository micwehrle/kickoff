var React = require('react');

var MainComponent = React.createClass({
  render: function () {
    return (
      <div>
        <header>
          <h1>Don't panic!</h1>
        </header>
        <main>Hi!! Everybody good?? This is the main view, y'all!</main>
        <footer></footer>
      </div>
    );
  }
});

module.exports = MainComponent;
