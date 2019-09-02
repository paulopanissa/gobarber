import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import FileController from './app/controllers/FileController';
import ProviderController from './app/controllers/ProviderController';
import AppointmentController from './app/controllers/AppointmentController';

import authMiddleware from './app/middlewares/auth';

const router = new Router();
const upload = multer(multerConfig);

/**
 * Sessions
 */
router.post('/sessions', SessionController.store);
router.post('/users', UserController.store);

// Middleware Auth
router.use(authMiddleware);
/**
 * User Routes
 */
router.put('/users', UserController.update);
router.get('/providers', ProviderController.index);

router.post('/appointments', AppointmentController.store);

router.post('/files', upload.single('file'), FileController.store);

export default router;
