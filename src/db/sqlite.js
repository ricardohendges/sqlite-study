const sqlite3 = require('sqlite3').verbose();
const { readCsv } = require('../utils/csv-reader');

const db = new sqlite3.Database(':memory:');

const initialize = async () => {
  // ? Estrutura desejada: year	title	studios	producers	winner
  return new Promise((resolve, reject) => {
    db.run(`
CREATE TABLE T_MOVIES (MOV_ID        INTEGER PRIMARY KEY,
                       MOV_YEAR      INTEGER,
                       MOV_TITLE     TEXT,
                       MOV_STUDIOS   TEXT,
                       MOV_PRODUCERS TEXT,
                       MOV_WINNER    TEXT)`,
      () => {
        readCsv(process.env.PATH_FILE_CSV).then((movies_by_csv) => {
          const stmt_Movies = db.prepare(`INSERT INTO T_MOVIES VALUES (?, ?, ?, ?, ?, ?)`);

          for (let i = 1; i < movies_by_csv.length; i++) {
            const movie = movies_by_csv[i];
            stmt_Movies.run(i, +movie.year, movie.title, movie.studios, movie.producers, movie.winner == 'yes' ? 'TRUE' : 'FALSE');
          }
          stmt_Movies.finalize(() => { resolve(`Base carregada com ${movies_by_csv.length-1} registros.`) });
        }).catch(err => {
          console.log(err);
          reject(err);
        });
      })
  });
};

module.exports.initialize = initialize;
module.exports.db = db;