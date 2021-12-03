const redis = require("redis");
const { redisPort , redisHost} = require("./config");

console.log(redisHost)
console.log(redisPort)
const redisClient = redis.createClient(redisPort, redisHost);

// redisClient.on('error', (err) => console.log(err))

// redisClient.connect()

// redisClient.on("connect", (err) =>  {
//     if(err){
//         console.log("Error while connecting to Redis server");
//     }
//     else {
//         console.log("Redis Server Connected");
//     }
// });

module.exports = redisClient;
