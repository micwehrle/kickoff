var React = require('react');
var Backbone = require('backbone');

var lala = React.createClass({

  getInitialState: function() {
    $.ajaxSetup({dataType: 'jsonp'});
    return {
      text: '',
      suggestion: '',
      word: ''
    };
  },
  componentDidMount: function () {
    $(document).on('keypress', function (e) {
      if (e.keyCode === 9) {
        console.log('YOLO')
      }
    })
  },
  _loadSuggestion: function (word) {
    var self = this;
    $.getJSON('http://localhost:1995/word?query=' + word,
      function (data) {
        self.setState({
          suggestion: data.word.replace(self.state.word, '')
        });
      });
  },
  componentWillUpdate: function (nextProps, nextState) {
    if (nextState.word.length >= 3 && nextState.word !== this.state.word) {
      this._loadSuggestion(nextState.word);
    }
  },
  shouldComponentUpdate: function (nextProps, nextState) {
    if (this.state.word.length < 2) {
      return false;
    }
    return true;
  },
  handleKeyUp: function (e) {
    e.preventDefault();

    // react wraps multiple children automatically
    var kids = $(e.target).children();
    if (e.key === ' ') {
      // reset the word
      this.setState({
        word: '',
        suggestion: ''
      });
    }
    else if (e.keyCode !== 13) {
      //var parts = kids.length === 1  ? e.target.innerText.split(' ') : kids[0].innerText.split(' ');
      var parts = e.target.innerText.split(' ');
      this.setState({
        word: parts[parts.length - 1],
        text: e.target.innerText
      });
    }
    else if (e.keyCode === 13) {
      this.setState({
        text: this.state.text + this.state.suggestion,
        suggestion: '',
        word: ''
      });
    }
    else {
      this.setState({
        text: e.target.innerText
      });
    }
  },
  render: function() {
    return (
      <div className="the-guide"  onKeyUp={this.handleKeyUp} >
        <span contentEditable="true">{this.state.text}</span><span>{this.state.suggestion}</span>
      </div>
    );
  }
});

module.exports = lala;
