const my_sqlite = require('../db/sqlite');

const sql_getMovies = `
SELECT MOV_ID, 
       MOV_YEAR,
       MOV_TITLE,
       MOV_STUDIOS,
       MOV_PRODUCERS,
       MOV_WINNER
  FROM T_MOVIES `;

async function getMovies (params) {
  const {limit, offset, year, winner} = params;
  const paramsList = [];
  let sqlFilter = '';
  if (year) {
    sqlFilter = ` WHERE MOV_YEAR = (?) `;
    paramsList.push(year);
  }
  if (winner) {
    sqlFilter = (sqlFilter ? sqlFilter + ' AND ' : sqlFilter + ' WHERE ')  + ` MOV_WINNER = (?) `;
    paramsList.push(winner);
  }
  if (limit && offset) {
    sqlFilter += ` LIMIT (?) OFFSET (?) `;
    paramsList.push(limit);
    paramsList.push(offset);
  };
  const sql = sql_getMovies + sqlFilter;

  return new Promise((resolve, reject) => {
    my_sqlite.db.all(sql, paramsList, (err, row) => {
      if (err) reject (err)
      else resolve(row)
    });
  });
}

async function postMovies (params) {
  const {year, title, studios, producers, winner} = params;
  return new Promise((resolve, reject) => {
    const stmt_Movies = my_sqlite.db.prepare(`
      INSERT INTO T_MOVIES (MOV_YEAR, MOV_TITLE, MOV_STUDIOS, MOV_PRODUCERS, MOV_WINNER) 
                    VALUES (?, ?, ?, ?, ?)`);
    stmt_Movies.run(+year, title, studios, producers, winner == 'yes' ? 'TRUE' : 'FALSE');
    stmt_Movies.finalize((err) => {
    if (err) reject (err)
    else resolve(params)
    });
  });
}

const sql_deleteMovie = `DELETE FROM T_MOVIES WHERE MOV_ID = (?)`;

async function deleteMovies (params) {
  return new Promise((resolve, reject) => {
    my_sqlite.db.run(sql_deleteMovie, [params], (err, row) => {
      if (err) reject (err)
      else resolve(row)
    });
  });
}

const sql_updateMovie = `UPDATE T_MOVIES SET`;

async function putMovies (params) {
  const validFields = {
    year: "MOV_YEAR", 
    title: "MOV_TITLE", 
    studios: "MOV_STUDIOS", 
    producers: "MOV_PRODUCERS", 
    winner: "MOV_WINNER"
  };
  const paramsList = [];
  let sqlFilter = '';
  
  for (const [key, value] of Object.entries(validFields)) {
    if (params.hasOwnProperty(key)) {
      sqlFilter = (sqlFilter ? sqlFilter + ' , ' : '')  + ` ${value} = (?) `;
      paramsList.push(params[key]);
    }
  }

  const sql = sql_updateMovie + sqlFilter + ` WHERE MOV_ID = (?) `;
  paramsList.push(params.mov_id);

  return new Promise((resolve, reject) => {
    my_sqlite.db.all(sql, paramsList, (err, row) => {
      if (err) reject (err)
      else resolve(row)
    });
  });
}

module.exports.getMovies = getMovies;
module.exports.postMovies = postMovies;
module.exports.deleteMovies = deleteMovies;
module.exports.putMovies = putMovies;