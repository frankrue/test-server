var mongoose = require('mongoose');

var Comment = mongoose.model('Comment', {
  body: String,
  created: { type: Date, default: Date.now },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'Author' }
});

module.exports = Comment;
