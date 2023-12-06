const Movie = require('../models/movie');
const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');

module.exports.addMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    description,
    year,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;
  Movie.create({
    country,
    director,
    duration,
    description,
    year,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
    owner: req.user._id,
  })
    .then((data) => res.status(201).send(data))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(err.message));
      } else {
        next(err);
      }
    });
};

module.exports.getMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((movies) => res.send(movies))
    .catch((err) => next(err));
};

module.exports.deleteMovies = (req, res, next) => {
  Movie.findOne({ _id: req.params.movieId })
    .then((movieId) => {
      if (!movieId) {
        throw new NotFoundError('Фильм с указанным id не найден');
      }
      if (!movieId.owner.equals(req.user._id)) {
        throw new ForbiddenError('Невозможно удалить выбранный фильм');
      }
      Movie.deleteOne(movieId)
        .orFail(() => new NotFoundError())
        .then(() => {
          res.status(200).send({ message: 'Фильм удален' });
        })
        .catch((err) => next(err));
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Некорректный Id'));
      } else {
        next(err);
      }
    });
};
