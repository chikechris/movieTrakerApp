// require('dotenv').config()

const mongoose = require('mongoose');
const config = require('config');
const url = config.get('URL');
// const url = process.env.URL

const connectDB = () => {
  mongoose
    .connect(url, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true
    })
    .then(() => console.log('MongoDB Connected'))
    .catch(err => {
      console.error(err.message);
      process.exit(1);
    });
};

module.exports = connectDB;
