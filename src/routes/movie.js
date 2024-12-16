const movieController = require('../controllers/movie');

module.exports = (app) => {
  app.get('/movie', movieController.getMovies
    //#region Documentação
    /*#swagger.tags = ['MOVIES']
      #swagger.summary = 'List movies by params.'
      #swagger.parameters['limit'] = {
        description: 'limit',
        in: 'query',
        name: 'limit',
        type: 'int'
      }
      #swagger.parameters['offset'] = {
        description: 'offset',
        in: 'query',
        name: 'offset',
        type: 'int'
      }
      #swagger.parameters['year'] = {
        description: 'year',
        in: 'query',
        name: 'year',
        type: 'int'
      }
      #swagger.parameters['winner'] = {
        description: 'winner',
        in: 'query',
        name: 'winner',
        type: 'varchar'
      }
      #swagger.responses[200] = { description: 'Sucesso!',
        schema: { 
          total: 1,
          movies: [    {
            "MOV_YEAR": 1980,
            "MOV_TITLE": "Can't Stop the Music",
            "MOV_STUDIOS": "Associated Film Distribution",
            "MOV_PRODUCERS": "Allan Carr",
            "MOV_WINNER": "TRUE"
          }]
        }
      }
      #swagger.responses[500] = { description: 'Problema no servidor.' }
    */
    //#endregion
  );
  app.post('/movie', movieController.postMovies
    //#region Documentação
    /*#swagger.tags = ['MOVIES']
      #swagger.summary = 'Insert new movies.'
      #swagger.parameters['json'] = {
        in: 'body',
        description: 'new movies params',
        type: 'json',
        schema: {
          "year": 2024,
          "title": "abc",
          "studios": "pzo",
          "producers": "rjh",
          "winner": "yes"
        }
      }
      #swagger.responses[201] = { description: 'Criado!',
        schema: { 
          "MOV_ID": 210,
          "MOV_YEAR": 1980,
          "MOV_TITLE": "Can't Stop the Music",
          "MOV_STUDIOS": "Associated Film Distribution",
          "MOV_PRODUCERS": "Allan Carr",
          "MOV_WINNER": "TRUE"
        }
      }
      #swagger.responses[500] = { description: 'Problema no servidor.' }
    */
    //#endregion
  );  
  app.put('/movie/:mov_id', movieController.putMovies
    //#region Documentação
    /*#swagger.tags = ['MOVIES']
      #swagger.summary = 'Update old movies.'
      #swagger.parameters['json'] = {
        in: 'body',
        description: 'update movies params',
        type: 'json',
        schema: {
          "year": 2024,
          "title": "abc",
          "studios": "pzo",
          "producers": "rjh",
          "winner": "yes"
        }
      }
      #swagger.responses[201] = { description: 'Editado!',
        schema: {
          "MOV_YEAR": 1980,
          "MOV_TITLE": "Can't Stop the Music",
          "MOV_STUDIOS": "Associated Film Distribution",
          "MOV_PRODUCERS": "Allan Carr",
          "MOV_WINNER": "TRUE"
        }
      }
      #swagger.responses[500] = { description: 'Problema no servidor.' }
    */
    //#endregion
  );
  app.delete('/movie/:mov_id', movieController.deleteMovies
    //#region Documentação
    /*#swagger.tags = ['MOVIES']
      #swagger.summary = 'Delete movies.'
      #swagger.parameters['mov_id'] = {
        name: 'mov_id',
        in: 'path',
        description: "Movie ID (mov_id)",
        value: "207"
      }
      #swagger.responses[204] = { description: 'Sucesso!' }
      #swagger.responses[500] = { description: 'Problema no servidor.' }
    */
    //#endregion
  );
};
