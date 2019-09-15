import { Router } from 'express';
import UserController from '../controllers/user.controller';
import { validationMiddleware, authenticate } from '../middleware';
import userSchema from '../schemas/user.schema';

const router = Router();

router.get('/list', authenticate, UserController.fetchAllUsers);
router.post('/signup', validationMiddleware(userSchema.signup), UserController.signup);
router.post('/signin', validationMiddleware(userSchema.signup), UserController.signin);
router.get('/:id', UserController.getUserById);
router.put('/:id', validationMiddleware(userSchema.updateUser), UserController.updateUser);
router.delete('/:id', validationMiddleware(userSchema.deleteUser), UserController.deleteUser);

export default router;
