const awardRoute = require('./award');
const movieRoute = require('./movie');

module.exports = (app) => {
  awardRoute(app);
  movieRoute(app);
}