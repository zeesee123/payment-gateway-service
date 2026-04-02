import {Worker} from 'bullmq';

import {db} from '../config/db';
import {redis} from '../config/redis';



const worker=new Worker('payment-processing',async(job)=>{
  
    
    const {paymentId,status,orderId}=job.data;

    const connection=await db.getConnection();
    


    try{

        await connection.beginTransaction();
        await connection.query("UPDATE payments set status=? where payment_id=?",[status,paymentId]);

        const orderStatus=status==='success'?'paid':'failed';
        await connection.query("UPDATE orders SET status=? where id=?",[orderStatus,orderId]);

        await connection.commit();
        await redis.del(`order:${orderId}`);
        
        console.log(`Payment ${paymentId} processed: ${status}`);

    }catch(error){

        await connection.rollback();
        throw error;

    }finally{
        connection.release();
    }

},{connection:redis,attempts:3,backoff:{type:'exponential',delay:1000}});


worker.on('completed',(job)=>{console.log(`Job ${job.id} completed`)});

worker.on('failed',(job,err)=>{console.error(`Job ${job?.id} failed:`, err.message)});
worker.on('error',(err)=>{console.error('Worker error:', err.message)});

export default worker;