const expressjwt = require('express-jwt')

module.exports = () => expressjwt({
  credentialsRequired: false,
  secret: process.env.AUTH_SECRET,
  algorithms: ['HS256'],
})
