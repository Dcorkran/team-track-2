const moment = require('moment');
const knex = require('../db/knex');

function changeDate(arrOfObjects){
  arrOfObjects.forEach((obj)=>{
    return obj.game_date = moment(obj.game_date).format('L');
  });
  return arrOfObjects;
}

module.exports.changeDate = changeDate;
