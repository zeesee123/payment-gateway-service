import {Request,Response,NextFunction} from 'express';
import {redis} from '../config/redis';

export const rateLimiter=async(req:Request,res:Response,next:NextFunction)=>{

    const ip=req.ip||'unknown';
    const key=`rateLimit:${ip}`;

    const current=await redis.incr(key);

    if(current===1){
        await redis.expire(key,60);
    }

    if(current>100){
        return res.status(429).json({success:false,error:'Too many requests'});

    }

    next();
}