import express from 'express';
import {initiatePayment,paymentWebhook} from '../controllers/paymentController';
import {asyncHandler} from '../utils/asyncHandler';
const router=express.Router();

router.post('/initiate',initiatePayment);
router.post('/webhook',paymentWebhook);

export default router;

