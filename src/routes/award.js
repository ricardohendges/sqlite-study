const awardController = require('../controllers/award');

module.exports = (app) => {
  app.get('/award', awardController.getAward
    //#region Documentação
    /*#swagger.tags = ['AWARD']
      #swagger.summary = 'Obter o produtor com maior intervalo entre dois prêmios consecutivos, e o que
obteve dois prêmios mais rápido'
      #swagger.responses[200] = { description: 'Sucesso!',
        schema: {
          "min": [{
            "producer": "Producer 1",
            "interval": 1,
            "previousWin": 2008,
            "followingWin": 2009
          }],
          "max": [{
            "producer": "Producer 1",
            "interval": 99,
            "previousWin": 1900,
            "followingWin": 1999
          }]
        }
      }
      #swagger.responses[500] = { description: 'Problema no servidor.' }
    */
    //#endregion
  );
};
