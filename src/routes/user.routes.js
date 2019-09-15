import { Router } from 'express';
import {
  fetchAllUsers, getUserById, signup, updateUser,
  signin, deleteUser
} from '../controllers/user.controller';
import { validationMiddleware } from '../middleware';
import userSchema from '../schemas/user.schema';

const router = Router();

router.get('/list', fetchAllUsers);
router.post('/signup', validationMiddleware(userSchema.signup), signup);
router.post('/signin', validationMiddleware(userSchema.signup), signin);
router.get('/:id', getUserById);
router.put('/:id', validationMiddleware(userSchema.updateUser), updateUser);
router.delete('/:id', validationMiddleware(userSchema.deleteUser), deleteUser);

export default router;
