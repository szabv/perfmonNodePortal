var express = require('express');
var pm = require('../modules/pm');
var router = express.Router();

/*
 * get counters
 */
router.get('/perfmondata/:counters', function(req, res) {
  var db = req.db;
  var collection = db.get('userlist');
  var userToDelete = req.params.counters;
  collection.remove({ '_id' : userToDelete }, function(err) {
    res.send((err === null) ? { msg: '' } : { msg:'error: ' + err });
  });
});

module.exports = router;
