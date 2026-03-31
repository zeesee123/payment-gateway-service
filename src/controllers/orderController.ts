import {Request,Response} from 'express';
import {db} from '../config/db';
import {redis} from '../config/redis';




export const createOrder=async(req:Request,res:Response)=>{
    

        
        
        const {userId,amount}=req.body;

       
        const[result]=await db.query("INSERT INTO orders (user_id,status,total_amount) values (?,?,?)",[userId,'pending',amount]);
        
        return res.json({success:true,data:{orderId:result.insertId}});
    

}

export const getOrders=async(req:Request,res:Response)=>{

    const [result]:any=await db.query("SELECT * FROM orders");
        return res.json({success:true,data:{result}});
    
}

export const getOrderById=async(req:Request,res:Response)=>{

        const {id}=req.params;

        const cached=await redis.get(`order:${id}`);
        
        if(cached){
                return res.json({success:true,data:{result:JSON.parse(cached)}});
        }
    
        const [result]:any=await db.query("SELECT * FROM orders where id=?",[req.params.id]);

        if(result.length===0){
                return res.status(404).json({success:false,error:'Order not found'});
        }

        await redis.set(`order:${id}`,JSON.stringify(result[0]),'EX',60);
        
        return res.json({success:true,data:{result:result[0]}});
        


}
