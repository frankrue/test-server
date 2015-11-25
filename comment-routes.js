var Comment = require('./Comment');
var express = require('express');
var Post = require('./Post');

var router = new express.Router();

router.get('/',function(req, res) {
  Comment
    .find({})
    .exec(function(err, results) {
      if (err) {
        console.log("There was a problem getting your results.");
        return;
      }
      res.json(results);
    });
});

router.get('/:id',function(req, res) {
  Comment
    .findOne({
      _id: req.params.id
    })
    .exec(function(err, result) {
      if (err) {
        console.log("There was a problem getting your result.");
        return;
      }
      res.json(result);
    });
});

router.delete('/:id',function(req, res) {
  Post
    .findOneAndUpdate({
      comments: req.params.id
    },
    {
      $pull: {
        comments: req.params.id
      }
    })
    .exec(function(err, result) {
      if (err) {
        console.log("There was a problem deleting the comment from the post.");
        return;
      }
      Comment
        .remove({
          _id: req.params.id
        })
        .exec(function(err, result) {
          if (err) {
            console.log("There was a problem deleting that comment.");
            return;
          }
          res.json(result);
        });
    });

});

router.post('/',function(req, res) {

  if (!req.body.postId) {
    console.log("No postId present in comment insert; postId is required.");
    res.send("No postId present in comment insert; postId is required.");
    return;
  }

  var c = new Comment();

  c.body = req.body.body;
  c.author = req.body.author;

  c.save(function(err, result) {
    if (err) {
      console.log("There was a problem inserting that comment.");
      res.send("There was a problem inserting that comment.");
      return;
    }

    Post
      .findOneAndUpdate({
        _id: req.body.postId
      },
      {
        $addToSet: {
          comments: result._id
        }
      })
      .exec(function(err, postResult) {

        if (err) {
          console.log("There was a problem inserting the comment into the post.");
          res.send("There was a problem inserting the comment into the post.");
          return;
        }

        res.json(result);

      });
  });

});

router.put('/:id',function(req, res) {
  Comment
    .findOneAndUpdate({
      _id: req.params.id
    },
    req.body,
    {
      new: true
    }
    )
    .exec(function(err, result) {
      if (err) {
        console.log("There was a problem updating that comment.");
        res.send("There was a problem updating that comment.");
        return;
      }
      res.json(result);
    });
});

module.exports = router;
