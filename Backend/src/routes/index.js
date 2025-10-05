import { Router } from 'express';
import authRoutes from './auth.routes.js';
import menuRoutes from './menu.routes.js';
import ordersRoutes from './orders.routes.js';
import paymentsRoutes from './payments.routes.js';
import receiptsRoutes from './receipts.routes.js';
import settingsRoutes from './settings.routes.js';

const router = Router();

/**
 * API Root Router
 * ติดตั้งภายใต้ /api ใน server.js
 */
router.use('/auth', authRoutes);
router.use('/menu', menuRoutes);
router.use('/orders', ordersRoutes);
router.use('/payments', paymentsRoutes);
router.use('/', receiptsRoutes);     // ใช้ path ตรงตามที่ controller กำหนด
router.use('/settings', settingsRoutes);

export default router;
