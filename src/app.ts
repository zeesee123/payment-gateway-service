import express from 'express';

import orderRoutes from './routes/orderRoutes';


const app=express();
app.use(express.json());

// app.get('/',(req,res)=>{
//     res.send('test new');
// });

app.use('/',orderRoutes);

app.listen(3000,()=>{
    console.log('server is running on port 3k');
})