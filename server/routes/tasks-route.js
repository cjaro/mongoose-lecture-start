
// tasks.js
var router = require('express').Router();

var Task = require('./server/task-model');

// replace this SQL stuff with mongoose stuff^^^
//
// var config = {
//   database: 'phi-tasks',
//   host: 'localhost',
//   port: 5432,
//   max: 10,
//   idleTimeoutMillis: 30000
// };
//
// var pool = new pg.Pool(config);

// get all tasks
router.get('/', function(req, res) {
  console.log('hit my get all tasks route');
  Task.find({}, function(err, data){
    if(err){
      console.log('Error! ', err);
      res.sendStatus(500);
    } else {
      res.send(data);
    }
  });
});

// create a new task in the db
router.post('/', function(req, res) {
  console.log('hit post route');
  console.log('here is the body ->', req.body);

  var taskObject = req.body;

  var addedTask = new Task({
    name: taskObject.taskName
  });
//db query
  addedTask.save(function(err, result){
    if(err){
      console.log('Error adding new task: ', err);
      res.sendStatus(500)
    } else {
      res.sendStatus(201)
    }
  });

  });

// create a new task in the db
router.delete('/:id', function(req, res) {
  var taskToDeleteId = req.params.id;
  console.log('hit delete route');
  console.log('here is the id to delete ->', taskToDeleteId);

  // db query
  // DELETE FROM task WHERE id=7
  Task.findByIdAndRemove(
    {_id: req.params.id},
    // {
    //   $set: {status: true}
    // },
    function(err, result){
      if(err){
        console.log('Error deleting task: ', err);
        res.sendStatus(500);
      } else {
        res.sendStatus(200);
      }
    }
  );
});

// create a new task in the db
router.put('/complete/:id', function(req, res) {
  var taskToCompleteId = req.params.id;
  console.log('hit complete route');
  console.log('id to complete ->', taskToCompleteId);
  // db query
  Task.findByIdAndUpdate(
    {_id: req.params.id},
    {
      $set: {status: true}
    },
    function(err, result){
      if(err){
        console.log('Error completing task: ', err);
        res.sendStatus(500);
      } else {
        res.sendStatus(200);
      }
    }
  );
});
//
// // create a new task in the db
router.put('/uncomplete/:id', function(req, res) {
  var taskToUncompleteId = req.params.id;
  console.log('hit complete route');
  console.log('here is the id to uncomplete ->', taskToUncompleteId);
  // db query
  Task.findByIdAndUpdate(
    {_id: req.params.id},
    {
      $set: {status: false}
    },
    function(err, result){
      if(err){
        console.log('Error uncompleting task: ', err);
        res.sendStatus(500);
      } else {
        res.sendStatus(200);
      }
    }
  );
});

module.exports = router;
