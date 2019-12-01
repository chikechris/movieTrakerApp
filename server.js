const express = require('express')
const app = express()

const connectDB = require('./config/db')

// connects to the database
connectDB()

app.use(express.json({ extended: true }))

app.use('/register', require('./routes/register'))
app.use('/auth', require('./routes/auth'))
app.use('/movies', require('./routes/movies'))




const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server Running on port ${PORT}`))
