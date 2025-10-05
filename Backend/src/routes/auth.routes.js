import { Router } from 'express';
import * as Auth from '../controllers/auth.controller.js';

const router = Router();

/**
 * Auth Routes
 * - POST /auth/login
 */
router.post('/login', Auth.login);

export default router;
