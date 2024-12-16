const http = require('http');
const express = require('express');
const my_sqlite = require('./db/sqlite');
require('dotenv').config();

const PORT = process.env.HOST_PORT || 3010;
const app = express();

app.use(express.json());

require('./utils/swagger');
app.use('/docs', express.static('src/views'));
app.use('/docs/swagger.yaml', express.static('src/docs/swagger.yaml'));

require('./routes')(app);
app.get('/', (req, res) => res.status(200).send('API-MOVIE UP!'));

const httpServer = http.createServer(app);

if (process.env.NODE_ENV !== 'test') {
  httpServer.listen(PORT, async () => {
    try {
      my_sqlite.initialize().then(ret => {
        console.log('sqlite initialized!!!', ret);
      })
      console.log(`App is running: ${httpServer.address().port}`);
    } catch (err) {
      console.error(err);
    }
  });
}

process.on('SIGINT', () => {
  console.log('\nShutting down from SIGINT (Ctrl-C)');
  httpServer.close((error) => {
    if (error) console.error(error.message);
  });
  process.exit(1);
});


module.exports = { httpServer, app };