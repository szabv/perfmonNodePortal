var express = require('express');
var pm = require('../modules/pm');

var router = express.Router();

pm.getPmData('memory').then(function (data){
  router.get('/pmMemory', function(req, res) {
    res.render('pmCounterList', { title: 'PerfMon memory counters',
                               info: 'Some more stuff to add to the page.',
                               pmCounterList: data});
  });
});

pm.getCategories(function(categories){
  console.log('Executing callback.');
  console.log(categories);
  console.log('That was the end of catagories.');
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET Hello World page. */
router.get('/helloworld', function(req, res) {
  res.render('helloworld', { title: 'Hello, World!',
                             info: 'Some more stuff to add to the page.',
                             pmData: pmData});
});



/* GET Userlist page. */
router.get('/userlist', function(req, res) {
  var db = req.db;
  var collection = db.get('usercollection');
  collection.find({},{},function(e,docs){
    res.render('userlist', {
      "userlist" : docs
    });
  });
});

module.exports = router;
