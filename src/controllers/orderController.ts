import {Request,Response} from 'express';
import {db} from '../config/db';



export const createOrder=async(req:Request,res:Response)=>{
    try{

        console.log('this is the req',req);
        
        const {userId,amount}=req.body;

       
        const[result]=await db.query("INSERT INTO orders (user_id,status,total_amount) values (?,?,?)",[userId,'pending',amount]);
        res.json({success:true,orderId:result.insertId});
    
    }catch(error){
    
        console.log(error.message);
        res.status(500).json({success:false,error:'Internal server error'});
    
    }

}

export const getOrders=async(req:Request,res:Response)=>{

    try{

        const [result]:any=await db.query("SELECT * FROM orders");
        res.json({success:true,data:{result}});

    }catch(error){
        console.log(error.message);

        res.status(500).json({success:false,error:'Internal server error'});


    }
}

export const getOrderById=async(req:Request,res:Response,id:string)=>{

    try{
        const [result]:any=await db.query("SELECT * FROM orders where id=?",[id]);
        res.json({success:true,data:{result:result[0]}});
        
    }catch(error){
        res.json({success:false,error:'Internal server error'});
    }

}
