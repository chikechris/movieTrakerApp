const router = require('express').Router()
const auth = require('../middleware/auth')
const { check, validationResult } = require('express-validator')

// Movie Model

const Movie = require('../models/Movie')

router.get('/', auth, async (req, res) => {
  try {
    const movies = await Movie.find({ user: req.user.id })
    res.json(movies)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})

router.post(
  '/',
  auth,
  [
    check('movie_name', 'Please Enter movie name')
      .not()
      .isEmpty(),
    check('main_actor', 'Please Enter main actor')
      .not()
      .isEmpty(),
    check('year', 'Please Enter movie year')
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() })
    }
    const { movie_name, main_actor, year, movie_type, watched } = req.body
    try {
      let movie = new Movie({
        user: req.user.id,
        movie_name,
        main_actor,
        year,
        movie_type,
        watched
      })
      movie = await movie.save()
      res.json(movie)
    } catch (err) {
      console.error(err.message)
      res.status(500).send('Server Error ')
    }
  }
)

router.delete('/:id', auth, async (req, res) => {
  try {
    let movie = await Movie.findById(req.params.id)
    if (!movie) {
      return res.status(404).json({ msg: 'Movie is not found' })
    }
    await Movie.findByIdAndRemove(req.params.id)
    res.send('Movie deleted')
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})

router.put('/:id', auth, async (req, res) => {
  const { movie_name, main_actor, year, movie_type, watched } = req.body
  const updateMovie = { movie_name, main_actor, year, movie_type, watched }
  try {
    let movie = await Movie.findById(req.params.id)
    if (!movie) {
      return res.status(404).json({ msg: 'Movie is not found' })
    }
    movie = await Movie.findByIdAndUpdate(
      req.params.id,
      { $set: updateMovie },
      { new: true }
    )
    res.send(movie)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})

module.exports = router
