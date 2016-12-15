exports.seed = function(knex, Promise) {
  return knex('score').del()
  .then(function(){
    return knex('player_team').del();
  })
  .then(function(){
    return knex('team').del();
  })
  .then(function(){
    return knex('player').del();
  })

    .then(function(){
      const player = [{
        id:1,
        player_fname:'Dillon',
        player_lname:'Corkran',
        player_email:'dcorkran972@gmail.com',
        player_birthday:'1992-05-21'
      },{
        id:2,
        player_fname:'Stephanie',
        player_lname:'McCauley',
        player_email:'steph@gmail.com',
        player_birthday:'1992-06-22'
      },{
        id:3,
        player_fname:'Ando',
        player_lname:'Cochery',
        player_email:'andoman@gmail.com',
        player_birthday:'1992-07-23'
      },{
        id:4,
        player_fname:'Morgan',
        player_lname:'Weiss',
        player_email:'sugarcube52@gmail.com',
        player_birthday:'1992-08-24'
      }];
      return knex('player').insert(player);
    })
    .then(function(){
      const team = [{
        id:1,
        team_name:'Dill n Friends'
      },{
        id:2,
        team_name: 'Ando n Friends'
      }];
      return knex('team').insert(team);
    })
    .then(function(){
      const player_team = [{
        id:1,
        player_id:1,
        team_id:1
      },{
        id:2,
        player_id:2,
        team_id:1
      },{
        id:3,
        player_id:3,
        team_id:2
      },{
        id:4,
        player_id:4,
        team_id:2
      }];
      return knex('player_team').insert(player_team);
    })
    .then(function(){
      const score = [{
        id:1,
        game_name:'SpikeBall',
        team1_score:21,
        team2_score:15,
        winner_id:1,
        game_date:'2016-04-21',
        team1_id:1,
        team2_id:2
      },{
        id:2,
        game_name:'SpikeBall',
        team1_score:21,
        team2_score:10,
        winner_id:1,
        game_date:'2016-09-10',
        team1_id:1,
        team2_id:2
      },{
        id:3,
        game_name:'CanJam',
        team1_score:15,
        team2_score:21,
        winner_id:2,
        game_date:'2015-04-13',
        team1_id:1,
        team2_id:2
      }];
      return knex('score').insert(score);
    });
};
