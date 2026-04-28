# Payment Service (Orders + Webhook + Async Processing)

Small payment workflow demo built with **Express + TypeScript + MySQL + Redis + BullMQ**.

- **API**: create orders, initiate payments, receive webhook callbacks
- **Worker**: processes webhook events asynchronously via BullMQ (updates payment + order status transactionally)
- **Cache**: caches `GET /orders/:id` in Redis (60s) and invalidates on payment completion

## Tech stack

- Node.js, TypeScript, Express
- MySQL (`mysql2`)
- Redis (`ioredis`)
- BullMQ worker queue
- Validation with Zod
- Tests with Jest + Supertest

## Project structure

- `src/server.ts`: API entrypoint
- `src/worker.ts`: worker entrypoint
- `src/routes/*`: HTTP routes
- `src/controllers/*`: route handlers
- `src/workers/paymentWorker.ts`: BullMQ worker (queue: `payment-processing`)
- `schema.sql`: MySQL schema (auto-loaded by Docker MySQL)

## Getting started (local dev)

### 1) Install

```bash
npm install
```

### 2) Configure environment variables

- Copy `.env.example` to `.env`
- Fill values as needed

Important:
- **Never commit `.env`** (it contains secrets). This repo ignores it via `.gitignore`.

### 3) Start MySQL + Redis (Docker)

This repo includes a compose file named `docker-composer.yml`:

```bash
docker compose --env-file .env -f docker-composer.yml up -d mysql redis
```

### 4) Run the API and the worker (2 terminals)

API:

```bash
npm run dev:api
```

Worker:

```bash
npm run dev:worker
```

API defaults to port `3000`.

## API endpoints

Base URL: `http://localhost:3000`

### Orders

- `POST /orders`

Body:

```json
{ "userId": 123, "amount": 499 }
```

- `GET /orders`
- `GET /orders/:id` (cached in Redis for 60 seconds)

### Payments

- `POST /payments/initiate`

Body:

```json
{ "orderId": 1 }
```

Returns a `paymentId` (e.g. `pay_171...`) and creates a pending payment record.

- `POST /payments/webhook`

Headers:
- `x-webhook-signature`: HMAC-SHA256 of the raw JSON body using `WEBHOOK_SECRET`

Body:

```json
{ "paymentId": "pay_1712345678901", "status": "success" }
```

This enqueues a BullMQ job (`payment-processing`) which:
- updates `payments.status`
- updates `orders.status` to `paid` or `failed`
- invalidates Redis cache for `order:{orderId}`

- `GET /payments`
- `GET /payments/:id`

## Generating a valid webhook signature

Signature algorithm (as implemented in `src/middleware/verifySIgnature.ts`):

- HMAC: SHA-256
- Key: `WEBHOOK_SECRET`
- Message: `JSON.stringify(req.body)`
- Output: hex digest

Example (Node.js):

```js
import crypto from "crypto";

const body = { paymentId: "pay_1712345678901", status: "success" };
const secret = process.env.WEBHOOK_SECRET;
const sig = crypto.createHmac("sha256", secret).update(JSON.stringify(body)).digest("hex");
console.log(sig);
```

## Tests

```bash
npm test
```

## Notes / limitations

- This is a demo workflow (not a full payment gateway integration).
- For production you’d want raw-body verification for webhooks (to avoid signature mismatches from JSON re-serialization), idempotency keys, and stricter auth/rate limiting strategy.

