import {NextFunction,Request,Response} from 'express';

export const errorHandler=(err:Error,req:Request,res:Response,next:NextFunction)=>{

    console.log('this is the error message',err.message);
    res.status(500).json({success:false,error:err.message,stack:err.stack});
}