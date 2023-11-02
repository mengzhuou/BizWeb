const jwt = require('jsonwebtoken')

const verifyJWT = (requiredRole) => {
    return (req, res, next) => {

    const token = req.cookies.jwt
    jwt.verify(
        token,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            if (err) return res.status(403).json({ message: 'Forbidden' })
            else if (decoded.UserInfo.roles.includes(requiredRole)) {
              req.user = decoded.UserInfo.username
              req.roles = decoded.UserInfo.roles
              next()
            } else {
              return res.status(403).send('You do not have the required role');
            }
        }        
    )
    }
}

module.exports = {
    verifyJWT
} 
