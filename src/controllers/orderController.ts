import {Request,Response} from 'express';
import {db} from '../config/db';



export const createOrder=async(req:Request,res:Response)=>{
    
        
        const {userId,amount}=req.body;

       
        const[result]=await db.query("INSERT INTO orders (user_id,status,total_amount) values (?,?,?)",[userId,'pending',amount]);
        res.json({success:true,orderId:result.insertId});
    
  

}

export const getOrders=async(req:Request,res:Response)=>{
    const [result]:any=await db.query("SELECT * FROM orders");
    res.json({success:true,data:{result}});
};

export const getOrderById=async(req:Request,res:Response,id:string)=>{


        const [result]:any=await db.query("SELECT * FROM orders where id=?",[id]);
        res.json({success:true,data:{result:result[0]}});
        


}
