import express from 'express';
import {initiatePayment,paymentWebhook,getPaymentById,getPayments} from '../controllers/paymentController';
import {asyncHandler} from '../utils/asyncHandler';

const router=express.Router();

router.post('/initiate',asyncHandler(initiatePayment));
router.post('/webhook',asyncHandler(paymentWebhook));
router.get('/:id',asyncHandler(getPaymentById));
router.get('/',asyncHandler(getPayments));


export default router;

