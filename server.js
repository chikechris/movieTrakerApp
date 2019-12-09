const express = require('express')
const app = express()
const connectDB = require('./config/db')

const path = require('path')

// connects to the database
connectDB()

app.use(express.json({ extended: true }))

app.use('/register', require('./routes/register'))
app.use('/auth', require('./routes/auth'))
app.use('/movies', require('./routes/movies'))

// Check if environment is in production
if(process.env.NODE_ENV === 'production') {
  //Set static folder
  app.use(express.static('client/build'))

  app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html')))
}


const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server Running on port ${PORT}`))
