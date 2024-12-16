const movieService = require('../services/movie');

async function getMovies (req, res) {
  try {
    let result = await movieService.getMovies(req.query);
    res.status(200).json({total: result.length, movies: result});
  } catch (err) {
    res.status(500).json(err.message);
  }
}

async function postMovies (req, res) {
  try {
    let result = await movieService.postMovies(req.body);
    res.status(201).json(result);
  } catch (err) {
    console.log(err);
    res.status(500).json(err.message);
  }
}

async function deleteMovies (req, res) {
  try {
    const { mov_id } = req.params;
    await movieService.deleteMovies(mov_id);
    res.status(204).json();
  } catch (err) {
    console.log(err);
    res.status(500).json(err.message);
  }
}

async function putMovies (req, res) {
  try {
    const params = req.body
    params.mov_id = req.params.mov_id;
    await movieService.putMovies(params);
    const result = await movieService.getMovies(params)
    res.status(201).json(result[0]);
  } catch (err) {
    console.log(err);
    res.status(500).json(err.message);
  }
}
module.exports.getMovies = getMovies;
module.exports.postMovies = postMovies;
module.exports.deleteMovies = deleteMovies;
module.exports.putMovies = putMovies;