import {z} from 'zod';

export const initiatePaymentSchema=z.object({});

export const webhookSchema=z.object({

    paymentId:z.string({message:'PaymentId must be a string'}),
    status:z.enum(['success','failed'],{message:'status must be success or failed'})
});