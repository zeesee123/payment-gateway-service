import express from 'express';
import {createOrder,getOrders,getOrderById} from '../controllers/orderController';
import {asyncHandler} from '../utils/asyncHandler';
import {validate} from '../validators/validate';
import {createOrderSchema} from '../validators/orderValidator';

const router=express.Router();

router.post('/',validate(createOrderSchema),asyncHandler(createOrder));
router.get('/',asyncHandler(getOrders));
router.get('/:id',asyncHandler(getOrderById));




export default router;