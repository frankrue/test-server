var Author = require('./Author');
var express = require('express');

var router = new express.Router();

router.get('/',function(req, res) {
  Author
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
  Author
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
  Author
    .remove({
      _id: req.params.id
    })
    .exec(function(err, result) {
      if (err) {
        console.log("There was a problem deleting that author.");
        return;
      }
      res.json(result);
    });
});

router.post('/',function(req, res) {

  var a = new Author();

  a.first = req.body.first;
  a.last = req.body.last;
  a.email = req.body.email;

  a.save(function(err, result) {
    if (err) {
      console.log("There was a problem inserting that author.");
      res.send("There was a problem inserting that author.");
      return;
    }
    res.json(result);
  });

});

router.put('/:id',function(req, res) {
  Author
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
        console.log("There was a problem updating that author.");
        res.send("There was a problem updating that author.");
        return;
      }
      res.json(result);
    });
});

module.exports = router;
