var mongoose = require('mongoose');

var deepPopulate = require('mongoose-deep-populate')(mongoose);
mongoose.plugin(deepPopulate);

var Post = mongoose.model('Post', {
  title: String,
  created: { type: Date, default: Date.now },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'Author' },
  body: String,
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }]
});

module.exports = Post;
