var mongoose = require('mongoose');

var Author = mongoose.model('Author', {
  first: String,
  last: String,
  email: String
});

module.exports = Author;
