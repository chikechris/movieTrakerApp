require('dotenv').config()
const router = require('express').Router()
const { check, validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

// User Model
const User = require('../models/User')

router.post(
  '/',
  [
    check('name', 'Please enter a name')
      .not()
      .isEmpty(),
    check('email', 'Please enter an email').isEmail(),
    check('password', 'Please enter password with 6 characters').isLength({
      min: 6
    })
  ],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() })
    }

    const { name, email, password } = req.body

    // checks if user exists
    try {
      let user = await User.findOne({ email })
      if (user) {
        return res.status(400).json({ error: [{ msg: 'User Already Exits' }] })
      }
      // creates new user
      user = new User({
        name,
        email,
        password
      })

      // password hashing
      const salt = await bcrypt.genSalt(10)
      user.password = await bcrypt.hash(password, salt)

      await user.save()

      const payload = {
        user: {
          id: user.id
        }
      }
      jwt.sign(
        payload,
        process.env.SECRET,
        {
          expiresIn: 4300
        },
        (err, token) => {
          if (err) throw err
          res.send({ token })
        }
      )
    } catch (err) {
      console.error(err.message)
      res.status(500).send('Server Error ')
    }
  }
)

module.exports = router

