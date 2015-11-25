var Post = require('./Post');

function routes(app) {

  app.get('/',function(req, res) {
    Post
      .find({})
      .select('title author created')
      .exec(function(err, results) {
        if (err) {
          console.log("There was a problem getting your results.");
          return;
        }
        res.json(results);
      });
  });

  app.get('/:id',function(req, res) {
    Post
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

  app.delete('/:id',function(req, res) {
    Post
      .remove({
        _id: req.params.id
      })
      .exec(function(err, result) {
        if (err) {
          console.log("There was a problem deleting that post.");
          return;
        }
        res.json(result);
      });
  });

  app.post('/',function(req, res) {

    var p = new Post();

    p.title = req.body.title;
    p.author = req.body.author;
    p.body = req.body.body;

    p.save(function(err, result) {
      if (err) {
        console.log("There was a problem inserting that post.");
        res.send("There was a problem inserting that post.");
        return;
      }
      res.json(result);
    });

  });

  app.put('/:id',function(req, res) {
    Post
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
          console.log("There was a problem updating that post.");
          res.send("There was a problem updating that post.");
          return;
        }
        res.json(result);
      });
  });
}

module.exports = routes;
