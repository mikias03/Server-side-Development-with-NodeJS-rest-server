var express = require('express')
var bodyParser = require('body-parser')
var mongoose = require('mongoose');

var Dishes = require('../models/leadership');

var leaderRouter = express.Router()

leaderRouter.use(bodyParser.json())

/* Route '/' */

leaderRouter.route('/')
.get(function (req, res, next) {
  leaderships.find({}, function (err, leadership) {
      if (err) throw err;
      res.json(leadership);
  });
})

.post(function (req, res, next) {
  leaderships.create(req.body, function (err, leadership) {
      if (err) throw err;
      console.log('leadership created!');
      var id = leadership._id;

      res.writeHead(200, {
          'Content-Type': 'text/plain'
      });
      res.end('Added the leadership with id: ' + id);
  });
})

.delete(function (req, res, next) {
  leaderships.remove({}, function (err, resp) {
      if (err) throw err;
      res.json(resp);
  });
});

/* Route '/:leaderId' */

leaderRouter.route('/:leadershipId')
.get(function (req, res, next) {
  leaderships.findById(req.params.leadershipId, function (err, leadership) {
      if (err) throw err;
      res.json(leadership);
  });
})

.put(function (req, res, next) {
  leaderships.findByIdAndUpdate(req.params.leadershipId, {
      $set: req.body
  }, {
      new: true
  }, function (err, leadership) {
      if (err) throw err;
      res.json(leadership);
  });
})

.delete(function (req, res, next) {
  leaderships.findByIdAndRemove(req.params.leadershipId, function (err, resp) {
      if (err) throw err;
      res.json(resp);
  });
});

module.exports = leaderRouter
