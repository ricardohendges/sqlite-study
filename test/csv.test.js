const csvReader = require('../src/utils/csv-reader')
 
describe('csv-reader', () => {
  test('01 | Ler CSV (Correto)', async () => {
    const result = await csvReader.readCsv('./src/db/db-csv-file/Movielist.csv');
    expect(result.length-1).toEqual(206);
  });
  test('02 | Ler CSV (Errado)', async () => {
    try {
      await csvReader.readCsv('./src/db/db-csv-file/mockWrong.csv');
    } catch (err){
      expect(err).toEqual('Cabecalho incorreto!');
    }
  });
});