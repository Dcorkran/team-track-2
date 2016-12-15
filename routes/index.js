var express = require('express');
var router = express.Router();
const knex = require('../db/knex');
const routeFunctions = require('../route_functions/route_function')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/scores', function(req, res, next) {
  knex('score')
      .select('score.id','score.game_name','score.team1_score','score.team2_score','score.game_date','team.team_name','team2.team_name AS team2_name')
      .innerJoin('team','score.team1_id','team.id')
      .innerJoin('team AS team2','score.team2_id', 'team2.id')
      .then((allScores)=>{
        allScores = routeFunctions.changeDate(allScores);
        res.render('scores', {
          title: 'Team Track',
          scores: allScores
        });
      });
});

router.get('/score/:id',function(req,res,next){
  knex('score')
    .select('score.id','score.game_name','score.team1_score','score.team2_score','score.game_date','team.team_name','team2.team_name AS team2_name')
    .innerJoin('team','score.team1_id','team.id')
    .innerJoin('team AS team2','score.team2_id', 'team2.id')
    .where('score.id',req.params.id)
    .then((oneScore)=>{
      res.render('score',{
        title:'Team Track',
        scores: oneScore
      });
    });
});



module.exports = router;
