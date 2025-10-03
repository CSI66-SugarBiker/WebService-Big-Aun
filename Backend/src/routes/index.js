// src/routes/index.js
import { Router } from 'express';
import * as Auth from '../controllers/auth.controller.js';

const router = Router();

// Auth
router.post('/auth/login', Auth.login);


export default router;
