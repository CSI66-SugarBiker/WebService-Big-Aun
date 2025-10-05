import { Router } from 'express';
import * as Payments from '../controllers/payments.controller.js';

const router = Router();

/**
 * Payments Routes
 * - POST /payments/:orderId/intent   -> create PromptPay QR
 * - POST /payments/webhook           -> gateway webhook
 */
router.post('/:orderId/intent', Payments.createIntent);
router.post('/webhook', Payments.webhook);

export default router;
