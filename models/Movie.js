const mongoose = require('mongoose')

const movieSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users'
  },
  movie_name: {
    type: String,
    required: true
  },
  main_actor: {
    type: String,
    required: true
  },
  year: {
    type: String,
    required: true
  },
  movie_type: {
    type: String,
    required: true,
    default: 'Action'
  },
  watched: {
    type: Boolean,
    default: false
  }
})

module.exports = mongoose.model('movie', movieSchema)
