const redis = require("redis");

const REDIS_PORT = process.env.REDISPORT || 6379;
const REDIS_HOST = process.env.REDIS_HOST || "redis"; // Use 'redis' as the hostname

let redisClient;

async function connectRedis() {
  redisClient = redis.createClient({
    url: `redis://${REDIS_HOST}:${REDIS_PORT}`, // Updated to use the service name
  });
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
