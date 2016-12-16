var express = require('express');
var router = express.Router();
const queryFunctions = require('../db/scores');


/* GET users listing. */
router.get('/', function(req, res, next) {
  queryFunctions.getPostForm()
  .then(function(teamNames){
    res.render('post_score', {
      title: 'Team Track',
      teams: teamNames
    });
  });
});

router.post('/', function(req, res, next) {
  queryFunctions.postScore(req.body)
  .returning('id')
  .then((data)=>{
    res.redirect(`/score/${data}`);
  });
});

module.exports = router;
