import express from 'express';
import {createOrder} from '../controllers/orderController';
import {initiatePayment,paymentWebhook} from '../controllers/paymentController';

const router=express.Router();

router.post('/create',createOrder);
router.post('/initiate',initiatePayment);
router.post('/webhook',paymentWebhook);

export default router;