var express = require('express');
var router = express.Router();
const knex = require('../db/knex');
const routeFunctions = require('./route_functions/route_function')
const scoreQueries = require('../db/scores');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/scores', function(req, res, next) {
  scoreQueries.allScores()
      .then((allScores)=>{
        allScores = routeFunctions.changeDate(allScores);
        res.render('scores', {
          title: 'Team Track',
          scores: allScores
        });
      });
});

router.get('/score/:id',function(req,res,next){
  scoreQueries.oneScore(req.params.id)
    .then((oneScore)=>{
      res.render('score',{
        title:'Team Track',
        scores: oneScore
      });
    });
});

router.put('/score/:id',function(req,res,next){
  scoreQueries.updateOneScore(req.params.id,req.body.score1,req.body.score2)
  .then(function(data){
    console.log(data);
    res.json('updated');
  });
});

router.delete('/score/:id', function(req,res,next){
  scoreQueries.deleteOne(req.params.id)
  .then(function(){
    res.send('deleted');
  });
});



module.exports = router;
