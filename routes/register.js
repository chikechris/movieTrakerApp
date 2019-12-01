require('dotenv').config()
const router = require('express').Router()
const { check, validationResult } = require('express-validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')



router.post('/', (req,res)=>{
  res.send('user registered')
})

module.exports = router
