const jwt = require('jsonwebtoken')

const verifyJWT = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization

    if (!authHeader?.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorized no token' })
    }

    const token = authHeader.split(' ')[1]

    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            if (err) return res.status(403).json({ message: 'Forbidden' })
            req.user = decoded.UserInfo.username
            req.roles = decoded.UserInfo.roles
            next()
        }        
    )
}

const requireRole = (role) => {
    return (req, res, next) => {
      const token = req.headers['authorization']?.split(' ')[1];
  
      if (token) {
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
          if (err) {
            return res.status(401).send('Invalid token');
          } else if (decoded.UserInfo.roles === role) {
            
            req.user = decoded; // add the decoded user info to the request object
            next(); // proceed to the next middleware or route handler
          } else {
            return res.status(403).send('You do not have the required role');
          }
        });
      } else {
        return res.status(403).send('No token provided');
      }
    };
  };

module.exports = {
    verifyJWT,
    requireRole
} 
