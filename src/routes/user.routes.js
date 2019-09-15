import { Router } from 'express';
import {
  getAllUsers, getUserById, signup,
  signin
} from '../controllers/user.controller';
import { validationMiddleware } from '../middleware';
import userSchema from '../schemas/user.schema';

const router = Router();

router.get('/list', getAllUsers);
router.post('/signup', validationMiddleware(userSchema.signup), signup);
router.post('/signin', validationMiddleware(userSchema.signup), signin);
router.get('/:id', getUserById);
router.put('/:id', (req, res) => res.send('Yet to be implemented'));
router.delete('/:id', (req, res) => res.send('Yet to be implemented'));

export default router;
