import { Router } from 'express';
import * as Orders from '../controllers/orders.controller.js';
import { auth } from '../middleware/auth.js';
import { requireRole } from '../middleware/requireRole.js';

const router = Router();

/**
 * Orders Routes
 * - POST /orders
 * - GET /orders                 (staff only; list active)
 * - GET /orders/:id
 * - PUT /orders/:id/status      (cashier/kitchen/manager/owner)
 */
router.post('/', Orders.createOrder);
router.get('/', auth(), Orders.listActive);
router.get('/:id', Orders.getOrder);
router.put(
  '/:id/status',
  auth(),
  requireRole('cashier','kitchen','manager','owner'),
  Orders.updateStatus
);

export default router;
