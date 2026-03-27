import express from 'express';
import {createOrder,getOrders,getOrderById} from '../controllers/orderController';
import {initiatePayment,paymentWebhook} from '../controllers/paymentController';

const router=express.Router();

router.post('/order/create',createOrder);
router.get('/order/list',getOrders);
router.get('/order/:id',getOrderById);
// router.post('/initiate',initiatePayment);
// router.post('/webhook',paymentWebhook);

export default router;