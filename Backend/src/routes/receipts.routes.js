import { Router } from 'express';
import * as Receipts from '../controllers/receipts.controller.js';

const router = Router();

/**
 * Receipts Routes
 * - GET /orders/:id/receipt   -> returns { url: '.../receipts/<id>.pdf' }
 *
 * หมายเหตุ: เสิร์ฟไฟล์จริงผ่าน server.use('/receipts', express.static(...)) แล้ว
 */
router.get('/orders/:id/receipt', Receipts.getReceipt);

export default router;
