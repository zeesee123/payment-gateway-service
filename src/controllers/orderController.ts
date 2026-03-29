import {Request,Response} from 'express';
import {db} from '../config/db';



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

    
        const [result]:any=await db.query("SELECT * FROM orders where id=?",[req.params.id]);

        if(result.length===0){
                return res.status(404).json({success:false,error:'Order not found'});
        }
        return res.json({success:true,data:{result:result[0]}});
        


}
