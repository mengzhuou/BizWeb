const redis = require("redis");

const REDSIPORT = process.env.REDISPORT || 6379;

let redisClient;

async function connectRedis() {
  redisClient = redis.createClient(REDSIPORT);
  redisClient.connect();
  redisClient.on("ready", () => {
    console.log("Connected to API Cache");
  });
  redisClient.on("error", (err) => {
    console.log("Error by Redis:", err);
  });
}

connectRedis();

module.exports = redisClient;
