const jwt = require('jsonwebtoken')

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization
  const token = authHeader?.split(' ')[1]

  if (!token) return res.status(401).json({ message: 'Unauthorized' })

  jwt.verify(
    token, 
    process.env.ACCESS_TOKEN_SECRET, 
    (err, decoded) => {
      if(err) return res.status(403).json({ message: 'Forbidden' })
      req.user = decoded.username
      next()
    }
  )
}

module.exports = authenticateToken