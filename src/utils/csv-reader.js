const fs = require('fs');
const csv = require('csv-parser');

const headers = ['year', 'title', 'studios', 'producers', 'winner'];

// ? Estrutura desejada: year	title	studios	producers	winner

async function readCsv(filePath) {
  return new Promise((resolve, reject) => {
    const results = [];
    let headersOk = true;
    fs.createReadStream(filePath)
      .pipe(csv({ separator: process.env.DELIMITER || ';', headers: headers }))
      .on('data', (row) => {
        if (!results.length) {
          for (let i = 0; i < headers.length; i++) {
            if (row[headers[i]] !== headers[i]) headersOk = false;
          }
        }
        results.push(row);
      })
      .on('end', () => {
        if (headersOk)
          resolve(results); // Retornar os dados quando terminar
        else 
          reject('Cabecalho incorreto!');
      })
      .on('error', (error) => {
        reject(error); 
      });
  });
}

module.exports.readCsv = readCsv;