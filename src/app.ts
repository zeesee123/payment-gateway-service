import express from 'express';

import orderRoutes from './routes/orderRoutes';
import paymentRoutes from './routes/paymentRoutes';
import {errorHandler} from './middleware/errorHandler';

const app=express();
app.use(express.json());

// app.get('/',(req,res)=>{
//     res.send('test new');
// });

app.use('/',orderRoutes);
app.use('/',paymentRoutes);

app.use(errorHandler);

app.listen(3000,()=>{
    console.log('server is running on port 3k');
})