const jwt = require('jsonwebtoken')

const verifyJWT = (requiredRole) => {
    return (req, res, next) => {

    const token = req.cookies.jwt

    jwt.verify(
        token,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            if (err) return res.status(403).json({ message: 'Forbidden verifying' })
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
const verifySingleUseJWT = (req, res) => {
    console.log(req.cookies)
    console.log(req.cookies.singleUse)
    const token = req.cookies.singleUse
    console.log('token' + token)
    // console.log(req.cookies.singleUse)
    jwt.verify(
        token,
        process.env.SINGLE_USE_TOKEN_SECRET,
        (err, decoded) => {
          if (err) return res.status(403).json({ message: 'Forbidden at Single Use' })
   
          return res.status(200).json({message: 'Token valid'})
      }    
    )
}


module.exports = {
    verifyJWT,
    verifySingleUseJWT
} 
