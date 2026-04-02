import {Request,Response} from 'express';
import {db} from '../config/db';

import {paymentQueue} from '../queues/paymentQueue';


export const initiatePayment=async(req:Request,res:Response)=>{

        const {orderId}=req.body;
        const paymentId="pay_"+Date.now();

        const [existing]:any=await db.query("SELECT * from payments where order_id=?",[orderId]);

        if(existing.length>0){
        
            return res.json({success:true,data:{message:'Payment already initiated for this order'}});
        }

        const [result]=await db.query("INSERT INTO payments (order_id,payment_id,status) values (?,?,?)",[orderId,paymentId,'pending']);
        
        res.json({success:true,data:{result:result,paymentId,message:'Payment initiated now'}});
  
}

export const paymentWebhook=async(req:Request,res:Response)=>{

        const {paymentId,status}=req.body;
        const [rows]:any=await db.query("SELECT * from payments where payment_id=?",[paymentId]);

        

       

        if(rows.length===0){
         
            return res.status(404).json({success:false,error:'no such payment exists'});
        }

       

        if(rows[0].status!=='pending'){
            return res.json({success:true,data:{message:'payment already processed'}});
        }

        await paymentQueue.add('payment-processing',{paymentId,status,orderId:rows[0].order_id},{attempts:3,backoff:{type:'exponential',delay:1000}});

     
        return res.json({success:true,data:{message:'Payment queued for processing'}});

     
       
    
}

export const getPayments=async(req:Request,res:Response)=>{

     const [result]:any=await db.query("SELECT * FROM payments");

     if(result.length===0){
        return res.status(404).json({success:false,error:'No payments found'});
     }

     return res.json({success:true,data:{result}});
}


export const getPaymentById=async(req:Request,res:Response)=>{

    const [result]:any=await db.query("SELECT * FROM payments where payment_id=?",[req.params.id]);

    if(result.length===0){
        return res.status(404).json({success:false,error:'Payment not found'});
    }

    return res.json({success:true,data:{result:result[0]}});
}