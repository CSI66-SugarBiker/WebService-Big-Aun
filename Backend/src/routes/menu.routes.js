import { Router } from 'express';
import * as Menu from '../controllers/menu.controller.js';
import { auth } from '../middleware/auth.js';
import { requireRole } from '../middleware/requireRole.js';

const router = Router();

/**
 * Menu Routes
 * - GET /menu
 * - POST /menu           (manager/owner)
 * - PUT /menu/:id        (manager/owner)
 */
router.get('/', Menu.listMenu);
router.post('/', auth(), requireRole('manager','owner'), Menu.createMenu);
router.put('/:id', auth(), requireRole('manager','owner'), Menu.updateMenu);

export default router;
