import express from 'express';
import {initiatePayment,paymentWebhook,getPaymentById,getPayments} from '../controllers/paymentController';
import {asyncHandler} from '../utils/asyncHandler';
import {validate} from '../validators/validate';
import {initiatePaymentSchema,webhookSchema} from '../validators/paymentValidator';

const router=express.Router();

router.post('/initiate',validate(initiatePaymentSchema),asyncHandler(initiatePayment));
router.post('/webhook',validate(webhookSchema),asyncHandler(paymentWebhook));
router.get('/:id',asyncHandler(getPaymentById));
router.get('/',asyncHandler(getPayments));


export default router;

