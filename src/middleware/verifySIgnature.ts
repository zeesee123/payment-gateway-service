import {Request,Response,NextFunction} from 'express';
import crypto from 'crypto';


export const verifySignature=(req:Request,res:Response,next:NextFunction)=>{
    
    const signature=req.headers['x-webhook-signature'] as string;
    
    if(!signature){
        return res.status(401).json({success:false,error:'Missing signature'});
    }

    const expectedSignature=crypto.createHmac('sha256',process.env.WEBHOOK_SECRET||'').update(JSON.stringify(req.body)).digest('hex');

    if(signature !==expectedSignature){
        
        return res.status(401).json({success:false,error:'Invalid signature'});

    }

    next();

}