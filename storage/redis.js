const Redis = require('ioredis')

const redisFactory = (() => {
  const redis = new Redis({
    port: 6379,
    host: process.env.REDIS_HOST,
    family: 4,
    password: process.env.REDIS_PASSWORD,
    db: 0,
  })
  return () => ({
    setKey(key, value, setMode = null, expireTime = null) {
      return setMode && expireTime ? redis.set(key, value, setMode, expireTime) : redis.set(key, value)
    },
    getValueByKey(key) {
      return redis.get(key)
    },
    deleteByKey(key) {
      return redis.del(key)
    },
  })
})()

module.exports = redisFactory
