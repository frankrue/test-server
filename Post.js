var mongoose = require('mongoose');

var Post = mongoose.model('Post', {
  title: String,
  created: { type: Date, default: Date.now },
  author: String,
  body: String
});

module.exports = Post;
