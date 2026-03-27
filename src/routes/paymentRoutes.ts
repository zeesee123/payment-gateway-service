import express from 'express';
import {initiatePayment,paymentWebhook} from '../controllers/paymentController';

const router=express.Router();

router.post('/initiate',initiatePayment);
router.post('/webhook',paymentWebhook);

export default router;

