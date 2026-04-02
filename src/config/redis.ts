import Redis from 'ioredis';

export const redis=new Redis({
    host:process.env.REDIS_HOST,
    port:Number(process.env.REDIS_PORT),
    password:process.env.REDIS_PASSWORD,
    username:process.env.REDIS_USERNAME,
    maxRetriesPerRequest:null
});


redis.on('connect',()=>{console.log('Redis connected')});
redis.on('error',(err)=>{console.log('Redis error',err)});