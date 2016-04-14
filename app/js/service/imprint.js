'use strict';

module.exports = function() {

  var text = "some text here" + "text here";

  this.getText = function() {
    return text;
  };
};
