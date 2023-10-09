const redisClient  = require("../config/redisConn")

async function cacheClients(req, res, next) {
//   const redisClient = await initializeClient();

    const val = await redisClient.get('clients')
    if (val !== null) {
        res.status(200).json(JSON.parse(val));
    } else {
        next()
    }
  }

  module.exports = cacheClients