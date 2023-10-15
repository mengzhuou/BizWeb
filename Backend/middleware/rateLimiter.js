const rateLimit = require('express-rate-limit')

const limiter = rateLimit({
    max: 10,
    //default is 60000 means 1 minute. Current wait time is around 10 seconds.
    windowMs: 17000,
    message: "You can't make any more request at the moment. Try again later."
})

module.exports = limiter