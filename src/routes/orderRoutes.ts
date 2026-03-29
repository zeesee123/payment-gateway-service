import express from 'express';
import {createOrder,getOrders,getOrderById} from '../controllers/orderController';
import {asyncHandler} from '../utils/asyncHandler';

const router=express.Router();

router.post('/',asyncHandler(createOrder));
router.get('/',asyncHandler(getOrders));
router.get('/:id',asyncHandler(getOrderById));




export default router;