import {Request,Response} from 'express';
import {db} from '../config/db';

export const initiatePayment=async(req:Request,res:Response)=>{

        const {orderId}=req.body;
        const paymentId="pay_"+Date.now();
        const [result]=await db.query("INSERT INTO payments (order_id,payment_id,status) values (?,?,?)",[orderId,paymentId,'pending']);
        res.json({paymentId,'message':'Payment initiated now',result:result.insertId});
  
}

export const paymentWebhook=async(req:Request,res:Response)=>{

        const {paymentId,status}=req.body;
        const [rows]:any=await db.query("SELECT * from payments where payment_id=?",[paymentId]);

        if(!paymentId||!status){
            return res.status(400).json({error:"Invalid payload !!"});
        }
        if(rows.length===0){
            console.log('no such payment exists');
            return res.status(404).json({error:'no such payment exists'});
        }

        if(rows[0].status==='success'){
           return res.json({message:'payment already processed'});
        }


        const [updateResult]:any=await db.query("UPDATE payments set status=? where payment_id=?",['success',paymentId]);

        console.log('updateResult',updateResult);

        if(updateResult.affectedRows===0){
            return res.status(400).json({error:'Failed to update payment status'});
        }
        return res.json({result:updateResult,message:'payment processed successfully'});
    
}