import { Router } from 'express';
import * as Settings from '../controllers/settings.controller.js';
import { auth } from '../middleware/auth.js';
import { requireRole } from '../middleware/requireRole.js';

const router = Router();

/**
 * Settings Routes
 * - GET /settings/theme         (manager/owner)
 * - PUT /settings/theme         (manager/owner)
 */
router.get('/theme', auth(), requireRole('manager','owner'), Settings.getTheme);
router.put('/theme', auth(), requireRole('manager','owner'), Settings.updateTheme);

export default router;
