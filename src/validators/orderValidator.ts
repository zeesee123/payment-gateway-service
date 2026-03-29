import {z} from 'zod';

export const createOrderSchema=z.object({
userId:z.number({message:'UserId must be a number'}),
amount:z.number({message:'amount must be a number'}).positive({message:'Amount must be positive'})
});