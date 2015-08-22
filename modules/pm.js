var RSVP = require('rsvp');
var PerfMon = require('perfmon');

function getPmData(pmCategory) {
  var promise = new RSVP.Promise(function(resolve, reject){
    PerfMon.list('', handler);

    function handler(err, data) {
      if (err){
        reject(err);
      }

      if (data !== '' && data !== 'undefined') {
        resolve(data);
      }
    };

  });

  return promise;
};

function getChainStuff(data) {
  var promise = new RSVP.Promise(function(resolve, reject){

      if (data !== '' && data !== 'undefined') {
        console.log('resolving with OK');
        resolve(data);
      }
      else{
        console.log('resolving with ERR');
        reject( 'shit man');
      }
  });

  return promise;
};

function getNewCategory(name){
  return { name: name, counters: []};
};

function parsCategories(data){
  var currentCategory = getNewCategory('');
  var categories = { categoryArray: [] };

  for (var i = 0; i < data.counters.length; i++){
    // there is a milion thread counters and they arn't that usefull
    // so for now lets ditch them
    if(data.counters[i].substring(0, 6) == 'Thread'){
      continue;
    }

    var lastIndexOfSlash = data.counters[i].lastIndexOf('\\');
    var cat = data.counters[i].substring(0, lastIndexOfSlash);
    var counter = data.counters[i].substring(lastIndexOfSlash + 1, data.counters[i].length);

    if (currentCategory.name !== cat ){
        currentCategory = getNewCategory(cat);
        categories.categoryArray.push(currentCategory);
    }
    currentCategory.counters.push(counter);
  }

  console.log('categories parsed: ' + categories.categoryArray.length);
  return categories;
};

function promiseToParsCategories(data){
  var promise = new RSVP.Promise(function(resolve, reject){
    console.log('parsCategories -- start');
    if(data.counter == 'undefined'){
      console.log('Rejecting the data man.');
      reject(data);
    }

    var categories;

    try{
      categories = parsCategories(data);
      resolve(categories);
    } catch(err){
      console.log('Woww dude there was an exception. ');
      console.log(err);
      reject(err);
    }
  });

  return promise;
};

function getCategories(callback){
  console.log('getCategories -- start');

  getPmData('')
      .then(promiseToParsCategories)
      .then(callback);

  console.log('getCategories -- end');
};

var pm = {
  getPmData : getPmData,
  getCategories : getCategories
};

module.exports = pm;
