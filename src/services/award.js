const my_sqlite = require('../db/sqlite');

const sql_getMovies = `
SELECT MOV_ID, 
       MOV_YEAR,
       MOV_TITLE,
       MOV_STUDIOS,
       MOV_PRODUCERS,
       MOV_WINNER
  FROM T_MOVIES 
 WHERE MOV_WINNER = "TRUE" `;

async function getAward (params) {
  return new Promise((resolve, reject) => {
    my_sqlite.db.all(sql_getMovies, (err, row) => {
      if (err) reject (err)
      else resolve(row)
    });
  });
}

module.exports.getAward = getAward;