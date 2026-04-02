import 'dotenv/config';



import express from 'express';

import orderRoutes from './routes/orderRoutes';
import paymentRoutes from './routes/paymentRoutes';
import {errorHandler} from './middleware/errorHandler';
import {rateLimiter} from './middleware/rateLimiter';
import'./workers/paymentWorker';




const app=express();
app.use(express.json());
app.use(rateLimiter);


app.use('/orders',orderRoutes);
app.use('/payments',paymentRoutes);

app.use(errorHandler);

app.listen(3000,()=>{
    console.log('server is running on port 3k');
})