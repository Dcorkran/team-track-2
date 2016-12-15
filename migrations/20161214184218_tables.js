exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('player',function(table){
      table.increments();
      table.string('player_fname').notNullable();
      table.string('player_lname').notNullable();
      table.string('player_email');
      table.date('player_birthday');
    }),
    knex.schema.createTable('team', function(table){
      table.increments();
      table.string('team_name').notNullable();
    }),
    knex.schema.createTable('player_team',function(table){
      table.increments();
      table.integer('player_id').unsigned();
      table.foreign('player_id').references('player.id').onDelete('CASCADE');
      table.integer('team_id').unsigned();
      table.foreign('team_id').references('team.id').onDelete('CASCADE');
    }),
    knex.schema.createTable('score',function(table){
      table.increments();
      table.string('game_name').notNullable();
      table.integer('team1_score').notNullable();
      table.integer('team2_score').notNullable();
      table.integer('winner_id').unsigned();
      table.date('game_date');
      table.integer('team1_id').unsigned();
      table.integer('team2_id').unsigned();
      table.foreign('winner_id').references('team.id').onDelete('CASCADE');
      table.foreign('team1_id').references('team.id').onDelete('CASCADE');
      table.foreign('team2_id').references('team.id').onDelete('CASCADE');
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('score'),
    knex.schema.dropTable('player_team'),
    knex.schema.dropTable('player'),
    knex.schema.dropTable('team')
  ]);
};
