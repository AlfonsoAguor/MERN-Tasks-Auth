import { Router } from 'express';
import { login, register, logout, profile, verifyToken } from '../controllers/auth.controller.js';
import { authRequired } from '../middlewares/validateToken.js';
import { validateSchema } from '../middlewares/vadilator.middleware.js';
import { registerSchema, loginSchema } from '../schemas/auth.schema.js';

const router = Router();

//para registrarse utilizamos el middleware validateSchema, que utilizara el esquema de validacion registerSchema que se encuentra en schemas/auth.schema.js
router.post('/register', validateSchema(registerSchema), register);
router.post('/login', validateSchema(loginSchema), login);
router.post('/logout', logout);
router.get('/profile', authRequired, profile);
router.get('/verify', verifyToken);

export default router;
