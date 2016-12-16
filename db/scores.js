const knex = require('./knex');

module.exports = {
  allScores: function(){
    return knex('score')
    .select('score.id','score.game_name','score.team1_score','score.team2_score','score.game_date','team.team_name','team2.team_name AS team2_name')
    .innerJoin('team','score.team1_id','team.id')
    .innerJoin('team AS team2','score.team2_id', 'team2.id');
  },
  oneScore: function(id){
    return knex('score')
      .select('score.id','score.game_name','score.team1_score','score.team2_score','score.game_date','team.team_name','team2.team_name AS team2_name')
      .innerJoin('team','score.team1_id','team.id')
      .innerJoin('team AS team2','score.team2_id', 'team2.id')
      .where('score.id',id);
  },
  updateOneScore: function(id,firstScore,SecondScore){
    return knex('score')
    .where('score.id',id)
    .update({
      team1_score:firstScore,
      team2_score:SecondScore
    });
  },
  deleteOne: function(id){
    return knex('score')
      .where('score.id',id)
      .del();
  },
  getPostForm: function(){
    return knex('team')
    .select('id', 'team_name');
  },
  postScore: function (body){
    let winTeam;
    if (parseInt(body.team_1_score) > parseInt(body.team_2_score)) {
      winTeam = body.team_1_name;
    } else if (parseInt(body.team_1_score) < parseInt(body.team_2_score)) {
      winTeam = body.team_2_name;
    } else {
      winTeam = null;
    }
    return knex('score')
      .insert({
        game_name:body.game_name,
        team1_score:parseInt(body.team_1_score),
        team2_score:parseInt(body.team_2_score),
        winner_id:winTeam,
        game_date:body.game_date,
        team1_id:body.team_1_name,
        team2_id:body.team_2_name
      });
      // .returning('id');

  }
};
