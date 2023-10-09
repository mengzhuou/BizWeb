const redis = require("redis");

const REDISPORT = process.env.REDISPORT || 6379;

let redisClient;
const initializeClient = async () => {
  if (!redisClient) {
    redisClient = redis.createClient(REDISPORT);
    await redisClient.connect();
  } 
  return redisClient;
};

initializeClient()

module.exports = redisClient;
