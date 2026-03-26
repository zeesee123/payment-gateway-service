import {Request,Response} from 'express';
import {db} from '../config/db';

//why will this be async in here love ?

export const createOrder=async(req:Request,res:Response)=>{
    try{

        console.log('this is the req',req);
        
        const {userId,amount}=req.body;

        //why are we doing the stuff just below in here love ?
        const[result]=await db.query("INSERT INTO orders (user_id,status,total_amount) values (?,?,?)",[userId,'pending',amount]);
        res.json({orderId:result.insertId});
    
    }catch(error){
    
        console.log(error.message);
        res.status(500).json({error:'Internal server error'});
    
    }

}
