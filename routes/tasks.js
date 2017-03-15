
// tasks.js
var router = require('express').Router();
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost/todo');

mongoose.model(
  'Task',
  new Schema({
    "name": String,
    "status": { type: Boolean, default: false }
  },
  {
  collection: 'tasks'
  }
));

var Task = mongoose.model('Task');

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
  // db query
  // INSERT INTO task (name) VALUES ('test');
//   pool.connect(function(err, client, done) {
//     if(err){
//       console.log(err);
//       res.sendStatus(500);
//     }else{
//       client.query('INSERT INTO task (name) VALUES ($1);',
//         [taskObject.taskName], function(err, result) {
//           done();
//           if(err){
//             console.log(err);
//             res.sendStatus(500); // the world exploded
//           }else{
//             res.sendStatus(201);
//           }
//       });
//     }
//   });
// });
//
// // create a new task in the db
// router.delete('/:id', function(req, res) {
//   var taskToDeleteId = req.params.id;
//   console.log('hit delete route');
//   console.log('here is the id to delete ->', taskToDeleteId);
//
//   // db query
//   // DELETE FROM task WHERE id=7
//   pool.connect(function(err, client, done) {
//     if(err){
//       console.log(err);
//       res.sendStatus(500);
//     }else{
//       client.query('DELETE FROM task WHERE id=$1;',
//         [taskToDeleteId], function(err, result) {
//           done();
//           if(err){
//             console.log(err);
//             res.sendStatus(500); // the world exploded
//           }else{
//             res.sendStatus(200);
//           }
//       });
//     }
//   });
// });
//
//
//
// // create a new task in the db
// router.put('/complete/:id', function(req, res) {
//   var taskToCompleteId = req.params.id;
//   console.log('hit complete route');
//   console.log('here is the id to complete ->', taskToCompleteId);
//
//   // db query
//   // UPDATE task SET status = TRUE WHERE ID = 4;
//   pool.connect(function(err, client, done) {
//     if(err){
//       console.log(err);
//       res.sendStatus(500);
//     }else{
//       client.query('UPDATE task SET status=TRUE WHERE ID=$1;',
//         [taskToCompleteId], function(err, result) {
//           done();
//           if(err){
//             console.log(err);
//             res.sendStatus(500); // the world exploded
//           }else{
//             res.sendStatus(200);
//           }
//       });
//     }
//   });
// });
//
// // create a new task in the db
// router.put('/uncomplete/:id', function(req, res) {
//   var taskToUncompleteId = req.params.id;
//   console.log('hit complete route');
//   console.log('here is the id to complete ->', taskToUncompleteId);
//
//   // db query
//   // UPDATE task SET status = TRUE WHERE ID = 4;
//   pool.connect(function(err, client, done) {
//     if(err){
//       console.log(err);
//       res.sendStatus(500);
//     }else{
//       client.query('UPDATE task SET status=FALSE WHERE ID=$1;',
//         [taskToUncompleteId], function(err, result) {
//           done();
//           if(err){
//             console.log(err);
//             res.sendStatus(500); // the world exploded
//           }else{
//             res.sendStatus(200);
//           }
//       });
//     }
//   });
// });

module.exports = router;
