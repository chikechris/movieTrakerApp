const config = require('config');
const jwt = require('jsonwebtoken')

const auth = (req, res, next) => {
  const token = req.header('a-token')
  if (!token) {
    return res.status(401).json({ message: 'Access Denied' })
  }
  try {
    const decoded = jwt.verify(token, config.get('SECRET'))
    req.user = decoded.user
    next()
  } catch (err) {
    res.status(401).json({ message: 'Wrong Token' })
  }
}

module.exports = auth
