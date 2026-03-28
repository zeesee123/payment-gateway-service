import express from 'express';
import {createOrder,getOrders,getOrderById} from '../controllers/orderController';

import {asyncHandler} from '../utils/asyncHandler';
const router=express.Router();

router.post('/orders',asyncHandler(createOrder));
router.get('/orders',asyncHandler(getOrders));
router.get('/orders/:id',asyncHandler(getOrderById));
// router.post('/initiate',initiatePayment);
// router.post('/webhook',paymentWebhook);



export default router;