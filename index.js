var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test-blog');

var Post = require('./Post');
var Author = require('./Author');
var Comment = require('./Comment');

app.use(bodyParser.json());

var postRoutes = require('./post-routes');
app.use('/posts',postRoutes);

var authorRoutes = require('./author-routes');
app.use('/authors',authorRoutes);

var commentRoutes = require('./comment-routes');
app.use('/comments',commentRoutes);

app.get('/populate/posts',function(req, res) {

  Post
    .find()
    .populate('author')
    .exec(function(err, results) {
      if (err) {
        console.log('There was a problem getting your results.',err);
        res.send('There was a problem getting your results.');
        return;
      }
      res.json(results);
    });

});

app.get('/populate/posts/:id',function(req, res) {

  Post
    .findOne({ _id: req.params.id })
    .deepPopulate('author comments comments.author')
    .exec(function(err, results) {
      if (err) {
        console.log('There was a problem getting your results.',err);
        res.send('There was a problem getting your results.');
        return;
      }
      res.json(results);
    });

});


var server = app.listen(3000, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);

});
