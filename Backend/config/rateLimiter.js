const rateLimit = require('express-rate-limit')

const limiter = rateLimit({
    max: 50,
    //10 seconds
    windowMS: 10000,
    message: "You can't make any more request at the moment. Try again later."
})

module.exports = limiter