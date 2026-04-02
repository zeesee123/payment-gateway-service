import request from 'supertest';
import app from '../app';

describe('Order API',()=>{

    it('should create an order with valid data',async()=>{

        const res=await request(app).post('/orders').send({userId:1,amount:100});

        expect(res.status).toBe(200);
        expect(res.body.success).toBe(true);
        expect(res.body.data.orderId).toBeDefined();
    });

    it('should reject order with missing fields', async () => {
        const res = await request(app)
            .post('/orders')
            .send({});
        expect(res.status).toBe(400);
        expect(res.body.success).toBe(false);
    });
    it('should return order by id', async () => {
        const res = await request(app)
            .get('/orders/1');
        expect(res.status).toBe(200);
        expect(res.body.success).toBe(true);
    });
    it('should return 404 for non-existent order', async () => {
        const res = await request(app)
            .get('/orders/99999');
        expect(res.status).toBe(404);
        expect(res.body.success).toBe(false);
    });


})