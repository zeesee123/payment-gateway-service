import {Request,Response} from 'express';
import {db} from '../config/db';


export const initiatePayment=async(req:Request,res:Response)=>{

        const {orderId}=req.body;
        const paymentId="pay_"+Date.now();
        const [result]=await db.query("INSERT INTO payments (order_id,payment_id,status) values (?,?,?)",[orderId,paymentId,'pending']);
        
        res.json({success:true,data:{result:result,paymentId,message:'Payment initiated now'}});
  
}

export const paymentWebhook=async(req:Request,res:Response)=>{

        const {paymentId,status}=req.body;
        const [rows]:any=await db.query("SELECT * from payments where payment_id=?",[paymentId]);

        

       

        if(rows.length===0){
         
            return res.status(404).json({success:false,error:'no such payment exists'});
        }

        if(rows[0].status==='success'){
           return res.json({success:true,data:{message:'payment already processed'}});
        }

        const connection=await db.getConnection();

         try{
            await connection.beginTransaction();
            await connection.query("UPDATE payments set status=? where payment_id=?",[status,paymentId])
            const orderStatus=status==='success'?'paid':'failed'
            await connection.query("UPDATE orders set status=? where id=?",[orderStatus,rows[0].order_id]);
            await connection.commit();

            return res.json({success:true,data:{message:'payment processed'}});

        }catch(error){

            await connection.rollback();
            throw error;

        }finally{
            connection.release();
        }
       
    
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